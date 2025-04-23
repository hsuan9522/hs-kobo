import { LuCalendarDays, LuNotebook, LuHouse } from 'react-icons/lu'
import Calendar from '@/pages/calendar'
import Home from '@/pages/home'
import Notes from '@/pages/notes'
import { createBrowserRouter } from 'react-router'

export const routerInfo = [
    { label: 'Home', path: '/', icon: LuHouse, element: Home },
    { label: 'Calendar', path: '/calendar', icon: LuCalendarDays, element: Calendar },
    { label: 'Notes', path: '/notes', icon: LuNotebook, element: Notes },
]

const router = createBrowserRouter(
    routerInfo.map((item) => ({
        path: item.path,
        element: <item.element />,
    }))
)

export default router
