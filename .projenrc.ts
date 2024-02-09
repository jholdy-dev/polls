import { Root, Backend, Frontend, Descktop, Schema } from './projenrc'

const root = new Root()

new Backend({ parent: root })

new Frontend({ parent: root })

new Descktop({ parent: root })

new Schema({ parent: root })

root.addTask('descktop:dev', {
  exec: 'pnpm --filter @project/descktop run dev',
})

root.addTask('descktop:test', {
  exec: 'pnpm --filter @project/descktop run test',
})

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
