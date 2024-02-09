import { Root, Backend, Frontend } from './projenrc'

const root = new Root()

new Backend({ parent: root })

new Frontend({ parent: root })

root.addTask('backend:test', {
  exec: 'pnpm --filter @project/backend run test',
})

root.addTask('backend:dev', {
  exec: 'pnpm --filter @project/backend run start:dev',
})

root.addTask('backend:e2e', {
  exec: 'pnpm --filter @project/backend run test:e2e',
})

root.addTask('frontend:test', {
  exec: 'pnpm --filter @project/frontend run test',
})

root.addTask('frontend:dev', {
  exec: 'pnpm --filter @project/frontend run dev',
})

root.synth()
