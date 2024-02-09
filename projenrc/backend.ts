import { TypeScriptAppProject } from 'projen/lib/typescript'
import { NestJSAppProject } from './libs/nestjs-app-project'

interface BackendOptions {
  readonly parent: TypeScriptAppProject
}

export class Backend extends NestJSAppProject {
  constructor({ parent }: BackendOptions) {
    super({
      defaultReleaseBranch: 'main',
      name: '@project/backend',
      parent,
      jest: false,
      outdir: 'backend',
    })
  }
}
