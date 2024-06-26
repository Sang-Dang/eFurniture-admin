import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { tabKeys } from '@/routes/Categories/CategoryList/util/tabItems'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type CategoryListSearch = {
    tab?: tabKeys
    size?: number
    page?: number
}

export const CategoryListRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.ADMIN, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: CategoryListSearch): CategoryListSearch => {
        return {
            tab: search.tab || 'all',
            size: Number(search.size) || 8,
            page: Number(search.page) || 1,
        }
    },
})
