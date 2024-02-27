import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'
import Sensible from '@fastify/sensible'

interface FavMovies {
  title: string
  description: string
  genre: string
}

/** Our simple database for movies **/
const favMovies: FavMovies[] = []

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(Sensible)
  // GET /movies endpoint
  fastify.route({
    url: '/movies',
    method: 'GET',
    // handler는 반드시 알아야 하는 함수
    handler: function myHandler(request, reply) {
      reply.send({
        message: 'Movies listed successfully',
        success: true,
        data: favMovies,
      })
    },
  })

  // POST /movies endpoint
  fastify.route({
    url: '/movies',
    method: 'POST',
    handler: function handler(request, reply) {
      const data = request.body as FavMovies
      if (!data?.title || !data?.description || !data.genre) {
        throw fastify.httpErrors.badRequest(
          '제목, 설명, 장르를 다시 한번 확인해주세요',
        )
      }
      favMovies.push({
        title: data.title,
        description: data.description,
        genre: data.genre,
      })

      reply.send({
        message: '성공적으로 추가되었습니다',
        success: true,
        data: null,
      })
    },
  })
  //test
  // fastify에서는 GET메소드 생성 하기 간편한 get메소드 제공함
  fastify.get('/movies/:movieGenre', function getMovie(request, reply) {
    const requestParams = request.params as { movieGenre: string }
    const searchingFor = requestParams.movieGenre
    const result = favMovies.filter(movie => movie.genre === searchingFor)
    if (result.length !== 0 && result) {
      return {
        message: '영화 정보 출력 성공',
        success: true,
        data: result,
      }
    } else {
      throw fastify.httpErrors.notFound(
        `Could not find movies with the genre: ${searchingFor}`,
      )
    }
  })
}
