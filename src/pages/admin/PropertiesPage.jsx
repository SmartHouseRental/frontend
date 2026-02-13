import { EllipsisVertical } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Search } from 'lucide-react';
import { Bell } from 'lucide-react';

function PropertiesPage() {
  return (
    <div className="scrollbar-hide h-screen flex-1 overflow-y-auto">
      <div className="p-8 pb-0">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Property Management</h1>
            <p className="mt-1 text-slate-500">
              Review, approve, or manage residential listings in Addis Ababa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-full px-4 py-2 font-bold">
              <Bell />
              <span>24 Pendings</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="dark:bg-background-dark/30 border-primary/5 rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium tracking-wider text-slate-400 uppercase">
              Total Listings
            </p>
            <p className="mt-1 text-2xl font-extrabold">1,284</p>
          </div>
          <div className="dark:bg-background-dark/30 border-primary/5 rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium tracking-wider text-slate-400 uppercase">Available</p>
            <p className="mt-1 text-2xl font-extrabold text-green-600">842</p>
          </div>
          <div className="dark:bg-background-dark/30 border-primary/5 rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium tracking-wider text-slate-400 uppercase">Pending</p>
            <p className="text-primary mt-1 text-2xl font-extrabold">24</p>
          </div>
          <div className="dark:bg-background-dark/30 border-primary/5 rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium tracking-wider text-slate-400 uppercase">Rented</p>
            <p className="mt-1 text-2xl font-extrabold">418</p>
          </div>
        </div>

        <div className="dark:bg-background-dark/30 border-primary/5 mt-8 flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4">
          <div className="relative min-w-[200px] flex-1">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
              <Search />
            </span>
            <input
              className="bg-background focus:ring-primary/50 w-full rounded-lg border-none py-2 pr-4 pl-10 outline-none focus:ring-2"
              placeholder="Search by ID, Title or Owner..."
              type="text"
            />
          </div>
          <select className="bg-background-light focus:ring-primary/50 rounded-lg border-none py-2 pr-10 pl-4 text-sm font-medium focus:ring-2">
            <option>Location (All Sub-cities)</option>
            <option>Bole</option>
            <option>Kirkos</option>
            <option>Arada</option>
            <option>Yeka</option>
            <option>Nifas Silk</option>
          </select>
          <select className="bg-background-light focus:ring-primary/50 rounded-lg border-none py-2 pr-10 pl-4 text-sm font-medium focus:ring-2">
            <option>Property Type</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Studio</option>
            <option>Office Space</option>
          </select>
          <select className="bg-background-light focus:ring-primary/50 rounded-lg border-none py-2 pr-10 pl-4 text-sm font-medium focus:ring-2">
            <option>Status</option>
            <option>Pending</option>
            <option>Available</option>
            <option>Rejected</option>
          </select>
          <button className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-bold text-white">
            Filter
          </button>
        </div>
      </div>
      <section className="p-8">
        <div className="dark:bg-background-dark/30 border-primary/5 overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="dark:bg-background-dark/40 border-primary/5 border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Property Details
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Owner
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-primary/5 divide-y">
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-400">#PRP-1024</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Villa in Bole"
                      className="h-12 w-12 rounded-lg object-cover"
                      data-alt="Modern luxury villa with white exterior and large windows"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAenV_3qVcY9Qwk4wakHFXyVXSOEDbP8zpfnM2v9TbZZ2Dx6DLWg5WzQMyNUilW90Vq6f0sOyGmDlljmxE7SRGuPZ-mGD-mS_QOap5qzI1l0B9w5oqkoaVuzgP0alYz1POLq1Z7wdkOyl9G_RiBmtBc7JBDBBkBfJWkaugjSN-COItg-1H_5I30pLWoet3qEwRfjR7o65lqEoboTysrWFX5ACBJPW9fma8PplImAgccKF74CzCl70Hn_SR2cYk6Y1xVSWEP6nDHyYs"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        Luxury Villa in Bole Atlas
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="material-icons text-primary text-[12px]">
                          <MapPin className="h-3 w-3" />
                        </span>
                        Bole, Addis Ababa
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">Abebe Kebede</p>
                  <p className="text-xs text-slate-400">abebe.k@email.com</p>
                </td>
                <td className="px-6 py-4">Villa</td>

                <td className="px-6 py-4">
                  <p className="text-primary text-sm font-extrabold">85,000 ETB</p>
                  <p className="text-[10px] text-slate-400 uppercase">per month</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-tight text-orange-600 uppercase dark:bg-orange-500/20 dark:text-orange-400">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">
                  <EllipsisVertical />
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-400">#PRP-1025</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Apartment in Kazanchis"
                      className="h-12 w-12 rounded-lg object-cover"
                      data-alt="Interior view of a modern apartment living room"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO7eUWijcAc_ASnSjjax4r2ZUODWCNHz0q7I1fABp0IHJDb88MrrOLVInpCPVfGWnSu9zTrTxj9pEMUTxbuBeiCCe-Rp8dNl8T_cZVPdxhCoweabfPzboG_AAtnmWp2LvWG4XUsf9_iaO_UykUoUjCh9rb19GRstYHMUeNAaY_wvvFPRKDscuNMBJ1u_7nQ50X9-xNLlqnj0Thy7k3puJW45PNwc2OgSK3IQaEiprVQbXKEMJ39bkkEPtUS57fxUPd1clCiEl0z3L0"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        Modern Apt Near UN HQ
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="material-icons text-primary text-[12px]">
                          <MapPin className="h-3 w-3" />
                        </span>
                        Kazanchis, Addis Ababa
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">Martha Tadesse</p>
                  <p className="text-xs text-slate-400">m.tadesse@example.com</p>
                </td>
                <td className="px-6 py-4">Villa</td>

                <td className="px-6 py-4">
                  <p className="text-primary text-sm font-extrabold">45,000 ETB</p>
                  <p className="text-[10px] text-slate-400 uppercase">per month</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold tracking-tight text-green-600 uppercase dark:bg-green-500/20 dark:text-green-400">
                    Available
                  </span>
                </td>
                <td className="px-6 py-4">
                  <EllipsisVertical />
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-400">#PRP-1026</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Studio in Sarbet"
                      className="h-12 w-12 rounded-lg object-cover"
                      data-alt="Cozy small studio apartment with minimalist furniture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlZuqUfIqOwxu_U-mQMPlU9IUH8B4ueJPkwSu-YK5pKXhWk6aYBJFW7Vi-AqsgPYaOdLlITggeHk-pjgDKmGZ5BMb28P5wmSvISit4qS1WRdcXFip7El56mklZ5aJQIMRi6cVd0M-Ocvkb4fkChHjTPBbu650G-v1ln0EHREgYnlqXXK21Es6WgwAO3Ukz5NmW1e5hoCFXj19w5YG24DMAQt78ADUWQ1AyxDe9H8DFo_UkfjoZ1Qo_gvwMkCJm98_xKFBoO4w6QaFe"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        Cozy Studio in Sarbet
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="material-icons text-primary text-[12px]">
                          <MapPin className="h-3 w-3" />
                        </span>
                        Kirkos, Addis Ababa
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">Samuel Bekele</p>
                  <p className="text-xs text-slate-400">sam.bekele@web.com</p>
                </td>
                <td className="px-6 py-4">Villa</td>

                <td className="px-6 py-4">
                  <p className="text-primary text-sm font-extrabold">22,000 ETB</p>
                  <p className="text-[10px] text-slate-400 uppercase">per month</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-tight text-orange-600 uppercase dark:bg-orange-500/20 dark:text-orange-400">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">
                  <EllipsisVertical />
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-400">#PRP-1027</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Villa in CMC"
                      className="h-12 w-12 rounded-lg object-cover"
                      data-alt="Large garden landscape in front of a colonial style villa"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIkost0zhPZCXdKbHVWJUXvpUPiS6SOwbJTjQN7MYVB69T0XpyrdtRfU3wBjB4K-QfNuHB-zZpSxQyW4u8F4F6QhOlKcrpyFOg0g-1y8Zjd4SLqoIazjy8LE3PrG_JrMistXJxBAPT_dc_ozPGbzmqrvxWBkK4_SwddA2p0o_Qb_4v_gHFsbm_HvqNBCR3EM1_kVDri0rmhZoDirAkV17tJW3OyfeVwniIWEOk3_g3GEkxeTuF3MqA5RnBHKgEQN6utOE8ZZAdzyCZ"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        Spacious Family Villa
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="material-icons text-primary text-[12px]">
                          <MapPin className="h-3 w-3" />
                        </span>
                        CMC, Addis Ababa
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">Hanna Kebrom</p>
                  <p className="text-xs text-slate-400">hanna.k@mail.com</p>
                </td>
                <td className="px-6 py-4">Villa</td>

                <td className="px-6 py-4">
                  <p className="text-primary text-sm font-extrabold">120,000 ETB</p>
                  <p className="text-[10px] text-slate-400 uppercase">per month</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold tracking-tight text-green-600 uppercase dark:bg-green-500/20 dark:text-green-400">
                    Available
                  </span>
                </td>
                <td className="px-6 py-4">
                  <EllipsisVertical />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="dark:bg-background-dark/40 border-primary/5 flex items-center justify-between border-t bg-slate-50 px-6 py-4">
            <p className="text-xs font-medium text-slate-500">Showing 1-4 of 1,284 properties</p>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-white disabled:opacity-50"
                disabled=""
              >
                <span className="material-icons text-sm">
                  <ChevronLeft />
                </span>
              </button>
              <button className="bg-primary rounded-lg px-3 py-1 text-xs font-bold text-white">
                1
              </button>
              <button className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white">
                2
              </button>
              <button className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white">
                3
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white">
                321
              </button>
              <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-white">
                <span className="material-icons text-sm">
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PropertiesPage;
