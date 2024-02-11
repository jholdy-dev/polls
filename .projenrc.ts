import { Root, Backend, Frontend, Descktop, Schema } from './projenrc'

const root = new Root()

new Backend({ parent: root })

new Frontend({ parent: root })

new Descktop({ parent: root })

new Schema({ parent: root })

root.addTask('desktop:dev', {
  exec: 'cd packages/apps/desktop && yarn dev',
})

root.addTask('desktop:test', {
  exec: 'cd packages/apps/desktop && yarn test',
})

root.addTask('backend:test', {
  exec: 'cd packages/apps/backend && yarn test',
})

root.addTask('backend:dev', {
  exec: 'cd packages/apps/backend && yarn start:dev',
})

root.addTask('backend:docker:compose:up', {
  exec: 'cd packages/apps/backend && yarn docker:up',
})

root.addTask('backend:e2e', {
  exec: 'cd packages/apps/backend && yarn test:e2e',
})

root.addTask('frontend:test', {
  exec: 'cd packages/apps/frontend && yarn test',
})

root.addTask('frontend:dev', {
  exec: 'cd packages/apps/frontend && yarn dev',
})

root.synth()
