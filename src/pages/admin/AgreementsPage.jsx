import { Newspaper } from 'lucide-react';
import { CircleDot } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';
import { Download } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

function AgreementsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-charcoal text-3xl font-extrabold dark:text-white">
            Agreements Management
          </h2>
          <p className="text-secondary mt-1 font-medium italic">
            Review and manage rental contracts across Ethiopia
          </p>
        </div>
        <div className="">
          <button className="border-primary/20 text-primary hover:bg-primary/5 flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-bold transition-all">
            <Download /> Export CSV
          </button>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-primary/10 rounded-xl border bg-white p-6 shadow-sm dark:bg-[#2a1f18]">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Newspaper />
            </div>
            <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-bold text-green-500">
              +12%
            </span>
          </div>
          <p className="text-secondary text-sm font-medium">Total Agreements</p>
          <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">1,482</h3>
        </div>
        <div className="border-primary/10 rounded-xl border bg-white p-6 shadow-sm dark:bg-[#2a1f18]">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <CircleCheckBig />
            </div>
            <span className="text-primary bg-primary/10 rounded px-2 py-1 text-xs font-bold">
              Target 90%
            </span>
          </div>
          <p className="text-secondary text-sm font-medium">Active Agreements</p>
          <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">86.4%</h3>
        </div>

        <div className="border-primary/10 rounded-xl border bg-white p-6 shadow-sm dark:bg-[#2a1f18]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <CircleDot />{' '}
            </div>
            <span className="rounded bg-red-500/10 px-2 py-1 text-xs font-bold text-red-500">
              Priority
            </span>
          </div>
          <p className="text-secondary text-sm font-medium">Pending Disputes</p>
          <h3 className="text-charcoal mt-1 text-2xl font-extrabold dark:text-white">14</h3>
        </div>
      </div>
      <div className="border-primary/10 mb-8 overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-[#2a1f18]">
        <div className="border-primary/10 border-b px-6">
          <div className="scrollbar-hide flex gap-8 overflow-x-auto">
            <button className="border-primary text-primary border-b-2 py-4 font-bold whitespace-nowrap">
              All Agreements
            </button>
            <button className="text-secondary hover:text-primary border-b-2 border-transparent py-4 font-medium whitespace-nowrap transition-colors">
              Drafts
            </button>
            <button className="text-secondary hover:text-primary border-b-2 border-transparent py-4 font-medium whitespace-nowrap transition-colors">
              Active
            </button>
            <button className="text-secondary hover:text-primary border-b-2 border-transparent py-4 font-medium whitespace-nowrap transition-colors">
              Expiring Soon
            </button>
            <button className="text-secondary hover:text-primary border-b-2 border-transparent py-4 font-medium whitespace-nowrap transition-colors">
              Completed
            </button>
            <button className="text-secondary hover:text-primary border-b-2 border-transparent py-4 font-medium whitespace-nowrap transition-colors">
              Disputed
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <span className="text-secondary absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                <Search />
              </span>
              <input
                className="bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary w-full rounded-lg border-transparent py-2 pr-4 pl-10 text-sm font-medium"
                placeholder="Search ID or Name..."
                type="text"
              />
            </div>
            <div>
              <select className="bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-secondary w-full rounded-lg border-transparent px-4 py-2 text-sm font-medium">
                <option>Property Type</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Commercial</option>
              </select>
            </div>
            <div>
              <select className="bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-secondary w-full rounded-lg border-transparent px-4 py-2 text-sm font-medium">
                <option>Status</option>
                <option>Active</option>
                <option>Pending Signature</option>
                <option>Disputed</option>
              </select>
            </div>
            <div>
              <input
                className="bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-secondary w-full rounded-lg border-transparent px-4 py-2 text-sm font-medium"
                type="date"
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-secondary hover:bg-secondary/90 flex-1 rounded-lg py-2 text-sm font-bold text-white transition-all">
                Apply
              </button>
              <button className="bg-primary/10 text-primary hover:bg-primary/20 flex w-10 items-center justify-center rounded-lg transition-all">
                <RefreshCcw />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-primary/10 overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-[#2a1f18]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-secondary border-primary/10 border-b">
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase">
                  Agreement ID
                </th>
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase">
                  Property
                </th>
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase">
                  Renter / Owner
                </th>
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase">
                  Rent (ETB)
                </th>
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase">
                  Duration
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-extrabold tracking-widest uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-extrabold tracking-widest uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-primary/10 divide-y">
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4">
                  <span className="text-primary font-bold">#AG-9428</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        data-alt="Modern apartment exterior"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMOprguOjuAF8Qrb9Zd77c1Dv3YD3zqIUHFferta0hg3M0BhOsuEjs4O_4XyLTcQeDis92itJDmNWfCf7sy2_GMPcRJGLNNoZi4RqrpfxnlK7WLDtwdFZGhxbku7hQ6YL-ASEw6-EE9YyfsL9N6Z6OXwn6g3wmL91rwoCvxYx3_AwAZMvS4ylMV7aDwjyFozB0ZAubsD-X1Ey6TZjkd3k7BMNUGWIWCQ-LXJf6xaPd6ggQzeLbaO9HZax_anf1nmVTEXakADTFq-C"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Bole Skyline Apt.</p>
                      <p className="text-secondary text-xs">Addis Ababa, Bole</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Mulugeta K.</p>
                  <p className="text-secondary text-[10px]">Owner: Tadesse W.</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">45,000 ETB</p>
                  <p className="text-secondary text-[10px]">Dep: 90,000 ETB</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium">12 Months</td>
                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-green-600 uppercase">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-secondary hover:text-primary p-2 transition-colors">
                    <EllipsisVertical />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4">
                  <span className="text-primary font-bold">#AG-9425</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        data-alt="Traditional style cottage"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWZHpS6lV3SYiU1eP_SsrTWOxiR6_pyB3JdkjTRny_joICLEWAGFiXQAHiwqYxetRWWIfeZHCmbjGSNgsDzf2u5DzeFlZXZhzEbk91sGzcMQwTh7iyxI1zOOgNduhPowKCL9VEAOvNl_MwNh-hUgmBg4Fcxy7OeaPQqRUGzp-YYh0HKH21XVLNNHEnrgCyGilVxFMseejojiPXSww4TYQQ8TTGQwtyNOSEHKAJiAXX5-EfbrlFScnJp9pfMKHs82IRqDVPud_6peU"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Kebena Garden Villa</p>
                      <p className="text-secondary text-xs">Addis Ababa, Kebena</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Lidya T.</p>
                  <p className="text-secondary text-[10px]">Owner: Sahle-Work Z.</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">120,000 ETB</p>
                  <p className="text-secondary text-[10px]">Dep: 360,000 ETB</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium">24 Months</td>
                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-amber-600 uppercase">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-secondary hover:text-primary p-2 transition-colors">
                    <EllipsisVertical />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4">
                  <span className="text-primary font-bold">#AG-9412</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        data-alt="Modern office interior"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqbq35e8qQNmV_8A1hkGudKQ7YB_j-k6vm_2MzoAvMdJyi4CbcCiniX9zmi7sC57vkzJI7i0p_tOKf9A_zAREH_wSP_7w9Xn96hublk2d4_yr8ITyqO4TbHm0d9bjdjfcrT881TYBa6khpPrUbyIpOMMuPGiJI-1OWIEpEUHpz6j0V0o58dqgbmTucO0R0qFEz6RgeAke_N39cfUYSi9CfYxzfgrST38NXIsQS_QSXk9l_o6U2XkgZOVwEOCGSIltD48uUPODDH0UR"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Kazanchis HQ Tower</p>
                      <p className="text-secondary text-xs">Addis Ababa, Kazanchis</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Teklehaimanot S.</p>
                  <p className="text-secondary text-[10px]">Owner: Gize PLC</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">85,000 ETB</p>
                  <p className="text-secondary text-[10px]">Dep: 170,000 ETB</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium">36 Months</td>
                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-red-600 uppercase">
                    Disputed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-secondary hover:text-primary p-2 transition-colors">
                    <EllipsisVertical />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 group transition-colors">
                <td className="px-6 py-4">
                  <span className="text-primary font-bold">#AG-9388</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        data-alt="Clean kitchen and dining area"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbR_6Wwde8T3Qo4iVJdJDmsiW8BgIeczHEE7Zm1kc--b2qY_h8S4yFeoqHOH2NfMe0TpbuRaZuUArFb8FvVd_pdrkG-thnbky1HEOguMOERnNd7hMqtwh-Vhrv1ZDqlDQT9FEN38WG-SL4Pb5ixMIm2ZkVPulaaadhOfmmbACf5c2654ER8rcb9-3pOmjkKA_WCkxDbM58Gyg1WPF7uOhwqv8nWi90bnS0ha2jteCAigUFfAbe4Foh0veYCuaA0nUWH10gyLslZUPY"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Megenagna Cozy Flat</p>
                      <p className="text-secondary text-xs">Addis Ababa, Megenagna</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Abigail R.</p>
                  <p className="text-secondary text-[10px]">Owner: Petros D.</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">22,000 ETB</p>
                  <p className="text-secondary text-[10px]">Dep: 44,000 ETB</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium">6 Months</td>
                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-blue-600 uppercase">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-secondary hover:text-primary p-2 transition-colors">
                    <EllipsisVertical />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-primary/10 flex flex-col items-center justify-between gap-4 border-t p-6 sm:flex-row">
          <p className="text-secondary text-sm font-medium">
            Showing <span className="text-charcoal font-bold dark:text-white">1 - 4</span> of 1,482
            agreements
          </p>
          <div className="flex items-center gap-2">
            <button className="border-primary/20 text-secondary hover:bg-primary flex h-8 w-8 items-center justify-center rounded border transition-all hover:text-white">
              <span className="material-icons-round text-sm">
                <ChevronLeft />
              </span>
            </button>
            <button className="bg-primary flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-white">
              1
            </button>
            <button className="border-primary/20 text-secondary hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              2
            </button>
            <button className="border-primary/20 text-secondary hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              3
            </button>
            <span className="px-1">...</span>
            <button className="border-primary/20 text-secondary hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition-all">
              42
            </button>
            <button className="border-primary/20 text-secondary hover:bg-primary flex h-8 w-8 items-center justify-center rounded border transition-all hover:text-white">
              <span className="material-icons-round text-sm">
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgreementsPage;
