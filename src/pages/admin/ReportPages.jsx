import { Filter } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';

function ReportsPage() {
  return (
    <div className="space-y-6 px-4 py-8">
      <div>
        <h2 className="text-3xl font-semibold">Reports</h2>
        <p className="text-foreground text-sm">Managing reports actively</p>
      </div>
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="relative min-w-[240px] flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400">
            <Search />
          </span>
          <input
            className="focus:ring-primary focus:border-primary w-full rounded-lg border-stone-200 py-2 pr-4 pl-10 text-sm"
            placeholder="Search by Report ID, user, or keyword..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select className="focus:ring-primary focus:border-primary rounded-lg border-stone-200 pr-10 text-sm">
            <option>Status: All</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Resolved</option>
            <option>Dismissed</option>
          </select>
          <select className="focus:ring-primary focus:border-primary rounded-lg border-stone-200 pr-10 text-sm">
            <option>Reason: All</option>
            <option>Fraud</option>
            <option>False Advertising</option>
            <option>No-show</option>
            <option>Inappropriate Content</option>
          </select>
          <div className="relative">
            <input
              className="focus:ring-primary focus:border-primary rounded-lg border-stone-200 pl-4 text-sm"
              type="date"
            />
          </div>
          <button className="bg-primary hover:bg-opacity-90 rounded-lg p-2 text-white transition-opacity">
            <span className="block text-sm">
              <Filter />
            </span>
          </button>
        </div>
      </section>
      <section className="overflow-visible rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Report ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Reporter
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Reported User
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Reason
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Created Date
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="transition-colors hover:bg-stone-50/50">
                <td className="text-secondary px-6 py-4 text-xs font-bold">#REP-8821</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">
                      SM
                    </div>
                    <span className="text-sm font-semibold">Sarah Miller</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLo23h_KguS-ROG8AAz4Hh75lsMt85_WPOlhWMXv4mmd98oGP2I8YcvMb-7qOmvd-l3Sj0e5TAPVHbKHXYo_95miDYERderalz4iloWyTeabX2SeiZ_v385qRFwyqBILvrx7hUGH8X1nQghHaNHJxAMusaCksdS0iE04z5DTpU2ak0lQirtw7DejH3uw5d_F6RloSIaUrptfzZljWB2XaokQQfEMnA2KF9JLcota_3YHMZAxRCsaQqb7lKjqYt26yLqgJcBcaZUWFW"
                    />
                    <span className="text-sm font-semibold">David Vance</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded bg-orange-100 px-2 py-1 text-[10px] font-extrabold whitespace-nowrap text-orange-700 uppercase">
                    False Advertising
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select className="focus:ring-primary focus:border-primary rounded-md border-stone-200 px-2 py-1 text-[11px] font-bold">
                    <option selected="">Pending</option>
                    <option>Under Review</option>
                    <option>Resolved</option>
                    <option>Dismissed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-medium text-stone-500 uppercase">Oct 24, 2023</p>
                  <p className="text-[10px] text-stone-400">14:20 PM</p>
                </td>
                <td className="relative px-6 py-4 text-right">
                  <button className="action-trigger hover:text-primary p-2 text-stone-400 transition-colors focus:outline-none">
                    <EllipsisVertical />
                  </button>
                  {/* <div className="action-dropdown absolute top-10 right-6 z-20 w-40 rounded-lg border border-stone-200 bg-white py-2 shadow-xl">
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">visibility</span> View Details
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-primary text-sm">gavel</span>{' '}
                      Resolve
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">notifications</span> Notify
                      User
                    </button>
                    <div className="my-1 h-[1px] bg-stone-100"></div>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                      <span className="material-icons-round text-sm">block</span> Dismiss
                    </button>
                  </div> */}
                </td>
              </tr>
              <tr className="transition-colors hover:bg-stone-50/50">
                <td className="text-secondary px-6 py-4 text-xs font-bold">#REP-8819</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-500">
                      JK
                    </div>
                    <span className="text-sm font-semibold">James Kim</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTkwkdRv-J6DOHTo-VsJYtEBtmb6sMkE6p-zjEhHgA-_t79t4B3g0Syu0o789Nzbjgf0iCUeZk3O_Q7olzmVXcaxxmZfUO_qtNOOUDbtDMR0Qh26F0CS90cA5-QmABhqRjzfSc7iCk939O4f_99VzEko0Ax_Is5EoGIMqpgJ_uRDBPHTCy9wyBhR5BoKXMKl4Ew0LjezQ2NhkZ-TkNJKx6iovNC1-rXdrC_RVNWP7rUt2YJlBPid1EnA5br0nqOQnB8X9Q77FXP1IO"
                    />
                    <span className="text-sm font-semibold">Elena Rossi</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded bg-red-100 px-2 py-1 text-[10px] font-extrabold whitespace-nowrap text-red-700 uppercase">
                    Fraud / Scam
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select className="focus:ring-primary focus:border-primary rounded-md border-stone-200 px-2 py-1 text-[11px] font-bold">
                    <option>Pending</option>
                    <option selected="">Under Review</option>
                    <option>Resolved</option>
                    <option>Dismissed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-medium text-stone-500 uppercase">Oct 23, 2023</p>
                  <p className="text-[10px] text-stone-400">09:15 AM</p>
                </td>
                <td className="relative px-6 py-4 text-right">
                  <button className="action-trigger hover:text-primary p-2 text-stone-400 transition-colors focus:outline-none">
                    <EllipsisVertical />
                  </button>
                  {/* <div className="action-dropdown absolute top-10 right-6 z-20 w-40 rounded-lg border border-stone-200 bg-white py-2 shadow-xl">
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">visibility</span> View Details
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-primary text-sm">gavel</span>{' '}
                      Resolve
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">notifications</span> Notify
                      User
                    </button>
                    <div className="my-1 h-[1px] bg-stone-100"></div>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                      <span className="material-icons-round text-sm">block</span> Dismiss
                    </button>
                  </div> */}
                </td>
              </tr>
              <tr className="transition-colors hover:bg-stone-50/50">
                <td className="text-secondary px-6 py-4 text-xs font-bold">#REP-8815</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-500">
                      AB
                    </div>
                    <span className="text-sm font-semibold">Anita Blake</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFNwPXINu_imBSsA7O5hDABoEZQye5FAqLbYyioSecxqgpRlp4IItEg0Ep7l3U1O8PQk1_KHOErwBbVJYWx1b44DB8B41Iv_kagSphJ8OcpPdqN-BngLXFA2tDpPNPDRy5rXAu3dBtK4YvVkwVYURmWotzHBH28Rzty_pBhXHl4dwUzOdfHjpkkv1r4cWunT-AHmaTf6b11JsAzQsQxTtnZFZ-ds7_dRvY3ka72d5GrKnmYCIrBrM_24vcdiaxN30yJiITTfhjMPRn"
                    />
                    <span className="text-sm font-semibold">Tom Wright</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded bg-stone-100 px-2 py-1 text-[10px] font-extrabold whitespace-nowrap text-stone-600 uppercase">
                    No-show Host
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select className="focus:ring-primary focus:border-primary rounded-md border-stone-200 px-2 py-1 text-[11px] font-bold">
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option selected="">Resolved</option>
                    <option>Dismissed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-medium text-stone-500 uppercase">Oct 22, 2023</p>
                  <p className="text-[10px] text-stone-400">18:45 PM</p>
                </td>
                <td className="relative px-6 py-4 text-right">
                  <button className="action-trigger hover:text-primary p-2 text-stone-400 transition-colors focus:outline-none">
                    <EllipsisVertical />
                  </button>
                  {/* <div className="action-dropdown absolute top-10 right-6 z-20 w-40 rounded-lg border border-stone-200 bg-white py-2 shadow-xl">
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">visibility</span> View Details
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-primary text-sm">gavel</span>{' '}
                      Resolve
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50">
                      <span className="material-icons-round text-sm">notifications</span> Notify
                      User
                    </button>
                    <div className="my-1 h-[1px] bg-stone-100"></div>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                      <span className="material-icons-round text-sm">block</span> Dismiss
                    </button>
                  </div> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-6 py-4">
          <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">
            Showing 1-10 of 124 Reports
          </span>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:bg-white">
              <span className="material-icons-round text-sm">
                <ChevronLeft />
              </span>
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-xs font-bold text-stone-600 transition-colors hover:bg-white">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-xs font-bold text-stone-600 transition-colors hover:bg-white">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:bg-white">
              <span className="material-icons-round text-sm">
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportsPage;
