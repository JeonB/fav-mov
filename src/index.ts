import Fastify from 'fastify'
import App from './app'

async function start(): Promise<void> {
  const fastify = Fastify({
    logger: true,
  })

  //app.ts에 작성된 모든 로직이 포함된 범위를 생성
  await fastify.register(App)

  await fastify.listen({
    host: 'localhost',
    port: 8081,
  })
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
