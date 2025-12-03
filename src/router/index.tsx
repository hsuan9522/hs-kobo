import { LuCalendarDays, LuNotebook, LuHouse } from 'react-icons/lu'
import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'
import BaseLayout from '@/layout/base'
import SuspenseWrapper from '@/components/suspenseWrapper'
import PageLoader from '@/components/pageLoader'

// const Home = lazy(() => import('@/pages/home'))
// const Calendar = lazy(() => import('@/pages/calendar'))
// const Notes = lazy(() => import('@/pages/notes'))
// const Note = lazy(() => import('@/pages/note'))
const Error = lazy(() => import('@/pages/404'))

const element = {
    home: lazy(() => import('@/pages/home')),
    calendar: lazy(() => import('@/pages/calendar')),
    notes: lazy(() => import('@/pages/notes')),
    note: lazy(() => import('@/pages/note')),
}

export const routerInfo = [
    { label: 'Home', path: '', icon: LuHouse, name: 'home' },
    { label: 'Calendar', path: 'calendar', icon: LuCalendarDays, name: 'calendar' },
    {
        label: 'Notes',
        path: 'notes',
        icon: LuNotebook,
        children: [
            {
                index: true,
                name: 'notes',
            },
            {
                path: ':bookId',
                name: 'note',
            },
        ],
    },
]

const router = createBrowserRouter(
    [
        {
            path: '',
            Component: BaseLayout,
            errorElement: (
                <Suspense fallback={<PageLoader />}>
                    <Error />
                </Suspense>
            ),
            children: routerInfo.map((item) => {
                if (item.children) {
                    return {
                        path: item.path,
                        children: item.children.map((child) => ({
                            index: child.index,
                            path: child.path,
                            element: (
                                <SuspenseWrapper
                                    Component={element[child.name as keyof typeof element]}
                                />
                            ),
                        })),
                    }
                } else {
                    return {
                        path: item.path,
                        element: (
                            <SuspenseWrapper
                                Component={element[item.name as keyof typeof element]}
                            />
                        ),
                    }
                }
            }),
        },
        {
            path: '*',
            element: (
                <Suspense fallback={<PageLoader />}>
                    <Error />
                </Suspense>
            ),
        },
    ],
    {
        basename: '/hs-kobo',
    }
)

export default router
