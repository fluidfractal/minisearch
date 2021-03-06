import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config = ({ format, output, name, dir }) => ({
  input: 'src/index.js',
  output: {
    sourcemap: true,
    dir: `dist/${dir || format}`,
    format,
    name,
    entryFileNames: process.env.MINIFY === 'true' ? '[name].min.js' : '[name].js',
    plugins: process.env.MINIFY === 'true'
      ? [terser({
        mangle: {
          properties: {
            regex: /^_/
          }
        }
      })]
      : []
  },
  plugins: [
    babel({
      rootMode: 'upward',
      caller: {
        output
      }
    })
  ]
})

export default [
  config({ format: 'es', output: 'es6' }),
  config({ format: 'es', output: 'es5m', dir: 'es5m' }),
  config({ format: 'umd', output: 'es5m', name: 'MiniSearch' })
]
