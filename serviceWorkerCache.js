const CACHE_NAME = 'mf-dynamic-cache-v1';

// Map requests to logical cache keys
async function getLogicalCacheKey(request) {
  const url = new URL(request.url);

  // 1. Virtual scroll feed API
  if (url.pathname.includes('/virtual_scroll_feed/apis/virtual_scroll_feed:')) {
    const reqClone = request.clone();
    const nordcraftUrl = reqClone.headers.get('x-nordcraft-url');
    if (nordcraftUrl) {
      try {
        const ncUrl = new URL(nordcraftUrl);
        const feedMatch = ncUrl.pathname.match(/\/feed\/([^\/]+)/);
        if (feedMatch) {
          return `/feed/${feedMatch[1]}`;
        }
      } catch (e) {}
    }
    const pathMatch = url.pathname.match(/virtual_scroll_feed:%2Ffeed%2F([^%\/]+)/);
    if (pathMatch) {
      return `/feed/${decodeURIComponent(pathMatch[1])}`;
    }
  }

  // 2. User API: /.../page_user/apis/page_user:%2Fget%2Fprofile
  if (url.pathname.includes('/page_user/apis/page_user:')) {
    const reqClone = request.clone();
    const nordcraftUrl = reqClone.headers.get('x-nordcraft-url');
    if (nordcraftUrl) {
      try {
        const ncUrl = new URL(nordcraftUrl);
        const username = ncUrl.searchParams.get('username');
        if (username) return `/user/${username}`;
      } catch (e) {}
    }
  }

  // 3. Hashtag feed API: /.../virtual_scroll_feed_hashtags/apis/virtual_scroll_feed_hashtags:
  if (url.pathname.includes('/virtual_scroll_feed_hashtags/apis/virtual_scroll_feed_hashtags:')) {
    const reqClone = request.clone();
    const nordcraftUrl = reqClone.headers.get('x-nordcraft-url');
    let hashtag = null;

    // Check x-nordcraft-url query parameters for hashtag_name
    if (nordcraftUrl) {
      try {
        const ncUrl = new URL(nordcraftUrl);
        const hashtagName = ncUrl.searchParams.get('hashtag_name');
        if (hashtagName) {
          hashtag = hashtagName; // e.g., 'toes'
        }
      } catch (e) {}
    }

    // Fallback to hashtag_id
    if (!hashtag) {
      const hashtagId = url.searchParams.get('hashtag_id');
      if (hashtagId) {
        hashtag = `id-${hashtagId}`; // e.g., 'id-241439b2-99ef-406c-b7f9-eefc3f7d13a0'
      }
    }

    // Fallback to 'initial' only for explicit initial requests
    if (!hashtag && nordcraftUrl) {
      try {
        const ncUrl = new URL(nordcraftUrl);
        if (ncUrl.pathname.includes('/feed/hashtag/initial') && !ncUrl.searchParams.get('hashtag_id')) {
          hashtag = 'initial';
        }
      } catch (e) {}
    }

    // Final fallback
    if (!hashtag) {
      hashtag = 'unknown';
    }

    return `/hashtag/${hashtag}`;
  }

  // 4. /user/:username, /users/:username, /profile/:username and subpaths
  const userMatch = url.pathname.match(/^\/(user|users|profile)\/([^\/]+)(\/.*)?$/);
  if (userMatch) {
    return `/user/${userMatch[2]}`;
  }

  // 5. /hashtag/:value and subpaths
  const hashtagMatch = url.pathname.match(/^\/hashtag\/([^\/]+)/);
  if (hashtagMatch) {
    return `/hashtag/${hashtagMatch[1]}`;
  }

  // 6. /app/hashtag/:hashtag and subpaths
  const appHashtagMatch = url.pathname.match(/^\/app\/hashtag\/([^\/]+)/);
  if (appHashtagMatch) {
    return `/hashtag/${appHashtagMatch[1]}`;
  }

  // 7. Images: use the path as the key
  if (/\.(png|jpe?g|gif|webp|svg|ico|bmp|avif|apng)$/i.test(url.pathname)) {
    return url.pathname;
  }

  // 8. Fallback: use the path
  return url.pathname;
}

// Should this request be cached?
function shouldCache(request) {
  const url = new URL(request.url);

  // 1. Virtual scroll feed API
  if (url.pathname.includes('/virtual_scroll_feed/apis/virtual_scroll_feed:')) return true;

  // 2. User API
  if (url.pathname.includes('/page_user/apis/page_user:')) return true;

  // 3. Hashtag feed API
  if (url.pathname.includes('/virtual_scroll_feed_hashtags/apis/virtual_scroll_feed_hashtags:')) return true;

  // 4. /user/:username, /users/:username, /profile/:username and subpaths
  if (/^\/(user|users|profile)\/[^\/]+(\/.*)?$/.test(url.pathname)) return true;

  // 5. /hashtag/:value and subpaths
  if (/^\/hashtag\/[^\/]+(\/.*)?$/.test(url.pathname)) return true;

  // 6. /app/hashtag/:hashtag and subpaths
  if (/^\/app\/hashtag\/[^\/]+(\/.*)?$/.test(url.pathname)) return true;

  // 7. Images
  if (/\.(png|jpe?g|gif|webp|svg|ico|bmp|avif|apng)$/i.test(url.pathname)) return true;

  return false;
}

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!shouldCache(event.request)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const url = new URL(event.request.url);
      let cacheKey = await getLogicalCacheKey(event.request);

      // Try cache first
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && response.status === 200) {
          let finalCacheKey = cacheKey;
          // Extract hashtag_name for hashtag feed API
          if (url.pathname.includes('/virtual_scroll_feed_hashtags/apis/virtual_scroll_feed_hashtags:')) {
            try {
              const responseClone = response.clone();
              const contentType = responseClone.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                const data = await responseClone.json();
                if (data.hashtag_name) {
                  finalCacheKey = `/hashtag/${data.hashtag_name}`;
                  // Check if final key already exists to avoid overwriting
                  const existing = await cache.match(finalCacheKey);
                  if (!existing) {
                    cache.put(finalCacheKey, response.clone());
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to parse hashtag_name from response:', e);
            }
          } else {
            // Cache non-hashtag requests with initial key
            cache.put(finalCacheKey, response.clone());
          }
        }
        return response;
      } catch (err) {
        // Fallback to cache if available
        const fallbackCache = await cache.match(cacheKey);
        if (fallbackCache) return fallbackCache;
        throw err; // Let browser handle network error
      }
    })()
  );
});

// Message handler for deleting cache entries or updating user follow status
self.addEventListener('message', async event => {
  if (event.data && event.data.type === 'delete-cache') {
    const { logicalPath } = event.data;
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(logicalPath);
    event.ports[0]?.postMessage({ success: true });
  } else if (event.data && event.data.type === 'update-user-follow') {
    const { username, follows_user } = event.data;
    const cacheKey = `/user/${username}`;
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      try {
        const data = await cachedResponse.json();
        data.follows_user = follows_user;
        const updatedResponse = new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        await cache.put(cacheKey, updatedResponse);
        event.ports[0]?.postMessage({ success: true });
      } catch (e) {
        event.ports[0]?.postMessage({ success: false, error: 'Failed to update cache' });
      }
    } else {
      event.ports[0]?.postMessage({ success: false, error: 'Cache entry not found' });
    }
  }
});

// Push notification and badge handling
self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'Push', body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'New Message';
  const options = {
    body: data.body || 'You have a new message from Myfeetish.',
    icon: data.icon || 'https://cdn.jsdelivr.net/gh/bellemann/mf@latest/mf2-512.png',
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    (async () => {
      let badgeValue;
      if (typeof data.badge === 'number') {
        badgeValue = data.badge;
      } else {
        const current = await getBadgeCount();
        badgeValue = current + 1;
      }
      await setBadgeCount(badgeValue);
      if (navigator.setAppBadge) {
        try {
          await navigator.setAppBadge(badgeValue);
        } catch (err) {}
      }
      await self.registration.showNotification(title, options);

      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({
          type: 'notification-sent',
          title,
          body: options.body,
          icon: options.icon,
          url: options.data.url
        });
      }
    })()
  );
});

const BADGE_CACHE = 'badge-cache-v1';
const BADGE_KEY = '/badge-count';

async function getBadgeCount() {
  const cache = await caches.open(BADGE_CACHE);
  const response = await cache.match(BADGE_KEY);
  if (!response) {
    return 0;
  }
  const text = await response.text();
  const num = parseInt(text, 10);
  return isNaN(num) ? 0 : num;
}

async function setBadgeCount(count) {
  const cache = await caches.open(BADGE_CACHE);
  await cache.put(BADGE_KEY, new Response(String(count)));
}

async function clearBadgeCount() {
  const cache = await caches.open(BADGE_CACHE);
  await cache.delete(BADGE_KEY);
}

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );

  (async () => {
    await clearBadgeCount();
    await setBadgeCount(0);
    if (navigator.clearAppBadge) {
      try {
        await navigator.clearAppBadge();
      } catch (err) {}
    }
  })();
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'clearBadge') {
    (async () => {
      await clearBadgeCount();
      await setBadgeCount(0);
      if (navigator.clearAppBadge) {
        try {
          await navigator.clearAppBadge();
        } catch (err) {}
      }
      const notifications = await self.registration.getNotifications();
      notifications.forEach(n => n.close());
    })();
  }
});
