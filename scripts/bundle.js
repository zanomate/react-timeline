const shell = require('shelljs')
const dtsBundle = require('dts-bundle')
const esbuild = require('esbuild')

const LIB_NAME = 'react-library-template'

// clear
shell.rm('-rf', 'dist')

// declarations
shell.exec('tsc --declaration --emitDeclarationOnly --declarationDir dist/types')
dtsBundle.bundle({
  name: LIB_NAME,
  main: 'dist/types/index.d.ts',
  baseDir: 'dist',
  out: 'index.d.ts',
  outputAsModuleFolder: true,
})
shell.rm('-rf', 'dist/types')

// code
esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: `dist/index.js`,
  external: [
    'react',
  ],
})
