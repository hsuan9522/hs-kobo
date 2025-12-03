import { Suspense } from 'react'
import PageLoader from './pageLoader'

const SuspenseWrapper = ({ Component }: { Component: React.LazyExoticComponent<any> }) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
)

export default SuspenseWrapper
