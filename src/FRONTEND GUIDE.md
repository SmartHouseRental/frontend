## 🧩 Frontend Architecture & State Management Rules (Best Practices)

### 1. Page Layer (Separation of Concerns)
- Components inside `pages/` **must remain stateless and UI-only**.
- Only handle layout and composition.
- Delegate all logic to feature hooks and components.
- ❌ No state, forms, API calls, or business logic in `pages/`.

---

### 2. Component Organization
- **`features/{feature}/components/`** → Stateful, logic-heavy, or feature-specific components (forms, tables, cards with logic, etc.)
- **`components/`** (root) → Stateless, reusable, presentational UI components only.

**Rule**: Any component using hooks, state, or forms **must** live in `features/{feature}/components/`.

---

### 3. Form Handling
- Use **React Hook Form** + **Zod** for **all** forms.
- Always use `zodResolver`.
- Prefer Shadcn/ui form components.

---

### 4. UI Library
- Use **Shadcn/ui** + **Tailwind CSS** for all interfaces.
- Extend Shadcn components when needed inside feature folders.

---

### 5. State Management
- **TanStack Query** → Only tool for **server state** (fetching, caching, mutations).
- **React Hook Form** → Only for **form state**.
- Avoid `useState` + `useEffect` for server data.

---

### 6. Custom Hooks & API Layer
- All TanStack Query logic → `features/{feature}/hooks/`
- All API calls → `features/{feature}/api.js`

---

### 7. Mutations Best Practices
```js
// features/users/hooks/useCreateUser.js
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    }
  });
};
```

**Rules**:
- Always invalidate relevant queries after mutations
- Show success/error toasts
- Use optimistic updates when it makes sense

---

### 8. Query Key Best Practices
Use a **query key factory** in each feature:

```js
// features/users/constants.js
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), filters],
  details: (id) => [...userKeys.all, 'detail', id],
};
```

Then use it in hooks:
```js
useQuery({
  queryKey: userKeys.list(filters),
  queryFn: () => userApi.getUsers(filters),
});
```

---

### 9. Error Handling & Notifications
- Use **react-hot-toast** or **Sonner** for notifications.
- Create a global error handler.
- Handle errors gracefully in hooks and show user-friendly messages.

---

### 10. Loading & Empty States
- Always handle `isLoading`, `isError`, and empty data states.
- Create reusable `Loader`, `EmptyState`, and `ErrorState` components in root `components/`.

---

### 11. Recommended Feature Folder Structure

```bash
features/
  users/
    api.js
    constants.js
    hooks/
      useUsers.js
      useUser.js
      useCreateUser.js
      useUpdateUser.js
    components/
      UserList.js
      UserForm.js
      UserProfileCard.js
    utils.js
```

---

### 12. Naming Conventions
- Files: `useCreateUser.js`, `UserForm.js`, `userApi.js`
- Components: PascalCase (`UserProfileCard`)
- Hooks: `use` prefix
- Functions: camelCase

---

### 13. Anti-Patterns (Strictly Forbidden ❌)
- Using `useState` for forms or server data
- Fetching data in `pages/` or layout components (use feature hooks in route-mounted feature components — see **§18–20**)
- Eager-importing pages in `App.jsx` or firing page APIs from layouts
- Putting logic/state in root `components/`
- Inconsistent query keys
- Direct API calls outside `api.js`

---

### 14. Authentication & Protected Routes

Use a custom `useAuth` hook + TanStack Query for user session.
Create `ProtectedRoute` or `AuthGuard` component.
Store auth tokens securely (httpOnly cookies preferred when possible).

### 15. Performance & Optimization (Overview)

Goals for every new route or feature:

1. **Only the active route’s JS bundle loads** on first paint and on navigation.
2. **Only the active page triggers its API calls** — no prefetching other pages from layouts or `App.jsx`.
3. **TanStack Query** caches and dedupes; use `staleTime`, `gcTime`, and `enabled` so revisits stay fast without duplicate network traffic.

Detailed rules: **§18 Routing**, **§19 Layout vs page data**, **§20 On-demand server state**.

Use `React.memo`, `useMemo`, and `useCallback` only when profiling shows a real win.

---

### 16. Type of State

| Type of State               | Recommended Tool        | Priority | Notes |
|-----------------------------|-------------------------|----------|-------|
| Server / Remote Data        | TanStack Query          | #1       | Always |
| Form State                  | React Hook Form         | #1       | Always |
| Simple component-local state| useState / useReducer   | #1       | Default choice |
| Shared UI State             | Zustand                 | Recommended | Best balance |
| Shared UI State (Simple cases) | React Context | Acceptable | Use sparingly |
| Very Complex Global Logic   | Zustand (with middleware) | Preferred | — |

### 17. Recommended Tech Stack

| Purpose              | Technology                  |
|----------------------|-----------------------------|
| Server State         | TanStack Query              |
| Forms                | React Hook Form + Zod       |
| UI                   | Shadcn/ui + Tailwind        |
| Notifications        | Sonner / react-hot-toast    |
| HTTP Client          | Axios                       |

---

### 18. Route-Based Code Splitting (Mandatory)

All **page** components must be lazy-loaded. Never import pages directly in `App.jsx`.

#### File layout

| File | Role |
|------|------|
| `src/routes/lazyPages.js` | Single registry: every page exported as `lazy(() => import('…'))` |
| `src/App.jsx` | Routes only; imports pages from `lazyPages.js` |
| `src/components/PageLoader.jsx` | Shared `Suspense` fallback |

#### Register a new page

```js
// src/routes/lazyPages.js
export const MyNewPage = lazy(() => import('@/pages/owner/MyNewPage'));
```

```jsx
// src/App.jsx — wrap every lazy page in LazyRoute
function LazyRoute({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

<Route
  path="my-route"
  element={
    <LazyRoute>
      <MyNewPage />
    </LazyRoute>
  }
/>
```

#### Layout routes (no eager pages)

Layouts are **shells only**: sidebar, header, `<Outlet />`. They must **not** import or render page components.

```jsx
// OwnerLayout, MainLayout, AdminLayout
<main>
  <Outlet />  {/* child route renders here — one page at a time */}
</main>
```

**Rules**

- ✅ Nested routes: parent `element={<OwnerLayout />}`, children define `path` + lazy page.
- ✅ `index` + `<Navigate replace to="overview" />` for default child paths.
- ❌ Eager `import X from '@/pages/…'` in `App.jsx` or layouts.
- ❌ Rendering multiple page components outside `<Routes>` / `<Outlet>`.
- ❌ Putting `Suspense` only around the whole app without per-route boundaries (per-route `LazyRoute` is required).

#### Verify in DevTools

1. Hard refresh on `/owner/overview`.
2. **Network**: only requests for that page (e.g. `GET /owner/overview`), not properties/appointments/etc.
3. **Sources / Network**: other page chunks (e.g. `MyPropertiesPage-*.js`) should load only after navigating there.

---

### 19. Layout vs Page Data Fetching

| Layer | May fetch | Must not fetch |
|-------|-----------|----------------|
| `App.jsx`, `main.jsx` | — | Page-specific APIs |
| `*Layout.jsx` (Owner, Admin, Main) | — | Page-specific APIs |
| `pages/*` | — (UI-only shell) | APIs (delegate to features) |
| `features/*/components/*` | Data for **that** screen | Data for **other** routes |

**Global / session data only at the top** (when introduced): authenticated user, theme, locale — via auth context or a single `useAuth` / profile query used app-wide, not per-page dashboards.

#### Owner area (reference implementation)

| Route | Where data loads | Endpoint / hooks |
|-------|------------------|------------------|
| `/owner/overview` | `OwnerOverviewContent` | `useOwnerOverview` → `GET /owner/overview` |
| `/owner/properties` | `MyPropertiesPage` → feature hooks | `useMyProperties`, `useOwnerVerificationState` |
| `/owner/add-property` | `AddPropertyPage` | `useOwnerVerificationState` + `PropertyForm` mutations |
| `/owner/profile` | `ProfilePage` / profile feature | `useProfile`, `useDocuments` |

`OwnerLayout` has **zero** TanStack Query hooks — verification was removed from the layout intentionally.

#### Verification UI without layout fetches

- **Overview**: banner state from **overview payload** (`verificationStateFromOverview`) — no extra profile/documents calls.
- **Other owner pages** (properties, add property): `useOwnerVerificationState` in the **page** (or its feature content), plus `<VerificationBanner />`.
- **Do not** reintroduce `useProfile` + `useDocuments` in `OwnerLayout`.

After visiting overview, overview hydrates the profile query cache so `/owner/profile` may not refetch immediately:

```js
// OwnerOverviewContent — setQueryData when overview.profile exists
queryClient.setQueryData(profileKeys.details(), { status: 'success', data: { ...overview.profile, verification } });
```

---

### 20. On-Demand Server State (TanStack Query)

#### Principles

1. **One hook per resource** in `features/{feature}/hooks/`.
2. **Call hooks only from** the feature component (or page shell that mounts that component) for the **current route**.
3. Prefer **`enabled`** over mounting hooks in parents that render before the user needs data.
4. Set **`staleTime` / `gcTime`** per feature in `constants.js` (see `ownerQueryDefaults`).
5. Use **`refetchOnMount: false`** for heavy dashboards when cache is fresh.

#### Query defaults (owner example)

```js
// features/owner/constants.js
export const ownerQueryDefaults = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
};

export const ownerKeys = {
  all: ['owner'],
  overview: (range = 'monthly') => [...ownerKeys.all, 'overview', range],
};
```

```js
// features/owner/hooks/useOwnerOverview.js — only from Overview content
export const useOwnerOverview = (range = 'monthly', options = {}) => {
  return useQuery({
    queryKey: ownerKeys.overview(range),
    queryFn: () => ownerApi.getOverview({ range }),
    staleTime: ownerQueryDefaults.staleTime,
    gcTime: ownerQueryDefaults.gcTime,
    refetchOnMount: false,
    ...options,
  });
};
```

#### Page pattern (thin page + fat feature component)

```jsx
// pages/owner/OverviewPage.jsx — no hooks
import { OwnerOverviewContent } from '@/features/owner/components/OwnerOverviewContent';

function OverviewPage() {
  return <OwnerOverviewContent />;
}
```

```jsx
// features/owner/components/OwnerOverviewContent.jsx — all overview logic + useOwnerOverview
```

#### Shared verification state (non-overview owner pages)

```js
// features/owner/hooks/useOwnerVerificationState.js
// useProfile + useDocuments — only when a page that needs verification mounts
export function useOwnerVerificationState() { /* … */ }
```

Use **once per page** and pass `verificationState` to `<VerificationBanner />`. Do not mount `OwnerVerificationBannerBar` and the same hook twice on one page (duplicate hook work; Query dedupes network but wastes renders).

#### Anti-patterns (routing + state)

| ❌ Don't | ✅ Do |
|----------|--------|
| Import all pages in `App.jsx` | Register in `lazyPages.js` + `LazyRoute` |
| `useMyProperties()` in `OwnerLayout` | `useMyProperties()` in properties page/content |
| Fallback client that fires 5 APIs when overview 404s | Fix backend route; single `getOverview` |
| `useEffect` + `fetch` for server data | TanStack Query in feature hooks |
| `enabled: true` on every layout hook | `enabled` only where data is required |

#### Optional: prefetch on intent

Prefetch query data or lazy chunks **only** on hover/focus of nav links if needed — never on app boot for all routes.

```js
// Example: prefetch overview when user hovers sidebar link
queryClient.prefetchQuery({
  queryKey: ownerKeys.overview('monthly'),
  queryFn: () => ownerApi.getOverview({ range: 'monthly' }),
});
```

---

### Appendix: Sample property API response

```json
{
    "message": "Property fetched successfully",
    "data": {
        "id": "cmpdujjh3000ee701ibmqieb1",
        "type": {
            "en": "Apartment",
            "am": "አፓርታማ"
        },
        "location": {
          "lat": 9.0366,
          "lan": 38.7323
        },
        "bedrooms": 2,
        "type": "VILLA",
        "furnishingStatus": "FURNISHED",
        "bathrooms": 2,
        "amenities": ["BALCONY", "GYM", "POOL"],
        "title": {
            "am": "New Luxury",
            "en": "New Luxury"
        },
        "description": {
            "am": "nothing to write ",
            "en": "nothing to write "
        },
        "address": {
            "en": "Ummar Semetar Street, Biss Meberat, Giorgis, Addis Ababa, Arada, Addis Ababa, 3658, Ethiopia",
            "am": "Ummar Semetar Street, Biss Meberat, Giorgis, Addis Ababa, Arada, Addis Ababa, 3658, Ethiopia"
        },
        "price": {
            "value": 4000,
            "currency": "USD"
        },
        "area": {
            "value": null,
            "unit": "sqm"
        },

        "viewCount": 12,
        "leaseTerms": {
            "secureDeposit": {
           
                    "value": 600,
                    "currency": "ETB"
                
            },
            "conditions": {
                "en": "nothing to write ",
                "am": "nothing to write "
            }
        },
        "images": [
            "https://res.cloudinary.com/dbwxpsplw/image/upload/v1779268528/properties/images/ecofu94mcat9x2xjo2j4.png"
        ],
        "video": "",
        "availableFrom": "2026-05-20",
        "status": "AVAILABLE",
        "isVerified": true,
        "owner": {
            "id": "cmp9kporz0004gl012r9itecz",
            "first_name": "Olman",
            "last_name": "Gemechu",
            "email": "olman4jesus@gmail.com"
        },
        "createdAt": "2026-05-20T09:15:28.983Z"
    }
}
```