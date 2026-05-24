import { lazy } from 'react';

/** Loaded only when user navigates to public, admin, or owner route groups. */
export const MainLayout = lazy(() => import('@/components/MainLayout'));
export const OwnerLayout = lazy(() => import('@/components/OwnerLayout'));
export const AdminLayout = lazy(() => import('@/components/AdminLayout'));
