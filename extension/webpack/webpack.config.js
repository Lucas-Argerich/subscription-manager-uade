import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, '..', 'src', 'background.ts')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }]
    })
  ]
}
