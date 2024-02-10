import { TextFile, YamlFile, JsonFile } from 'projen'
import { NodePackageManager } from 'projen/lib/javascript'
import { TypeScriptAppProject } from 'projen/lib/typescript'

export class Root extends TypeScriptAppProject {
  constructor() {
    super({
      defaultReleaseBranch: 'main',
      name: 'hoyeah-monorepo',
      projenrcTs: true,
      mergify: false,
      prettier: true,
      srcdir: 'projenrc',
      npmRegistryUrl: 'https://registry.npmjs.org/',
      packageManager: NodePackageManager.PNPM,
      sampleCode: true,
    })

    new TextFile(this, '.nvmrc', {
      lines: ['20.11.0'],
    })

    this.gitignore.include('**release**')
    this.gitignore.exclude('**.db-data**')
    this.gitignore.include('**packages-lock**')

    this.eslint?.ignorePatterns.push('.eslintrc.json')
    this.tryRemoveFile('.npmrc')

    for (const tsconfigName of ['tsconfig.json', 'tsconfig.dev.json']) {
      const tsconfigJson = this.tryFindObjectFile(tsconfigName)

      tsconfigJson?.addDeletionOverride('compilerOptions.rootDir')
      tsconfigJson?.addOverride('referencies', [
        {
          path: '@projects/backend',
        },
        {
          path: '@projects/frontend',
        },
      ])

      tsconfigJson?.addOverride('include', ['@projects/**/*'])

      tsconfigJson?.addOverride('paths', {
        '@projects/*': ['./@projects/*'],
        '@libs/*': ['./@libs/*'],
      })

      tsconfigJson?.addOverride('baseUrl', '.')
    }

    this.tryFindObjectFile('.eslintrc.json')?.addDeletionOverride(
      'parserOptions',
    )

    this.tryRemoveFile('.prettierrc.json')

    new JsonFile(this, '.prettierrc.json', {
      obj: {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    })

    new YamlFile(this, 'pnpm-workspace.yaml', {
      obj: {
        packages: ['@projects/*', '@libs/*'],
        lockfile: true,
      },
    })
  }
}
