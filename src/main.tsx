import { configAxios } from '@/api/defaults'
import env from '@/env'
import { queryClient, router } from '@/router'
import '@/styles/index.css'
import '@/styles/reset.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

// load ENV file to memory
env.load()
configAxios()

// global declarations
declare global {
    function devLog(...msg: string[]): void
}

const _global = (window /* browser */ || global) /* node */ as any
_global.devLog = function (...msg: string[]) {
    if (process.env.NODE_ENV === 'development') {
        console.log('🧑‍💻 DEV MODE: ', ...msg)
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)

