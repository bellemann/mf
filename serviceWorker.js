/**
 * sw.js - Minimal service worker for push notifications
 * (forced update: trigger reload for debugging)
 */

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
        } catch (err) {
       
        }
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

/**
 * Badge count caching using Cache API
 */
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
     
      } catch (err) {
     
      }
    } else {
  
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
         
        } catch (err) {
         
        }
      } else {
        
      }
      // NEW: Close all notifications
      const notifications = await self.registration.getNotifications();
      notifications.forEach(n => n.close());
    
    })();
  }
});
