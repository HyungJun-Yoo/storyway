import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchPopularMovies = () => {
  return api.get('/movie/popular', {
    params: {
      language: 'ko-KR',
      region: 'KR',
    },
  })
}

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  })
}
