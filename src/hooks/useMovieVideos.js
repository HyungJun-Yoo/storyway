import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchMovieVideos = (movie_id) => {
  return api.get(`/movie/${movie_id}/videos`, {
    params: {
      language: 'ko-KR',
    },
  })
}

export const useMovieVideosQuery = (movie_id) => {
  return useQuery({
    queryKey: ['movie-videos'],
    queryFn: () => fetchMovieVideos(movie_id),
    select: (result) => result.data.results,
    enabled: !!movie_id,
  })
}
