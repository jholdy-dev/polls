import { TypeScriptAppProject } from 'projen/lib/typescript'
import { Base } from './base'
import { SampleFile } from 'projen'

type DescktopProps = {
  parent: TypeScriptAppProject
}

export class Descktop extends Base {
  constructor(props: DescktopProps) {
    super({
      ...props,
      name: '@project/descktop',
      outdir: 'descktop',
      defaultReleaseBranch: 'main',
      release: false,
      projenrcTs: true,
      testdir: 'src',
    })

    this.removeTask('build')
    this.removeTask('lint')
    this.removeTask('preview')
    this.gitignore.include('**release**')
    this.gitignore.include('**dist-electron**')

    this.package.file.addOverride('main', 'dist-electron/main.js')

    this.addScripts({
      dev: 'vite',
      build: 'tsc && vite build && electron-builder',
      lint: 'eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      preview: 'vite preview',
    })

    this.addDeps('react', 'react-dom', '@lib/schema@workspace:*')

    this.addDevDeps(
      '@types/react',
      '@types/react-dom',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      '@vitejs/plugin-react',
      'eslint',
      'eslint-plugin-react-hooks',
      'eslint-plugin-react-refresh',
      'typescript',
      'vite',
      'electron',
      'electron-builder',
      'vite-plugin-electron',
      'vite-plugin-electron-renderer',
    )

    for (const electron_file of [
      'electron-env.d.ts',
      'preload.ts',
      'main.ts',
    ]) {
      const sourcePath =
        this.outdir +
        '/../../projenrc/libs/electron-files/electron/' +
        electron_file
      new SampleFile(this, `electron/${electron_file}`, {
        sourcePath,
      })
    }

    for (const electron_file of [
      'vite.svg',
      'electron-vite.svg',
      'electron-vite.animate.svg',
    ]) {
      const sourcePath =
        this.outdir +
        '/../../projenrc/libs/electron-files/public/' +
        electron_file
      new SampleFile(this, `public/${electron_file}`, {
        sourcePath,
      })
    }

    this.removeFile(this.outdir + '/src/index.ts')

    new SampleFile(this, 'src/App.tsx', {
      contents: [
        "import React from 'react'",
        '',
        'function App() {',
        '  return (',
        '    <>',
        '      <div>',
        '        <h1>Electron + Vite</h1>',
        '      </div>',
        '    </>',
        '  )',
        '}',
        '',
        'export default App',
      ].join('\n'),
    })

    new SampleFile(this, 'src/main.tsx', {
      contents: [
        "import React from 'react'",
        "import ReactDOM from 'react-dom/client'",
        "import App from './App.tsx'",
        '',
        "ReactDOM.createRoot(document.getElementById('root')!).render(",
        '  <React.StrictMode>',
        '    <App />',
        '  </React.StrictMode>',
        ')',
        '',
        "postMessage({ payload: 'removeLoading' }, '*')",
        '',
        "window.ipcRenderer.on('main-process-message', (_event, message) => {",
        '  console.log(message)',
        '})',
      ].join('\n'),
    })

    new SampleFile(this, 'src/vite-env.d.ts', {
      contents: '/// <reference types="vite/client" />',
    })

    new SampleFile(this, '.eslintrc.cjs', {
      contents: [
        'module.exports = {',
        '  root: true,',
        '  env: { browser: true, es2020: true },',
        '  extends: [',
        "    'eslint:recommended',",
        "    'plugin:@typescript-eslint/recommended',",
        "    'plugin:react-hooks/recommended',",
        '  ],',
        "  ignorePatterns: ['dist', '.eslintrc.cjs'],",
        "  parser: '@typescript-eslint/parser',",
        "  plugins: ['react-refresh'],",
        '  rules: {',
        "    'react-refresh/only-export-components': [",
        "      'warn',",
        '      { allowConstantExport: true },',
        '    ],',
        '  },',
        '}',
      ].join('\n'),
    })

    new SampleFile(this, 'electron-builder.json5', {
      contents: [
        '{',
        '  "appId": "com.example.app",',
        '  "productName": "ExampleApp",',
        '  "directories": {',
        '    "output": "release/${version}"',
        '  },',
        '  "files": [',
        '    "dist",',
        '    "dist-electron"',
        '  ],',
        '  "mac": {',
        '    "target": [',
        '      "dmg"',
        '    ],',
        '    "artifactName": "${productName}-Mac-${version}-Installer.${ext}"',
        '  },',
        '  "win": {',
        '    "target": [',
        '      {',
        '        "target": "nsis",',
        '        "arch": [',
        '          "x64"',
        '        ]',
        '      }',
        '    ],',
        '    "artifactName": "${productName}-Windows-${version}-Setup.${ext}"',
        '  },',
        '  "nsis": {',
        '    "oneClick": false,',
        '    "perMachine": false,',
        '    "allowToChangeInstallationDirectory": true,',
        '    "deleteAppDataOnUninstall": false',
        '  },',
        '  "linux": {',
        '    "target": [',
        '      "AppImage"',
        '    ],',
        '    "artifactName": "${productName}-Linux-${version}.${ext}"',
        '  }',
        '}',
      ].join('\n'),
    })

    new SampleFile(this, 'index.html', {
      contents: [
        '<!doctype html>',
        '<html lang="en">',
        '  <head>',
        '    <meta charset="UTF-8" />',
        '    <link rel="icon" type="image/svg+xml" href="/vite.svg" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '    <title>Vite + React + TS</title>',
        '  </head>',
        '  <body>',
        '    <div id="root"></div>',
        '    <script type="module" src="/src/main.tsx"></script>',
        '  </body>',
        '</html>',
      ].join('\n'),
    })

    this.tryRemoveFile('tsconfig.json')

    new SampleFile(this, 'tsconfig.json', {
      contents: [
        '{',
        '  "compilerOptions": {',
        '    "target": "ES2020",',
        '    "useDefineForClassFields": true,',
        '    "lib": ["ES2020", "DOM", "DOM.Iterable"],',
        '    "module": "ESNext",',
        '    "skipLibCheck": true,',
        '    "moduleResolution": "bundler",',
        '    "allowImportingTsExtensions": true,',
        '    "resolveJsonModule": true,',
        '    "isolatedModules": true,',
        '    "noEmit": true,',
        '    "jsx": "react-jsx",',
        '    "strict": true,',
        '    "noUnusedLocals": true,',
        '    "noUnusedParameters": true,',
        '    "noFallthroughCasesInSwitch": true',
        '  },',
        '  "include": ["src", "electron"],',
        '  "references": [{ "path": "./tsconfig.node.json" }]',
        '}',
      ].join('\n'),
    })

    new SampleFile(this, 'tsconfig.node.json', {
      contents: [
        '{',
        '  "compilerOptions": {',
        '    "composite": true,',
        '    "skipLibCheck": true,',
        '    "module": "ESNext",',
        '    "moduleResolution": "bundler",',
        '    "allowSyntheticDefaultImports": true',
        '  },',
        '  "include": ["vite.config.ts"]',
        '}',
      ].join('\n'),
    })

    new SampleFile(this, 'vite.config.ts', {
      contents: [
        "import { defineConfig } from 'vite'",
        "import path from 'node:path'",
        "import electron from 'vite-plugin-electron/simple'",
        "import react from '@vitejs/plugin-react'",
        '',
        '// https://vitejs.dev/config/',
        'export default defineConfig({',
        '  plugins: [',
        '    react(),',
        '    electron({',
        '      main: {',
        "        entry: 'electron/main.ts',",
        '      },',
        '      preload: {',
        '        input: path.join(__dirname, "electron/preload.ts"),',
        '      },',
        '      renderer: {},',
        '    }),',
        '  ],',
        '})',
      ].join('\n'),
    })
  }
}
