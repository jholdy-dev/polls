import { TypeScriptAppProject } from 'projen/lib/typescript'
import { Base } from './base'

type SchemaProps = {
  parent: TypeScriptAppProject
}

export class Schema extends Base {
  constructor(options: SchemaProps) {
    super({
      ...options,
      name: '@lib/schema',
      outdir: 'schema',
      defaultReleaseBranch: 'main',
      release: false,
      projenrcTs: true,
      testdir: 'src',
      isLib: true,
    })

    this.addDeps('zod')

    this.package.file.addOverride('main', 'src/index.ts')
  }
}
