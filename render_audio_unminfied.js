/**
 * Minimal Audio Waveform Scrubber & Drawer (Pointer Events Only, Internal Audio Management)
 * - Creates audio element from args.audio_src (URL)
 * - Play/Pause buttons managed via args.playbutton and args.pausebutton (elements, not IDs)
 * - Scrubbing/dragging only via args.handle (element), not the entire canvas
 * - Direct tap (pointerdown) on canvas seeks to that position
 * - Script manages handle x transform directly
 * - ctx.triggerActionEvent("disable_reply", boolean) for swipe-to-reply state
 * - Handles errors gracefully, avoids getting stuck
 * - Well-commented for clarity
 *
 * Usage:
 *   audioWaveformScrubber({
 *     canvasId: 'canvas',
 *     audio_src: 'audio.mp3', // URL for audio
 *     peaks: [...], // array of normalized peak values (0..1)
 *     onProgress: (progress) => { ... }, // optional, called with progress (0..1)
 *     ctxTime: <HTMLElement or function>, // required, receives time string
 *     playbutton: <HTMLElement>, // play button element
 *     pausebutton: <HTMLElement>, // pause button element
 *     handle: <HTMLElement> // draggable handle element
 *   }, ctx);
 */

function audioWaveformScrubber(args, ctx) {
  // --- Global Instance Management ---
  if (!window._audioWaveformScrubberInstances) {
    window._audioWaveformScrubberInstances = [];
  }
  const instance = {};
  window._audioWaveformScrubberInstances.push(instance);

  // Store references for cleanup
  instance._eventRemovers = [];
  instance._observer = null;
  instance.audio = null;
  instance._canvas = null;
  instance._handle = null;

  // Extract arguments
  const { canvasId, audio_src, peaks: peaksInput, onProgress, ctxTime, playbutton, pausebutton, handle } = args;
  const canvas = document.getElementById(canvasId);
  instance._canvas = canvas;
  const waveColor = args.waveColor;
  const activeColor = args.progressColor;
  const peaks = Array.isArray(peaksInput) ? peaksInput : Array.from(peaksInput);

  // Create audio element internally
  const audio = document.createElement('audio');
  audio.src = audio_src;
  audio.preload = 'auto';
  audio.style.display = 'none';
  document.body.appendChild(audio);
  instance.audio = audio;

  // --- Force metadata load hack (for short audios < 60s) ---
  // If metadata is not loaded, set currentTime to 100 then back to 0 to force duration to be available
  if (audio.readyState < 1) {
    audio.currentTime = 100;
    audio.currentTime = 0;
  }

  // State variables
  let isScrubbing = false, scrubProgress = 0, canScrub = false;
  let barCache = null, lastWidth = 0, lastHeight = 0, lastProgress = -1, lastDisplayedSec = -1;
  let rafId = null, rafActive = false;
  let uiActive = false; // Keeps rAF running after tap/seek/drag while paused
  let uiActiveTimeoutId = null;
  let hasTappedToPlay = false; // Only allow play on first tap-to-seek

  // Helper to add event listeners and track removers
  function addEventListenerWithRemove(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    instance._eventRemovers.push(() => target.removeEventListener(type, fn, opts));
  }

  // --- Utility Functions ---

  // Check if scrubbing is allowed (audio loaded and has duration)
  function checkCanScrub() {
    canScrub = Number.isFinite(audio.duration) && audio.duration > 0;
    render(true);
  }
  addEventListenerWithRemove(audio, 'loadedmetadata', checkCanScrub);
  addEventListenerWithRemove(audio, 'durationchange', checkCanScrub);

  // Get progress (0..1) from pointer event
  function getProgressFromPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX ?? 0) - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }

  // Set audio current time safely
  function setAudioCurrentTime(time) {
    if (!Number.isFinite(time)) return;
    if (audio.readyState < 1) {
      // Wait for metadata if not ready
      const setTime = () => {
        audio.currentTime = Math.max(0, Math.min(time, audio.duration || Infinity));
        audio.removeEventListener('loadedmetadata', setTime);
      };
      audio.addEventListener('loadedmetadata', setTime);
      if (audio.preload !== 'auto') audio.preload = 'auto';
      audio.load();
    } else {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || Infinity));
    }
  }

  // Format seconds as mm:ss
  function formatTimeSec(sec) {
    sec = Math.max(0, Math.round(sec));
    return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
  }

  // Output time to ctxTime and args.time
  function outputTime(time, duration) {
    const str = formatTimeSec(time);
    if (ctxTime) {
      if (typeof ctxTime === 'function') ctxTime(str);
      else if (ctxTime.nodeType === 1) ctxTime.textContent = str;
    }
    if (args.time && args.time.nodeType === 1) {
      args.time.textContent = str;
    }
  }

  // Precompute bar geometry for waveform
  function precomputeBars(width, height) {
    const barWidth = 2.5, barGap = 1.75, barRadius = 2, minBarHeight = 4;
    const totalBars = Math.floor(width / (barWidth + barGap));
    const step = peaks.length / totalBars;
    const bars = [];
    for (let i = 0; i < totalBars; i++) {
      let start = Math.floor(i * step), end = Math.floor((i + 1) * step), maxPeak = 0;
      for (let j = start; j < end && j < peaks.length; j++) if (peaks[j] > maxPeak) maxPeak = peaks[j];
      const barHeight = Math.max(minBarHeight, maxPeak * height);
      const x = i * (barWidth + barGap), y = (height - barHeight) / 2;
      bars.push({ x, y, barWidth, barHeight, barRadius });
    }
    return bars;
  }

  // --- Rendering ---

  // Render waveform and progress
  function render(force) {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    let progress = 0, time = 0, duration = 0;
    if (canScrub) {
      duration = audio.duration;
      if (isScrubbing) {
        progress = scrubProgress;
        time = scrubProgress * duration;
      } else if (duration > 0) {
        progress = audio.currentTime / duration;
        time = audio.currentTime;
        progress = Math.max(0, Math.min(1, progress));
      }
    }
    if (!force && width === lastWidth && height === lastHeight && progress === lastProgress) return;
    lastWidth = width; lastHeight = height; lastProgress = progress;

    // Update time display and event once per second
    let displaySec;
    if (!isScrubbing && progress === 0 && duration > 0 && audio.paused) {
      displaySec = Math.round(duration);
    } else {
      displaySec = Math.max(0, Math.round(time));
    }
    if (displaySec !== lastDisplayedSec) {
      outputTime(displaySec, duration);
      lastDisplayedSec = displaySec;
    }
    if (typeof onProgress === "function") onProgress(progress);
    // Removed ctx.triggerActionEvent("progress", progress); as requested

    // Precompute bars if needed
    if (!barCache || barCache.width !== width || barCache.height !== height) {
      barCache = { width, height, bars: precomputeBars(width, height) };
    }

    // Draw waveform bars
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx2d = canvas.getContext('2d');
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

    const bars = barCache.bars;
    const activeBars = Math.floor(bars.length * progress);
    for (let i = 0; i < bars.length; i++) {
      const { x, y, barWidth, barHeight, barRadius } = bars[i];
      ctx2d.fillStyle = i < activeBars ? activeColor : waveColor;
      ctx2d.beginPath();
      ctx2d.moveTo(x + barRadius, y);
      ctx2d.lineTo(x + barWidth - barRadius, y);
      ctx2d.quadraticCurveTo(x + barWidth, y, x + barWidth, y + barRadius);
      ctx2d.lineTo(x + barWidth, y + barHeight - barRadius);
      ctx2d.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - barRadius, y + barHeight);
      ctx2d.lineTo(x + barRadius, y + barHeight);
      ctx2d.quadraticCurveTo(x, y + barHeight, x, y + barHeight - barRadius);
      ctx2d.lineTo(x, y + barRadius);
      ctx2d.quadraticCurveTo(x, y, x + barRadius, y);
      ctx2d.closePath();
      ctx2d.fill();
    }

    // --- Handle Positioning ---
    // Move the handle to the correct x position based on progress
    if (handle) {
      // Calculate x position in px
      const handleX = progress * (width || 1);
      handle.style.transform = `translateX(${handleX}px)`;
    }
  }

  // --- rAF Loop Management ---

  // rAF loop for continuous canvas updates.
  // If an error occurs in render, it will be caught and logged.
  // If the canvas or time ever gets stuck, check for errors here.
  function rafLoop() {
    rafId = null;
    try {
      render();
    } catch (err) {
      // Error handling: log and stop the loop to avoid infinite errors.
      console.error("Error in render loop:", err);
      rafActive = false;
      // Optionally, display error to user or attempt recovery here.
      return;
    }
    if (rafActive) rafId = requestAnimationFrame(rafLoop);
  }
  // Controls the requestAnimationFrame loop for canvas updates.
  // If the canvas or time stops updating, check if rafActive is true when it should be.
  // If rafActive is false but audio is playing, a warning will be logged.
  function updateRAF() {
    // Start rAF if playing, scrubbing, or uiActive is set (after tap-to-seek)
    const shouldRun = (!audio.paused && !audio.ended) || isScrubbing || uiActive;
    if (shouldRun && !rafActive) {
      rafActive = true;
      rafId = requestAnimationFrame(rafLoop);
    } else if (!shouldRun && rafActive) {
      rafActive = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      render(true); // Final render to ensure up-to-date
    }
    // Diagnostic: warn if rAF should be running but isn't
    if (shouldRun && !rafActive) {
      console.warn("Warning: rAF should be active but is not. Canvas may stop updating.");
    }
  }

  // --- Resize Observer ---

  let resizeObserver = new ResizeObserver(() => render(true));
  resizeObserver.observe(canvas);
  instance._observer = resizeObserver;

  // --- Audio Event Listeners for rAF Control ---

  addEventListenerWithRemove(audio, 'play', updateRAF);
  addEventListenerWithRemove(audio, 'pause', updateRAF);
  addEventListenerWithRemove(audio, 'ended', updateRAF);
  addEventListenerWithRemove(audio, 'seeked', () => render(true));
  addEventListenerWithRemove(audio, 'timeupdate', () => { if (!rafActive) render(); });

  // --- Page Visibility/Show Events (Mobile Resume Fix) ---
  addEventListenerWithRemove(document, 'visibilitychange', () => {
    if (!document.hidden) {
      // Page became visible, ensure rAF is running if audio is playing
      updateRAF();
    }
  });
  addEventListenerWithRemove(window, 'pageshow', () => {
    // Page was shown (e.g., after being restored from bfcache)
    updateRAF();
  });

  // --- Play/Pause Button Logic ---

  // Show/hide play and pause buttons based on audio state
  function updatePlayPauseButtons() {
    if (!playbutton || !pausebutton) return;
    if (audio.paused) {
      playbutton.style.display = '';
      pausebutton.style.display = 'none';
    } else {
      playbutton.style.display = 'none';
      pausebutton.style.display = '';
    }
  }
  // Pause all other instances when this one plays
  function pauseOtherInstances() {
    (window._audioWaveformScrubberInstances || []).forEach(inst => {
      if (inst !== instance && inst.audio && !inst.audio.paused) {
        inst.audio.pause();
      }
    });
  }

  // Play button click
  if (playbutton) {
    const playFn = () => {
      pauseOtherInstances();
      audio.play().catch(() => {
        // Handle play error (e.g., user gesture required)
        updatePlayPauseButtons();
      });
      updatePlayPauseButtons();
    };
    addEventListenerWithRemove(playbutton, 'click', playFn);
  }
  // Pause button click
  if (pausebutton) {
    const pauseFn = () => {
      audio.pause();
      updatePlayPauseButtons();
    };
    addEventListenerWithRemove(pausebutton, 'click', pauseFn);
  }
  // Update buttons on audio state change
  addEventListenerWithRemove(audio, 'play', () => {
    pauseOtherInstances();
    updatePlayPauseButtons();
  });
  addEventListenerWithRemove(audio, 'pause', updatePlayPauseButtons);
  addEventListenerWithRemove(audio, 'ended', updatePlayPauseButtons);

  // Initial button state
  updatePlayPauseButtons();

  // --- Scrubbing Logic (Pointer Events, Only on Handle) ---

  // Only allow scrubbing by dragging the handle element

  // Helper: keep UI active for 2s after any pointer interaction
  function keepUIActive() {
    uiActive = true;
    updateRAF();
    if (uiActiveTimeoutId) clearTimeout(uiActiveTimeoutId);
    uiActiveTimeoutId = setTimeout(() => {
      if (!isScrubbing) {
        uiActive = false;
        updateRAF();
      }
    }, 2000);
  }

  function pointerDownHandle(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!canScrub) return;
    isScrubbing = true;
    scrubProgress = getProgressFromPointer(e);
    keepUIActive();
    render(true);
    // Disable swipe-to-reply while scrubbing
    if (ctx && typeof ctx.triggerActionEvent === "function") ctx.triggerActionEvent("disable_reply", false);
    if (e.pointerId !== undefined && handle.setPointerCapture) {
      handle.setPointerCapture(e.pointerId);
    }
  }
  function pointerMoveHandle(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!canScrub) return;
    if (isScrubbing) {
      scrubProgress = getProgressFromPointer(e);
      render(true);
    }
    keepUIActive();
  }
  function pointerUpHandle(e) {
    if (!canScrub) return;
    if (isScrubbing) {
      isScrubbing = false;
      scrubProgress = getProgressFromPointer(e);
      setAudioCurrentTime(scrubProgress * audio.duration);
      // Reset progress cache to force full UI update after seek
      lastProgress = -1;
      lastDisplayedSec = -1;
      render(true);
      // Re-enable swipe-to-reply after scrubbing
      if (ctx && typeof ctx.triggerActionEvent === "function") ctx.triggerActionEvent("disable_reply", true);
      if (e.pointerId !== undefined && handle.releasePointerCapture) {
        handle.releasePointerCapture(e.pointerId);
      }
    }
    keepUIActive();
  }
  function pointerLeaveHandle(e) {
    if (isScrubbing) {
      isScrubbing = false;
      render(true);
      // Re-enable swipe-to-reply after scrubbing
      if (ctx && typeof ctx.triggerActionEvent === "function") ctx.triggerActionEvent("disable_reply", true);
    }
    keepUIActive();
  }

  // Attach pointer events to handle only
  if (handle) {
    instance._handle = handle;
    addEventListenerWithRemove(handle, 'pointerdown', pointerDownHandle);
    addEventListenerWithRemove(handle, 'pointermove', pointerMoveHandle);
    addEventListenerWithRemove(handle, 'pointerup', pointerUpHandle);
    addEventListenerWithRemove(handle, 'pointerleave', pointerLeaveHandle);

    // --- Touch event prevention for vertical scroll during scrubbing ---
    // Prevent vertical scroll while scrubbing on touch devices
    function touchStartHandle(e) {
      if (!canScrub) return;
      isScrubbing = true;
    }
    function touchMoveHandle(e) {
      if (isScrubbing && e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    function touchEndHandle(e) {
      isScrubbing = false;
    }
    addEventListenerWithRemove(handle, 'touchstart', touchStartHandle, { passive: false });
    addEventListenerWithRemove(handle, 'touchmove', touchMoveHandle, { passive: false });
    addEventListenerWithRemove(handle, 'touchend', touchEndHandle, { passive: false });
    addEventListenerWithRemove(handle, 'touchcancel', touchEndHandle, { passive: false });
  }

  // --- Canvas Tap-to-Seek Logic (Pointer Down/Up with Tap Detection) ---

  let canvasPointerDownPos = null;
  function pointerDownCanvas(e) {
    if (!canScrub) return;
    // Record pointer down position
    canvasPointerDownPos = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
    keepUIActive();
  }
  function pointerMoveCanvas(e) {
    keepUIActive();
  }
  function pointerUpCanvas(e) {
    if (!canScrub || !canvasPointerDownPos) {
      keepUIActive();
      return;
    }
    // Only respond to the same pointer
    if (e.pointerId !== undefined && e.pointerId !== canvasPointerDownPos.pointerId) {
      keepUIActive();
      return;
    }
    const dx = e.clientX - canvasPointerDownPos.x;
    const dy = e.clientY - canvasPointerDownPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const TAP_THRESHOLD = 18; // pixels, adjust as needed
    if (dist <= TAP_THRESHOLD) {
      // Treat as tap, seek
      const progress = getProgressFromPointer(e);
      setAudioCurrentTime(progress * audio.duration);
      // If paused, play audio on tap (only on first tap)
      if (audio.paused && !hasTappedToPlay) {
        pauseOtherInstances();
        audio.play().catch(() => {
          // Handle play error (e.g., user gesture required)
        });
        hasTappedToPlay = true;
      }
      // Reset progress cache to force full UI update
      lastProgress = -1;
      lastDisplayedSec = -1;
      render(true);
    }
    keepUIActive();
    canvasPointerDownPos = null;
  }
  function pointerLeaveCanvas(e) {
    keepUIActive();
  }
  addEventListenerWithRemove(canvas, 'pointerdown', pointerDownCanvas);
  addEventListenerWithRemove(canvas, 'pointermove', pointerMoveCanvas);
  addEventListenerWithRemove(canvas, 'pointerup', pointerUpCanvas);
  addEventListenerWithRemove(canvas, 'pointerleave', pointerLeaveCanvas);

  // --- Audio Error Handling ---

  // Handle audio loading and playback errors gracefully
  addEventListenerWithRemove(audio, 'error', (e) => {
    canScrub = false;
    render(true);
    updatePlayPauseButtons();
    // Optionally, display error to user (not implemented here)
  });

  // --- Initial Render and rAF State ---
  // Wait for metadata to be loaded before first render
  addEventListenerWithRemove(audio, 'loadedmetadata', () => {
    render(true);
    updateRAF();
    // Set initial swipe-to-reply state (enabled)
    if (ctx && typeof ctx.triggerActionEvent === "function") ctx.triggerActionEvent("disable_reply", true);
  });

  // If metadata is already loaded, render immediately
  if (audio.readyState >= 1) {
    render(true);
    updateRAF();
    if (ctx && typeof ctx.triggerActionEvent === "function") ctx.triggerActionEvent("disable_reply", true);
  }

  // --- Cleanup/Destroy Method ---
  instance.destroy = function() {
    // Remove all event listeners
    if (instance._eventRemovers) {
      instance._eventRemovers.forEach(fn => { try { fn(); } catch (e) {} });
      instance._eventRemovers = [];
    }
    // Disconnect ResizeObserver
    if (instance._observer && typeof instance._observer.disconnect === "function") {
      try { instance._observer.disconnect(); } catch (e) {}
      instance._observer = null;
    }
    // Remove audio element from DOM
    if (instance.audio && instance.audio.parentNode) {
      try { instance.audio.pause(); } catch (e) {}
      try { instance.audio.parentNode.removeChild(instance.audio); } catch (e) {}
      instance.audio = null;
    }
    // Remove instance from global array
    if (window._audioWaveformScrubberInstances) {
      const idx = window._audioWaveformScrubberInstances.indexOf(instance);
      if (idx !== -1) window._audioWaveformScrubberInstances.splice(idx, 1);
    }
    // Remove handle reference
    instance._handle = null;
    // Remove canvas reference
    instance._canvas = null;
  };

  return instance;
}
