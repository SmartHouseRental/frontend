## 🧩 Frontend Architecture & State Management Rules

### 1. Page Layer (Separation of Concerns)

* Components inside the `pages/` directory **must remain stateless**.
* They should:

  * Only handle layout and composition
  * Delegate logic to feature-level hooks
* ❌ No state management, API calls, or business logic inside `pages/`

---

### 2. Centralized State Management

* Use **TanStack Query** as the **only state management solution**
* Responsibilities of TanStack Query:

  * Server state fetching
  * Caching
  * Synchronization
  * Background updates

---

### 3. Custom Hooks Structure

* All TanStack Query logic must be wrapped inside **custom hooks**
* Hooks must live inside the corresponding feature directory:

```
features/
  users/
    hooks/
      useUser.js
      useUsers.js
```

* Naming convention:

  * `useUser` → fetch single user
  * `useUsers` → fetch multiple users

* These hooks:

  * Call API functions
  * Handle query keys
  * Manage caching behavior
  * Return clean, reusable data + states (`isLoading`, `error`, etc.)

---

### 4. API Layer Structure

* All API calls must be isolated in a dedicated file:

```
features/
  users/
    api.js
```

* Rules:

  * Only pure API request functions
  * No React, no hooks, no UI logic
  * Keep functions reusable and clean

Example:

```js
export const getUsers = async () => {
  const res = await fetch('/api/users');
  return res.json();
};
```

---

### 5. Flow Architecture (Strict Pattern)

```
pages/  →  features/hooks/  →  features/api.js
(UI)        (state logic)       (API calls)
```

* Pages call hooks
* Hooks call API functions
* API functions call backend

---

### 6. Scalability Rules

* Each feature must be self-contained:

```
features/
  feature-name/
    api.js
    hooks/
    components/   (optional)
    utils/        (optional)
```

* Avoid cross-feature dependencies unless absolutely necessary

---

### 7. Anti-Patterns (Do NOT do this ❌)

* Fetching data directly inside components in `pages/`
* Using `useState` or `useEffect` for server data
* Mixing API logic inside hooks or components
* Calling APIs outside `api.js`

