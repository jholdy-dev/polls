import { TypeScriptAppProject } from 'projen/lib/typescript'
import { Base } from './base'

type SchemaProps = {
  parent: TypeScriptAppProject
}

export class Schema extends Base {
  constructor(options: SchemaProps) {
    super({
      ...options,
      name: '@libs/schema',
      outdir: 'schema',
      defaultReleaseBranch: 'main',
      release: false,
      projenrcTs: true,
      testdir: 'src',
      isLib: true,
    })

    this.package.file.addOverride('main', 'dist/index.js')
  }
}
