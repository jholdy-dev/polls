import { TypeScriptAppProject } from 'projen/lib/typescript'
import { NestJSAppProject } from './libs/nestjs-app-project'
import { SampleFile, YamlFile } from 'projen'

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

    this.gitignore.include('./.db-data')

    this.addDeps(
      '@lib/schema@file:../../@libs/schema',
      'sequelize',
      'sequelize-typescript',
      'pg-hstore',
      'pg',
      '@nestjs/config',
      'dotenv',
    )

    this.addDevDeps('@types/sequelize')

    new SampleFile(this, 'Dockerfile', {
      contents: [
        'FROM --platform=amd64 node:20-alpine',
        'WORKDIR /app',
        'COPY .env .',
        'COPY ./package.json ./',
        'COPY ./package-lock.json ./',
        'COPY node_modules ./node_modules',
        'COPY . .',
        'EXPOSE 3000',
        'RUN npm install -g pnpm',
        'CMD [ "npm", "run", "start:dev" ]',
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
              POSTGRES_DB: 'development_database_name',
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

    const preSteps = [
      {
        name: 'remove node_modules',
        exec: 'rm -rf node_modules',
      },
      {
        name: 'remove package-lock.json',
        exec: 'rm -rf package-lock.json',
      },
    ]

    this.addTask('docker:up', {
      steps: [
        ...preSteps,
        {
          name: 'npm install',
          exec: 'npm install',
        },
        {
          name: 'Start the backend services',
          exec: 'docker-compose up',
        },
        ...preSteps,
      ],
    })
  }
}
