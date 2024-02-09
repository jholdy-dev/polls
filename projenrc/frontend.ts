import { ReactTypeScriptProject } from 'projen/lib/web'
import { getBaseOptions } from './base'
import { TypeScriptProject } from 'projen/lib/typescript'

type FrontendProps = {
  parent: TypeScriptProject
}

export class Frontend extends ReactTypeScriptProject {
  constructor(props: FrontendProps) {
    super({
      ...getBaseOptions('frontend'),
      ...props,
      name: '@project/frontend',
      defaultReleaseBranch: 'main',
      release: false,
    })

    this.addDeps('@lib/schema@workspace:*')
  }
}
