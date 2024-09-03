import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`, {
    params: {
      language: 'ko-KR',
    },
  })
}

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 1000 * 60 * 5,
  })
}
