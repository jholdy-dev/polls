import { Root, Backend } from './projenrc'

const root = new Root()

root.addTask('backend:test', {
  exec: 'pnpm --filter @project/backend run test',
})

root.addTask('backend:dev', {
  exec: 'pnpm --filter @project/backend run start:dev',
})

root.addTask('backend:e2e', {
  exec: 'pnpm --filter @project/backend run test:e2e',
})

new Backend({ parent: root })

root.synth()
