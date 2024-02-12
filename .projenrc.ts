import { Root, Backend, Frontend, Descktop, Schema } from './projenrc'

const root = new Root()

new Backend({ parent: root })

new Frontend({ parent: root })

new Descktop({ parent: root })

new Schema({ parent: root })

root.addTask('desktop:dev', {
  exec: 'cd packages/apps/desktop && pnpm run dev',
})

root.addTask('desktop:test', {
  exec: 'cd packages/apps/desktop && pnpm run test',
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
  exec: 'cd packages/apps/frontend && pnpm run dev',
})

root.synth()
