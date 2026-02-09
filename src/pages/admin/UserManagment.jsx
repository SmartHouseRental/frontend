import { ChevronLeft } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ListFilter } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Search } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';

function UserManagment() {
  return (
    <div className="bg-background-light dark:bg-background-dark relative flex min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 p-8 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            User List Management
          </h2>
          <p className="text-sm text-slate-500">Monitor and manage platform participants</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800">
            <span className="text-sm font-bold">
              <Plus />
            </span>
            Add New User
          </button>
          <div className="mx-2 h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>

      <div className="flex h-20 shrink-0 items-center justify-between p-8">
        <div className="relative max-w-xl flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <Search />
          </span>
          <input
            className="focus:ring-primary focus:border-primary w-full rounded-lg border-slate-300 py-2 pr-4 pl-10 text-sm focus:ring-1 dark:border-slate-700"
            placeholder="Search users by name, email, or ID..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hover:border-primary/50 flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition-all dark:border-slate-700 dark:bg-slate-800">
            <span className="mr-2 text-xs font-medium tracking-wider text-slate-500 uppercase">
              Role:
            </span>
            <span className="text-sm font-semibold">All Roles</span>
            <span className="ml-2 text-slate-400">
              <ChevronDown />
            </span>
          </div>
          <div className="hover:border-primary/50 flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition-all dark:border-slate-700 dark:bg-slate-800">
            <span className="mr-2 text-xs font-medium tracking-wider text-slate-500 uppercase">
              Status:
            </span>
            <span className="text-sm font-semibold">All Statuses</span>
            <span className="ml-2 text-slate-400">
              <ChevronDown />
            </span>
          </div>
          <button className="rounded-lg border border-slate-200 p-2 transition-all hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800">
            <span className="text-slate-500">
              <ListFilter />
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 pb-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-full border-collapse text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Avatar
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Name / Email
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Role
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Verification Status
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Join Date
                </th>
                <th className="border-b border-slate-100 px-6 py-4 text-right text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of male renter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTZuFjiXv8pJ9ZW_P3PhEq0jTFLgivzMJvuk9tLjNwAtXcpCfbBzCklALgf9dvExExfQ0kpVwDJSk7M7QURBzmIsk8KAiVUwpuZhvUZ-dOaS71NBKFvqqMMlNaKdclvhKRaI9onx9CN6bvR-dNk3P9DOsAJ-uepazHnRuxkJayU0LLsVECrIdI_cfvXwgnQxWP4XXj3Ys_fYGDtO_bC0FpaYyKaIEKIdcDGe8gwgK3vKrScOaB0JHepPS768X7w1PMIXkGqaQhP3PR')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Johnathan Doe</p>
                  <p className="text-xs text-slate-500">j.doe@example.com</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Renter
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />{' '}
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of female owner"
                    style={{
                      backgroundImage:
                        " url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5LgaC18-_jQCOsbMsSMQuY_SDhlZ4it38RHbLsDlUbKYAwZux_CQ_VlfKMAb5Iz3Dt9q37zUXGKZYTV69cSTSmVuW04QwSbo4Hpbm0VIf5FbKy5EoukBuf6h9tLNHRU81QgRsXfhvM6CW9HlrkH2d4HE9tJltciMDOgOrwIJ_-W-tsg6jlprdSaKiqF3zvEoOKlFUOMdOCKgnB59fGlteW55iUFnCdTverhCzToXW9K7dXWDV9zyQCFQG1xCRymhvBxLXS1ps8Osw')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Sarah Smith</p>
                  <p className="text-xs text-slate-500">sarah.s@ownerlink.net</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Owner
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <span className="size-1.5 rounded-full bg-amber-500"></span> Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 22, 2023</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />{' '}
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of male user"
                    style={{
                      backgroundImage:
                        " url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNmlwqOScOuHrSfkUbfel7bx5mWyoPQWyOTkXGUV-GAMcB4gosZCzDPlezTnlrj8HJz1NtGZiktJk2leBxpxlCXZZmvO6DCspBE4reI-Ewzgnxkj9CQ70rybwKcEy2DQqZ2eVXaiyt3eATJU4WkwVcRwFFvCVyvNZDjMns1hjl95rx-WtlJSRzBxA1KXt9bo7-nVB5Lrk9uB6NA5UxMCrIfmb4BI4axavnFUM6R8GS1BphoiYNfK26qwmeutOvG9KnkyuNpYEgu5YS')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Michael Johnson
                  </p>
                  <p className="text-xs text-slate-500">mike_j@gmail.com</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Oct 20, 2023</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />{' '}
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <input
                    className="text-primary focus:ring-primary rounded border-slate-300"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div
                    className="size-10 rounded-lg bg-cover bg-center"
                    data-alt="Avatar of female user"
                    style={{
                      backgroundImage:
                        " url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSuZ6-LwmWPYqP8PLV3kKVI2wlYbearlFUEa4ONPuomUoYFHdwxYVTrI6Q8hQOjQ5iOYqrJrz_CeslRdNuj8KXbpa_WklddW2-SPzi7LPZ5MRlBLebryplOButwGc1btAvbYBd3CUk1U0FkRKhpHhk3WPEs8sAtqtndVqOULakS9iCZ5tGhhdbLTrS4Qxq0Ouyik3DWyKK2XEfZGETb8HI2QPBI1F5iD_TYR3zT83YbtCcQDH42dAiG3puOsnUVXoAyR6VqIPzMd38')",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Elena Rodriguez
                  </p>
                  <p className="text-xs text-slate-500">e.rodriguez@outlook.com</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Renter
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    <span className="size-1.5 rounded-full bg-red-500"></span> Blocked
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">Sept 15, 2023</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900 dark:text-white">1 - 4</span> of{' '}
              <span className="font-bold text-slate-900 dark:text-white">1,248</span> users
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined">
                  <ChevronLeft />
                </span>
              </button>
              <button className="bg-primary size-8 rounded-lg text-xs font-bold text-white">
                1
              </button>
              <button className="size-8 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800">
                2
              </button>
              <button className="size-8 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800">
                3
              </button>
              <span className="mx-1 text-slate-400">...</span>
              <button className="size-8 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800">
                125
              </button>
              <button className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900">
                <ChevronRight />{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagment;
