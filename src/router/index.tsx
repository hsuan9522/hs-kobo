import { LuCalendarDays, LuNotebook, LuHouse } from 'react-icons/lu'
import { createBrowserRouter } from 'react-router'
import BaseLayout from '@/layout/base'
import Calendar from '@/pages/calendar'
import Home from '@/pages/home'
import Notes from '@/pages/notes'
import Error from '@/pages/404'
import Note from '@/pages/note'

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

const router = createBrowserRouter([
    {
        path: '/',
        Component: BaseLayout,
        children: routerInfo.map((item) => {
            if (item.children) {
                return {
                    path: item.path,
                    children: item.children.map((child) => ({
                        index: child.index,
                        path: child.path,
                        Component: child.element,
                    })),
                }
            } else {
                return {
                    path: item.path,
                    Component: item.element,
                }
            }
        }),
    },
    {
        path: '*',
        Component: Error,
    },
])

export default router
