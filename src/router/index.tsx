import { LuCalendarDays, LuNotebook, LuHouse } from 'react-icons/lu'
import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'
import BaseLayout from '@/layout/base'
import SuspenseWrapper from '@/components/suspenseWrapper'

const PageLoader = lazy(() => import('@/components/pageLoader'))
const Home = lazy(() => import('@/pages/home'))
const Calendar = lazy(() => import('@/pages/calendar'))
const Notes = lazy(() => import('@/pages/notes'))
const Note = lazy(() => import('@/pages/note'))
const Error = lazy(() => import('@/pages/404'))

export const routerInfo = [
    { label: 'Home', path: '', icon: LuHouse, element: Home },
    { label: 'Calendar', path: 'calendar', icon: LuCalendarDays, element: Calendar },
    {
        label: 'Notes',
        path: 'notes',
        icon: LuNotebook,
        children: [
            {
                index: true,
                element: Notes,
            },
            {
                path: ':bookId',
                element: Note,
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
                            element: <SuspenseWrapper Component={child.element} />,
                        })),
                    }
                } else {
                    return {
                        path: item.path,
                        element: <SuspenseWrapper Component={item.element} />,
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
    { basename: '/hs-kobo' }
)

export default router
