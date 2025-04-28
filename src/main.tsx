import { Provider } from '@/components/ui/provider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import '@/styles/index.scss'
import App from './App.tsx'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <Provider>
                <App />
            </Provider>
        </ReduxProvider>
    </StrictMode>
)
