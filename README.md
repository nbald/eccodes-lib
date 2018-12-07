

# eccodes-lib

eCodes shared library
For use as a dependency for others `eccodes-*` tools
*(packaged for Ubuntu 18.04 only)*

### Usage

#### Install ecCodes-lib
`npm install --save eccodes-lib`

#### Install definitions
It is necessary to install the definitions for the file formats you need
`npm install --save eccodes-data-grib1`
`npm install --save eccodes-data-grib2`
`npm install --save eccodes-data-bufr`

#### Get the environment ready
```javascript
const EcLib = require('eccodes-lib')
const grib1Data = require('eccodes-data-grib1')
const grib2Data = require('eccodes-data-grib2')

const ecLib = new EcLib()

const demo = async () => {
  /*
   * (optional)
   * This will create a temporary directory in os.tmpdir()
   * containing the required definitions files
   */
  await ecLib.load([
    grib1Data,
    grib2Data
  ])

  /*
   * It is then possible to retrieve the adequate
   * environment variables for using the library:
   *  {
   *    LD_LIBRARY_PATH: '[..]/eccodes-lib/lib',
   *    ECCODES_DEFINITION_PATH: '/tmp/eccodes-lib-[..]',
   *    ECCODES_SAMPLES_PATH: '[..]/eccodes-lib/share/samples'
   *  }
   */
  const env = ecLib.getEnv()
  console.log(env)

  /*
   * (optional) When finished, manually delete the
   * temporary definitions folder created by load().
   * Or then the temporary folder will automatically
   * be deleted on process exit or crash.
   */
  ecLib.cleanup()
}

demo()
```

#### Using multiple instances
```javascript
const EcLib = require('eccodes-lib')
const stockGrib1 = require('eccodes-data-grib1')
const customGrib1 = require('./eccodes-data-grib1-customized')

libA = new EcLib()
libA.load([stockData])
    .then(() => console.log(libA.getEnv()))

libB = new EcLib()
libB.load([customData])
    .then(() => console.log(libB.getEnv()))
```

### ecCodes Version
This package embeds ecCodes 2.10.0
