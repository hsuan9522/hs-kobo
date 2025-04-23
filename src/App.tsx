import { RouterProvider } from 'react-router'
import router from './router'

function App() {
    return (
        <>
            <div>
                <div className="text-red-400 p-5">test</div>
            </div>
            <RouterProvider router={router} />
        </>
    )
}

export default App
