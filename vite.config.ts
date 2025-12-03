import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    base: '/hs-kobo',
    server: {
        port: 3000,
    },
    plugins: [react(), tsconfigPaths(), svgr()],
    build: {
        terserOptions: {
            format: {
                comments: false,
            },
            compress: {
                drop_console: true,
                pure_funcs: ['console.log']
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'react': ['react', 'react-dom', 'react-redux', 'react-router', 'react-icons', '@reduxjs/toolkit'],
                    'utils': ['dayjs', 'lodash-es', 'sql.js', 'jspdf'],
                    'chakra-ui': ['@chakra-ui/react', '@chakra-ui/charts', 'next-themes', '@emotion/react'],
                    'recharts': ['recharts'],
                    'fullcalendar': ['@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/multimonth', '@fullcalendar/react'],
                },
                generatedCode: 'es2015',
            },
        },
    }
})
