import { ReactTypeScriptProject } from 'projen/lib/web'
import { getBaseOptions } from './base'
import { TypeScriptProject } from 'projen/lib/typescript'
import { NodePackageManager } from 'projen/lib/javascript'

type FrontendProps = {
  parent: TypeScriptProject
}

export class Frontend extends ReactTypeScriptProject {
  constructor(props: FrontendProps) {
    super({
      ...getBaseOptions('frontend'),
      ...props,
      name: '@apps/frontend',
      packageManager: NodePackageManager.PNPM,
      defaultReleaseBranch: 'main',
      release: false,
    })

    this.addDeps(
      '@lib/schema@file:../../libs/schema',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      '@fontsource/roboto',
      'react-router-dom',
      'localforage',
      'match-sorter',
      'sort-by',
      'react-hook-form',
      '@hookform/resolvers',
      'axios',
      'zustand',
      '@mui/icons-material',
    )
  }
}
