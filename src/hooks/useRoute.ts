import { routerInfo } from '@/router'
import { useLocation, useParams } from 'react-router'

export function useRoute() {
    const location = useLocation()
    const pathName = location.pathname

    const rootRoute = routerInfo.find((item) => {
        const rootName = pathName.split('/')[1]
        return `${item.path}` === rootName
    })

    const restRoutes = routerInfo.filter((item) => `/${item.path}` !== pathName)

    const routerParams = useParams()

    return {
        rootRoute,
        restRoutes,
        pathName,
        routerParams
    }
}
