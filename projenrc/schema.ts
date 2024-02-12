import { TypeScriptAppProject } from 'projen/lib/typescript'
import { Base } from './base'
import { NodePackageManager } from 'projen/lib/javascript'

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
      packageManager: NodePackageManager.PNPM,
    })

    this.addDeps('zod')

    this.package.file.addOverride('main', 'lib/index.js')
    this.package.file.addOverride('types', 'lib/index.d.ts')
  }
}
