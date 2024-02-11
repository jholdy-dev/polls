import { TypeScriptAppProject } from 'projen/lib/typescript'
import { NestJSAppProject } from './libs/nestjs-app-project'
import { SampleFile, YamlFile } from 'projen'
import { NodePackageManager } from 'projen/lib/javascript'

interface BackendOptions {
  readonly parent: TypeScriptAppProject
}

export class Backend extends NestJSAppProject {
  constructor({ parent }: BackendOptions) {
    super({
      defaultReleaseBranch: 'main',
      name: '@app/backend',
      parent,
      jest: false,
      outdir: 'backend',
      packageManager: NodePackageManager.PNPM,
    })

    this.gitignore.include('./.db-data')

    this.addDeps(
      '@lib/schema@file:../../libs/schema',
      'sequelize',
      'sequelize-typescript',
      'pg-hstore',
      'pg',
      '@nestjs/config',
      'dotenv',
      '@nestjs/swagger',
    )

    this.addDevDeps('@types/sequelize', 'projen', 'constructs')

    new SampleFile(this, 'Dockerfile', {
      contents: [
        'FROM --platform=amd64 node:20-alpine',
        'WORKDIR /app',
        'RUN npm install -g pnpm',
        'COPY .env .',
        'COPY ./package.json ./',
        'COPY ./pnpm-lock.yaml ./',
        'COPY ./node_modules ./node_modules',
        'COPY . .',
        'EXPOSE 3000',
        'CMD [ "pnpm", "run", "start:dev" ]',
      ].join('\n'),
    })

    new YamlFile(this, 'docker-compose.yml', {
      obj: {
        version: '3.8',
        services: {
          backend: {
            container_name: 'backend',
            build: {
              context: '.',
              dockerfile: 'Dockerfile',
            },
            volumes: ['.:/app'],
            ports: ['3000:3000'],
            depends_on: ['db'],
          },
          db: {
            image: 'postgres:13',
            container_name: 'db',
            environment: {
              POSTGRES_DB: 'development',
              POSTGRES_USER: 'user',
              POSTGRES_PASSWORD: 'password',
            },
            volumes: ['.db-data:/var/lib/postgresql/data'],
            ports: ['5432:5432'],
          },
          pgadmin: {
            image: 'dpage/pgadmin4',
            container_name: 'pgadmin',
            environment: {
              PGADMIN_DEFAULT_EMAIL: 'admin@admin.com',
              PGADMIN_DEFAULT_PASSWORD: 'pgadmin4',
            },
            ports: ['5050:80'],
            depends_on: ['db'],
          },
        },
      },
    })

    this.addTask('docker:up', {
      steps: [
        {
          name: 'Start the backend services',
          exec: 'docker-compose up --build',
        },
      ],
    })
  }
}
