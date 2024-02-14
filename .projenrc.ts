import { Root, Backend, Frontend, Descktop, Schema } from './projenrc'

const root = new Root()

new Backend({ parent: root })

new Frontend({ parent: root })

new Descktop({ parent: root })

new Schema({ parent: root })

root.addTask('descktop:dev', {
  exec: 'cd packages/apps/descktop && pnpm run dev',
})

root.addTask('descktop:test', {
  exec: 'cd packages/apps/descktop && pnpm run test',
})

root.addTask('backend:test', {
  exec: 'cd packages/apps/backend && pnpm run test',
})

root.addTask('backend:dev', {
  exec: 'cd packages/apps/backend && pnpm run start:dev',
})

root.addTask('backend:docker:compose:up', {
  steps: [
    {
      name: 'build dependence on the backend',
      exec: 'cd packages/libs/schema && pnpm run build',
    },
    {
      name: 'remove caches dist and node_modules',
      exec: 'cd packages/apps/backend && rm -rf dist node_modules',
    },

    {
      name: 'dependencies installation',
      exec: 'npx projen',
    },
    {
      name: 'Start the backend services',
      exec: 'cd packages/apps/backend && pnpm run docker:up',
    },
  ],
})

root.addTask('backend:e2e', {
  exec: 'cd packages/apps/backend && pnpm run test:e2e',
})

root.addTask('frontend:test', {
  exec: 'cd packages/apps/frontend && pnpm run test',
})

root.addTask('frontend:dev', {
  steps: [
    {
      name: 'build dependence on the backend',
      exec: 'cd packages/libs/schema && pnpm run build',
    },
    {
      name: 'remove caches dist and node_modules',
      exec: 'cd packages/apps/frontend && rm -rf dist node_modules',
    },

    {
      name: 'dependencies installation',
      exec: 'npx projen',
    },
    {
      name: 'Start the frontend services',
      exec: 'cd packages/apps/frontend && pnpm run dev',
    },
  ],
})

root.synth()
