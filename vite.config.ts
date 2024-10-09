import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        plugins: ['@babel/plugin-transform-runtime'],
        presets: [['@babel/preset-react', { runtime: 'automatic' }]]
      }
    }),
    react()
  ],
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@examples': path.resolve(__dirname, 'src/examples'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@firebase': path.resolve(__dirname, 'src/firebase')
    }
  }
})
