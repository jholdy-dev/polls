import { NodePackageManager } from 'projen/lib/javascript'
import {
  TypeScriptAppProject,
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript'
import fs from 'fs'

export const getBaseOptions = (outdir: string) => ({
  projenrcTs: true,
  eslint: false,
  prettier: false,
  outdir: `./@projects/${outdir}`,
  packageManager: NodePackageManager.PNPM,
})

export const setBaseTsconfig = (project: TypeScriptProject) => {
  for (const tsconfigName of ['tsconfig.json', 'tsconfig.dev.json']) {
    const tsconfigJson = project.tryFindObjectFile(tsconfigName)

    tsconfigJson?.addOverride('extends', '../../tsconfig.json')
  }
}

export class Base extends TypeScriptAppProject {
  constructor(props: TypeScriptProjectOptions) {
    if (!props.outdir) throw new Error('outdir is required')

    super({
      ...props,
      ...getBaseOptions(props.outdir),
    })

    setBaseTsconfig(this)
  }

  removeFile(file: string) {
    if (fs.existsSync(file)) {
      fs.unlink(file, (error) => {
        if (error) {
          console.error('Erro', error)
        }
      })
    }
  }

  addJestAttributeToJsonFile(file: string) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err)
        return
      }

      const config = JSON.parse(data)

      config.jest = {
        moduleFileExtensions: ['js', 'json', 'ts'],
        rootDir: 'src',
        testRegex: '.*\\.spec\\.ts$',
        transform: {
          '^.+\\.(t|j)s$': 'ts-jest',
        },
        collectCoverageFrom: ['**/*.(t|j)s'],
        coverageDirectory: './coverage',
        testEnvironment: 'node',
      }

      const newJsonContent = JSON.stringify(config, null, 2)

      fs.writeFile(file, newJsonContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err)
          return
        }
      })
    })
  }
}
