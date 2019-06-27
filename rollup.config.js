
import cleanup from 'rollup-plugin-cleanup'
import license from 'rollup-plugin-license'

export default {
  input: './packages/core/index.js',
  output: {
    file:  './dist/fard.js',
    format: 'cjs',
    name: 'fard'
  },
  plugins: [
    license({
      banner: `by 132yse Copyright ${JSON.stringify(new Date()).replace(
        /T.*|"/g,
        ''
      )}`
    }),
    cleanup()
    // uglify()
  ]
}
