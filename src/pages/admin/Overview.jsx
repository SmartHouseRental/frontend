import { CircleDot } from 'lucide-react';
import { Home } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { Users } from 'lucide-react';

function Overview() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Dashboard Overview</h2>
          <p className="mt-1 font-medium text-slate-500">
            Real-time platform metrics and system control center.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400">
          <span className="material-symbols-outlined text-sm">update</span>
          <span>Last updated: 2 mins ago</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="border-accent rounded-2xl border-l-4 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Users />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              <TrendingUp />
              +12%
            </span>
          </div>
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Total Users
          </p>
          <h3 className="mt-1 text-3xl font-bold">12,450</h3>
        </div>
        <div className="border-accent rounded-2xl border-l-4 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Home />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              <TrendingUp /> +5%
            </span>
          </div>
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Active Listings
          </p>
          <h3 className="mt-1 text-3xl font-bold">3,820</h3>
        </div>
        <div className="rounded-2xl border-l-4 border-rose-400 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="rounded-lg bg-rose-400/10 p-2 text-rose-500">
              <CircleDot />{' '}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-rose-500">
              Action Needed
            </span>
          </div>
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Pending Verifications
          </p>
          <h3 className="mt-1 text-3xl font-bold">42</h3>
        </div>
        <div className="border-accent rounded-2xl border-l-4 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Handshake />
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              <span className="text-xs">
                <TrendingUp />
              </span>{' '}
              +15%
            </span>
          </div>
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Agreements
          </p>
          <h3 className="mt-1 text-3xl font-bold">890</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
        <div className="space-y-8 lg:col-span-2">
          <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold">User Growth</h4>
                <div className="mt-1 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-accent size-2 rounded-full"></span>
                    <span className="text-xs font-medium text-slate-500">Current Period</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full border border-dashed border-slate-400"></span>
                    <span className="text-xs font-medium text-slate-500">Previous Period</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-primary rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
                  Monthly
                </button>
                <button className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50">
                  Weekly
                </button>
              </div>
            </div>
            <div className="relative h-72">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M0,250 C100,240 200,270 300,230 C400,190 500,210 600,160 C700,110 800,140 900,120 L1000,100"
                  fill="none"
                  opacity="0.5"
                  stroke="#94a3b8"
                  strokeDasharray="6,6"
                  strokeWidth="2"
                ></path>
                <path
                  d="M0,220 C100,210 200,240 300,180 C400,120 500,150 600,90 C700,30 800,60 900,40 L1000,20 L1000,300 L0,300 Z"
                  fill="url(#areaGradient)"
                ></path>
                <path
                  d="M0,220 C100,210 200,240 300,180 C400,120 500,150 600,90 C700,30 800,60 900,40 L1000,20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
                <circle
                  cx="600"
                  cy="90"
                  fill="#1e3a8a"
                  r="6"
                  stroke="#fff"
                  strokeWidth="3"
                ></circle>
              </svg>
              <div className="chart-tooltip bg-primary pointer-events-none absolute top-[60px] left-[580px] z-10 rounded-xl p-3 text-xs text-white">
                <p className="font-medium opacity-70">May 2024</p>
                <p className="mt-0.5 text-sm font-bold">2,480 New Users</p>
                <div className="mt-1 flex items-center gap-1 text-emerald-400">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span className="font-bold">+18% vs prev.</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between px-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Listings by City
                </h4>
                <span className="material-symbols-outlined text-lg text-slate-400">
                  location_on
                </span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>New York</span>
                    <span>1.2k</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="bg-primary h-full w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Los Angeles</span>
                    <span>980</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="bg-primary h-full w-[70%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="relative flex size-20 shrink-0 items-center justify-center">
                <svg className="size-full -rotate-90 transform">
                  <circle
                    className="text-slate-100"
                    cx="40"
                    cy="40"
                    fill="transparent"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="6"
                  ></circle>
                  <circle
                    className="text-accent"
                    cx="40"
                    cy="40"
                    fill="transparent"
                    r="34"
                    stroke="currentColor"
                    strokeDasharray="213.6"
                    strokeDashoffset="21.36"
                    strokeLinecap="round"
                    strokeWidth="6"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-black">90%</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Payment Success
                </h4>
                <div className="flex flex-col gap-1">
                  <p className="text-lg leading-tight font-bold">$2.4M</p>
                  <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span>
                    On Time Collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h4 className="text-lg font-bold">Recently Submitted Properties</h4>
            <p className="text-sm text-slate-500">
              Review new listings awaiting platform approval.
            </p>
          </div>
          <button className="text-primary rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-50">
            View Full Queue
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="/30 bg-slate-50/50 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Property Name</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="d divide-y divide-slate-100">
              <tr className="transition-colors hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div
                    className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnuoTFnm7eiUv3aKP_BJ5piF4y8mlzYH5ClM5cBXvCWiUBoKTyYq1fVvBa1ON_b343Lnm8gmkoCZu--XjCNHqF0C_MeQTDaVpBbPejgSOMxhesm8QdPtka1Sf7nq8DJL7UhC_eZs_rTsy4xIu6xuYQGKmdGUEc1F9lQPDNQ6jWkuyV_vzyE-JvOZVwndSvv4-arIqjshonMQ_Cvrc8GSp1iaQcWcbzTUNuOqCFGwTWZutx9kXsgtmfjULDan6j82KWu2NOo2-Z_dXl')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Horizon Peak Villa</p>
                  <p className="text-xs text-slate-500">ID: PR-9402</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-slate-200"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3Zv5Qqs1eb6dibqsV7q3gViURackqyH78pXKOUpHJolFGSCT3Z9RmgzlbHVW0PQYom3kc45jw3Ie1_Pxkmq90DBfahykycUdNLLkMeE0M-FuaJrbjQ_RxEhLGcKwvq1HbdNi1H2hixXsPhQTvldB0WNMdV8XR-fqotDrYQ1VrZPmaATTS4_81szDJs1krDraYZdDI48uHTQOkotqaTOiLPAyutyq6aPPE2GOqN9tKNsxzpH7pEDaFpbcnErDDMJzgeAcHaMOJa-MZ')",
                      }}
                    ></div>
                    <span className="text-sm font-medium">Michael Chen</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">Miami, FL</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 uppercase">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                <td className="px-6 py-4">
                  <button className="text-accent hover:text-primary text-xs font-bold">
                    Review Details
                  </button>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div
                    className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJmCVHHK5IgTYuMnEBX8RO1nOinrW0cnVikNmuGhYgY_CkHYI8gfpCp3SEvgug4SdZc7v6SX_o6N0eaXn-2EA9Z4xMqc9UosSSlqEGjec-0k91lXxF97pnVZ-EP6Vmf8WW4roVyCo5Am06bkxTHfotXf9mc3BScw9j6P4xBfjmzaQ5Z9Z9aX84jQ5oWmTUzI8Ifu0io--9zkixMk-fH4LdGKr80ZMqIQUK8K38xJmywgMq0LVHHEmKYxLMYGS6lfgFMprudQ4gCRcO')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Urban Loft 42</p>
                  <p className="text-xs text-slate-500">ID: PR-8210</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-slate-200"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj58V8RTH3-AtT79g3d6qGb2vavhXgSE2y1aHqa6J3tjxe8UN7OTlhY3Dv7V-NpJ-JZPcvyYQ_7LbBvyVShv7Y7xAlEt4He29exApLTZmthojFIWaXAX5XWEv92fDhDAAGx-3zHKSWrpqBwM43OG2TloV5-pRsF_4bJThIfwcdJYsR2Q05oebDMTZ27fZuDl3lcBlf_WSwF3hUX__7szfXtzoC0BS6R-Z9EW_07NaiAsB95UZHwoGfl4MsLKT4QdANRqNXlOdFTQ1E')",
                      }}
                    ></div>
                    <span className="text-sm font-medium">Sarah Jenkins</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">Seattle, WA</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-bold text-rose-700 uppercase">
                    Needs Review
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 23, 2023</td>
                <td className="px-6 py-4">
                  <button className="text-accent hover:text-primary text-xs font-bold">
                    Review Details
                  </button>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div
                    className="size-14 rounded-lg border border-slate-200 bg-slate-100 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHK4MBf-7UqrhDns85XvQ8rILU5gDaYMqKUfF9Wf5uB7jOthE-628mLKysKbIm1k6jW99udN3BX2TELrn_bQhFYQE4qiEKrxf9Uvwi94473iylGn2WS5r61GBMgRbO7vN-8WO902Pk_3LWwYfkGACDKym_P-aSaMjnt5XB3lL6_i562wLzPu0wKH5lnacfnK0J1c_n9mz4fslMIn6wohA3b1ddHEiYTpShBnbHAmhp5ifGDttU_5ZxLoR-BUPiZwEpwYOYUg1kB9Q2')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">Cottage by the Lake</p>
                  <p className="text-xs text-slate-500">ID: PR-7731</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-slate-200"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXoMCKst5jXLQ8v_86OCtrjKWx_6NRcwIrSJdYnUIuvt5FqNVAz7jcQyn-gjTfoHUwLcb-bJyS3i_bwZlJrbtxyvONegIxNnETExN4gqFboL72O1D1vprxu6LfD2mSKpBVLn33z6d8HXvX4qSFAj1zyYHBe6FCTPqWCNcnX-BLK2qYW8FWLAbFzZ7eLgWSkTm0G84GZqbMZnESTcIct3EplMEpbSPVvp-pzQIXv0OCyh7ZJ8yv8OJszLUVdNCceHXei526huSrZtlI')",
                      }}
                    ></div>
                    <span className="text-sm font-medium">David Miller</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">Austin, TX</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 uppercase">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 22, 2023</td>
                <td className="px-6 py-4">
                  <button className="text-accent hover:text-primary text-xs font-bold">
                    Review Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Overview;
