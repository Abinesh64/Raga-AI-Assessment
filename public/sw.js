// ✅ Install
self.addEventListener("install", (event) => {
  console.log("[SW] Installed");
  self.skipWaiting(); // Activate immediately
});

// ✅ Activate
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");
  event.waitUntil(self.clients.claim()); // Take control instantly
});

// ✅ Handle Push Notifications (for future backend use)
self.addEventListener("push", (event) => {
  console.log("[SW] Push received");

  let data = {
    title: "Health SaaS",
    body: "New update available",
    url: "/dashboard",
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = {
        title: parsed.title || data.title,
        body: parsed.body || data.body,
        url: parsed.url || data.url,
      };
    }
  } catch (err) {
    console.error("[SW] Push parse error:", err);
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      vibrate: [100, 50, 100],
      data: { url: data.url },
    }),
  );
});

// ✅ Handle Notification Click
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked");

  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        // If tab already open → focus it
        for (const client of clientsArr) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }
        // Otherwise → open new tab
        return self.clients.openWindow(targetUrl);
      }),
  );
});

// ✅ Optional: handle notification close
self.addEventListener("notificationclose", (event) => {
  console.log("[SW] Notification closed");
});
