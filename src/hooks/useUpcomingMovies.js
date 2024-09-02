import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchUncomingMovies = () => {
  return api.get('/movie/upcoming', {
    params: {
      language: 'ko-KR',
      region: 'KR',
    },
  })
}

export const useUncomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-uncoming'],
    queryFn: fetchUncomingMovies,
    select: (result) => result.data,
  })
}
