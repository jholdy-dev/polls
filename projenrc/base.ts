import { NodePackageManager } from 'projen/lib/javascript'
import {
  TypeScriptAppProject,
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript'
import fs from 'fs'

export const getBaseOptions = (outdir: string, isLib: boolean = false) => ({
  projenrcTs: true,
  eslint: false,
  prettier: false,
  outdir: isLib ? `./@libs/${outdir}` : `./@projects/${outdir}`,
  packageManager: NodePackageManager.PNPM,
})

export const setBaseTsconfig = (project: TypeScriptProject) => {
  for (const tsconfigName of ['tsconfig.json', 'tsconfig.dev.json']) {
    const tsconfigJson = project.tryFindObjectFile(tsconfigName)

    tsconfigJson?.addOverride('extends', '../../tsconfig.json')
  }
}

type BaseProps = { isLib?: boolean } & TypeScriptProjectOptions

export class Base extends TypeScriptAppProject {
  constructor(props: BaseProps) {
    if (!props.outdir) throw new Error('outdir is required')

    super({
      ...props,
      ...getBaseOptions(props.outdir, props.isLib),
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
}
