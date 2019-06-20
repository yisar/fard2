class FardWebpackPlugin {
  constructor ({ filename = 'base.wxml', nestedlevel = 5 }) {
    this.filename = filename
    this.nestedlevel = nestedlevel
  }
  apply (compiler) {
    compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
      compilation.assets[this.filename] = {
        source: () => 'hello world',
        size: () => 1
      }
      cb()
    })
  }
}

module.exports = FardWebpackPlugin
