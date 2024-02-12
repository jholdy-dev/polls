import { TypeScriptAppProject } from 'projen/lib/typescript'
import { NestJSAppProject } from './libs/nestjs-app-project'
import { YamlFile } from 'projen'
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
      '@nestjs/passport',
      'passport',
      'passport-local',
      'bcrypt',
      '@nestjs/jwt',
      'passport-jwt',
      'zod',
    )

    this.addDevDeps(
      '@types/sequelize',
      '@types/passport-local',
      '@types/bcrypt',
      '@types/passport-jwt',
      'nodemon',
    )

    new YamlFile(this, 'docker-compose.yml', {
      obj: {
        version: '3.8',
        services: {
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
          exec: 'docker-compose up -d',
        },
        {
          name: 'Start the backend services',
          exec: 'pnpm run start:dev',
        },
      ],
    })
  }
}
