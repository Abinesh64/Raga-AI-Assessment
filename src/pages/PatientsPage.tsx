import { Link } from 'react-router-dom'
import { usePatientStore } from '../stores/patientStore'
import { PatientCard } from '../components/PatientCard'

export function PatientsPage() {
  const { patients, viewMode, toggleViewMode } = usePatientStore()

  return (
    <section className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Patient Management</h2>
            <p className="text-sm text-slate-500">Switch between grid and list view for fast navigation.</p>
          </div>
          <button
            type="button"
            onClick={toggleViewMode}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Switch to {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-50 shadow-lg ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-indigo-100 to-cyan-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Age</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Condition</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Last visit</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-4 py-3 text-sm text-slate-700">{patient.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{patient.age}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{patient.condition}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{patient.lastVisit}</td>
                  <td className="px-4 py-3">
                    <Link
                      className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                      to={`/patients/${patient.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
