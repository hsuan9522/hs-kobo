import { routerInfo } from '@/router'
import { useLocation } from 'react-router'

export function useRoute() {
    const location = useLocation()
    const pathName = location.pathname

    const currentRoute = routerInfo.find((item) => {
        return `/${item.path}` === pathName
    })
    const restRoutes = routerInfo.filter((item) => `/${item.path}` !== pathName)

    return {
        currentRoute,
        restRoutes,
    }
}
