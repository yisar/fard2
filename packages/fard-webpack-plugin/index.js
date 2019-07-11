const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const renderTemplate = (pathname, data = {}) => {
  const content = fs.readFileSync(path.resolve(__dirname, pathname)).toString();
  return ejs.render(content, data);
}


class FardWebpackPlugin {
  constructor (options = {}) {
    this.options = options;
  }

  apply (compiler) {
    const bridgeType = this.options.bridgeType || 'template';
    switch (bridgeType) {
      case 'component':{
        compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
          const bridgeJson = renderTemplate('./templates/component/block.json.ejs');
          const bridgeJs = renderTemplate('./templates/component/block.js.ejs');
          const bridgeWxml = renderTemplate('./templates/component/block.wxml.ejs');

          const wxml = renderTemplate('./templates/component/item.wxml.ejs');
          const json = renderTemplate('./templates/component/item.json.ejs');

          compilation.assets['block/block.wxml'] = {
            source: () => bridgeWxml,
            size: () => bridgeWxml.length
          }
          compilation.assets['block/block.json'] = {
            source: () => bridgeJson,
            size: () => bridgeJson.length
          }

          compilation.assets['block/block.js'] = {
            source: () => bridgeJs,
            size: () => bridgeJs.length
          }
          //批量生成 wxml和 json
          compilation.chunks.forEach((item) => {
            compilation.assets[`${item.name}.wxml`] = {
              source: () => wxml,
              size: () => wxml.length,
            }
            compilation.assets[`${item.name}.json`] = {
              source: () => json,
              size: () => json.length,
            }
          })
          cb()
        })
        break;
      }
      case 'template': {
        compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
          const bridgeWxml = renderTemplate('./templates/template/bridge.wxml.ejs', {
            maxDepth: this.options.maxDepth || 10,
          });
          const itemWxml = renderTemplate('./templates/template/item.wxml.ejs');
          // 生成 bridge.wxml
          compilation.assets['bridge.wxml'] = {
            source: () => bridgeWxml,
            size: () => bridgeWxml.length,
          }
          //生成普通的 wxml
          compilation.chunks.forEach((item) => {
            compilation.assets[`${item.name}.wxml`] = {
              source: () => itemWxml,
              size: () => itemWxml.length,
            };
          });
          cb()
        })
        break;
      }
      default:
        break;
    }
  }
}

module.exports = FardWebpackPlugin
