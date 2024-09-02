import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchTopRatedMovies = () => {
  return api.get('/movie/top_rated', {
    params: {
      language: 'ko-KR',
      region: 'KR',
    },
  })
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top-rated'],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  })
}
