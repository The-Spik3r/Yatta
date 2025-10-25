import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            retry: (failureCount, error: any) => {
                if (error?.status >= 400 && error?.status < 500) {
                    if (error?.status === 408 || error?.status === 429) {
                        return failureCount < 2
                    }
                    return false
                }
                return failureCount < 3
            },
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
})

interface QueryProviderProps {
    children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    )
}

export { queryClient }