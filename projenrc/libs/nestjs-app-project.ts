import { JsonFile, SampleFile } from 'projen'
import { TypeScriptProjectOptions } from 'projen/lib/typescript'
import { deepMerge } from 'projen/lib/util'
import { Base } from '../base'
import {
  main,
  app_module,
  app_controller,
  app_service,
  app_controller_spec,
  app_e2e_spec,
  jest_e2e_json,
} from './nest-files/files-strings-nest'
import path from 'path'

export interface NestJSAppProjectOptions extends TypeScriptProjectOptions {}

export class NestJSAppProject extends Base {
  constructor(options: NestJSAppProjectOptions) {
    const defaultOptions = {
      tsconfig: {
        compilerOptions: {
          noImplicitAny: true,
          declaration: true,
          strictPropertyInitialization: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          allowSyntheticDefaultImports: true,
          sourceMap: false,
          outDir: './dist',
          baseUrl: './',
          target: undefined,
          forceConsistentCasingInFileNames: undefined,
          strictNullChecks: undefined,
          noEmit: undefined,
          noFallthroughCasesInSwitch: undefined,
        },
      },
      tsconfigDev: {
        compilerOptions: {
          baseUrl: './',
          target: 'es2022',
          sourceMap: false,
          strictPropertyInitialization: false,
          experimentalDecorators: undefined,
          emitDecoratorMetadata: undefined,
          allowSyntheticDefaultImports: undefined,
          outDir: undefined,
          skipLibCheck: undefined,
          strictNullChecks: undefined,
          noImplicitAny: undefined,
          forceConsistentCasingInFileNames: undefined,
          noFallthroughCasesInSwitch: undefined,
          noEmit: true,
        },
      },
      sampleCode: true,
    } satisfies Partial<NestJSAppProjectOptions>

    const mergedOptions = deepMerge(
      [defaultOptions, options],
      true,
    ) as NestJSAppProjectOptions

    super({ ...mergedOptions })

    const src_index = path.join(
      __dirname,
      '../packages/apps/backend/src/index.ts',
    )
    const test_hello = path.join(
      __dirname,
      '../packages/apps/test/hello.test.ts',
    )
    for (const file of [src_index, test_hello]) {
      this.removeFile(file)
    }

    const packageJson = this.tryFindObjectFile('package.json')

    packageJson?.addOverride('jest.moduleFileExtensions', ['js', 'json', 'ts'])
    packageJson?.addOverride('jest.rootDir', 'src')
    packageJson?.addOverride('jest.testRegex', '.*\\.spec\\.ts$')
    packageJson?.addOverride('jest.transform', {
      '^.+\\.(t|j)s$': 'ts-jest',
    })
    packageJson?.addOverride('jest.collectCoverageFrom', ['**/*.(t|j)s'])
    packageJson?.addOverride('jest.coverageDirectory', './coverage')
    packageJson?.addOverride('jest.testEnvironment', 'node')

    new SampleFile(this, 'src/main.ts', {
      contents: main,
    })

    new SampleFile(this, 'src/app.module.ts', {
      contents: app_module,
    })

    new SampleFile(this, 'src/app.controller.ts', {
      contents: app_controller,
    })

    new SampleFile(this, 'src/app.service.ts', {
      contents: app_service,
    })

    new SampleFile(this, 'src/app.controller.spec.ts', {
      contents: app_controller_spec,
    })

    new SampleFile(this, 'test/app.e2e-spec.ts', {
      contents: app_e2e_spec,
    })

    new SampleFile(this, 'test/jest-e2e.json', {
      contents: jest_e2e_json,
    })

    this.removeTask('build')
    this.removeTask('test')
    this.removeTask('test:watch')

    const steps = [
      {
        name: 'remove dist',
        exec: 'rm -rf dist',
      },
      {
        name: 'remove tsbuildinfo',
        exec: 'rm -rf tsconfig.build.tsbuildinfo',
      },
    ]

    this.addTask('build', {
      steps: [
        ...steps,
        {
          name: 'Build the project',
          exec: 'nest build',
        },
      ],
    })
    this.addTask('format', {
      steps: [
        ...steps,
        {
          name: 'Format the project',
          exec: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
        },
      ],
    })

    this.addTask('start', {
      steps: [
        ...steps,
        {
          name: 'Start the project',
          exec: 'nest start',
        },
      ],
    })
    this.addTask('start:dev', {
      steps: [
        ...steps,
        {
          name: 'Start the project in development mode',
          exec: 'nest start --watch',
        },
      ],
    })
    this.addTask('start:debug', {
      steps: [
        ...steps,
        {
          name: 'Start the project in debug mode',
          exec: 'nest start --debug --watch',
        },
      ],
    })
    this.addTask('start:prod', {
      steps: [
        ...steps,
        {
          name: 'Start the project in production mode',
          exec: 'node dist/main',
        },
      ],
    })
    this.addTask('lint', {
      steps: [
        ...steps,
        {
          name: 'Lint the project',
          exec: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
        },
      ],
    })
    this.addTask('test', {
      steps: [
        ...steps,
        {
          name: 'Test the project',
          exec: 'jest',
        },
      ],
    })
    this.addTask('test:watch', {
      steps: [
        ...steps,
        {
          name: 'Watch the project tests',
          exec: 'jest --watch',
        },
      ],
    })
    this.addTask('test:cov', {
      steps: [
        ...steps,
        {
          name: 'Test the project coverage',
          exec: 'jest --coverage',
        },
      ],
    })
    this.addTask('test:debug', {
      steps: [
        ...steps,
        {
          name: 'Debug the project tests',
          exec: 'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
        },
      ],
    })
    this.addTask('test:e2e', {
      steps: [
        ...steps,
        {
          name: 'Test the project end-to-end',
          exec: 'jest --config ./test/jest-e2e.json',
        },
      ],
    })

    this.addDeps(
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/platform-express',
      'reflect-metadata',
      'rxjs',
    )

    this.addDevDeps(
      '@nestjs/cli',
      '@nestjs/schematics',
      '@nestjs/testing',
      '@types/express',
      '@types/jest',
      '@types/node',
      '@types/supertest',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'jest',
      'prettier',
      'source-map-support',
      'supertest',
      'ts-jest',
      'ts-loader',
      'ts-node',
      'tsconfig-paths',
      'typescript',
    )

    if (this.tsconfig) {
      this.tsconfig.file.addOverride('compilerOptions.removeComments', true)
      this.tsconfig.file.addOverride('compilerOptions.incremental', true)
      this.tsconfig.file.addOverride(
        'compilerOptions.strictBindCallApply',
        true,
      )
    }

    new JsonFile(this, 'nest-cli.json', {
      obj: {
        $schema: 'https://json.schemastore.org/nest-cli',
        collection: '@nestjs/schematics',
        sourceRoot: 'src',
        compilerOptions: {
          deleteOutDir: true,
        },
      },
    })

    new JsonFile(this, 'tsconfig.build.json', {
      obj: {
        extends: './tsconfig.json',
        exclude: ['node_modules', 'test', 'dist', '**/*spec.ts'],
      },
    })
  }
}
