import { RouterProvider } from 'react-router'
import router from './router'
import { Toaster } from '@/components/ui/toaster'
import { Spinner } from '@/components/spinner'
import { useAppSelector } from './hooks/useRedux'
import { isLoading } from './store/loading.slice'

function App() {
    const loading = useAppSelector(isLoading)
    return (
        <>
            {loading && <Spinner />}
            <RouterProvider router={router} />
            <Toaster />
        </>
    )
}

export default App
