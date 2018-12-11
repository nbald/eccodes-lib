const os = require('os')
const uuidv1 = require('uuid/v1')
const fs = require('fs-extra')

class EcCodesLib {
  constructor() {
    this.definitionsPath = null
  }

  async _createDefinitionsDir() {
    const original = `${__dirname}/share/definitions`
    const tmp = `${os.tmpdir()}/eccodes-lib-${uuidv1()}`
    await fs.copy(original, tmp, { overwrite: true })
    this.definitionsPath = tmp
    process.on('exit', () => fs.removeSync(tmp))
    process.on('uncaughtException', (e) => {
      fs.removeSync(tmp)
      throw e
    })
  }

  async load (datas) {
    if (this.definitionsPath === null) await this._createDefinitionsDir()
    Promise.all(datas.map(data => {
      const target = `${this.definitionsPath}/${data.target}`
      return fs.ensureSymlink(data.path, target)
    }))
  }

  async cleanup() {
    if (this.definitionsPath === null) return
    await fs.remove(dir)
    this.definitionsPath = null
  }

  getEnv() {
    return {
      LD_LIBRARY_PATH: `${__dirname}/lib`,
      ECCODES_DEFINITION_PATH: this.definitionsPath || `${__dirname}/share/definitions`,
      ECCODES_SAMPLES_PATH: `${__dirname}/share/samples`
    }
  }
}
module.exports = EcCodesLib
