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
- Fetching data directly in components or pages
- Putting logic/state in root `components/`
- Inconsistent query keys
- Direct API calls outside `api.js`

---

### 14. Authentication & Protected Routes

Use a custom `useAuth` hook + TanStack Query for user session.
Create `ProtectedRoute` or `AuthGuard` component.
Store auth tokens securely (httpOnly cookies preferred when possible).

### 15. Performance & Optimization Rules

Use `React.memo`, `useMemo`, and `useCallback` only when necessary.
Implement code splitting with `React.lazy` and `Suspense`.
Optimize TanStack Query with proper `staleTime` and `gcTime`.
Avoid unnecessary re-renders.

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