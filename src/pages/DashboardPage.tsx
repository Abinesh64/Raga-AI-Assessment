import { useEffect } from "react";
import { usePatientStore } from "../stores/patientStore";

export function DashboardPage() {
  const patients = usePatientStore((state) => state.patients);

  useEffect(() => {
    document.title = "Dashboard | Health SaaS";
  }, []);

  const sendTestNotification = async () => {
    if (!("Notification" in window)) {
      alert("Notifications not supported");
      return;
    }

    let permission = Notification.permission;

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      alert("Permission denied. Please allow notifications");
      return;
    }

    const payload = {
      title: "🚨 Critical Alert",
      options: {
        body: "Patient requires immediate attention.",
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        vibrate: [100, 50, 100],
        data: { url: "/patients/p1" },
      },
    };

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(payload.title, payload.options);
      } else {
        new Notification(payload.title, payload.options);
      }
    } catch (err) {
      console.error("❌ Notification error:", err);
      new Notification(payload.title, payload.options);
    }
  };

  const totalPatients = patients.length;
  const activeCare = Math.max(0, totalPatients - 1);

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-3xl font-bold text-slate-900">
          👋 Welcome to Health SaaS
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Real-time overview of patients, analytics and care status.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-sm text-slate-500">Total patients</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-700">
            {totalPatients}
          </p>
        </article>

        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-sm text-slate-500">Active care teams</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-700">
            {activeCare}
          </p>
        </article>

        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-sm text-slate-500">Open alerts</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-700">3</p>
        </article>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-900 p-4 shadow-lg">
        <p className="text-sm text-white">Test your notification flow:</p>

        <button
          onClick={sendTestNotification}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Send test alert
        </button>
      </div>

      <section className="mt-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-lg font-medium text-slate-800">
          Recent patient notes
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {patients.slice(0, 3).map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.condition}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
