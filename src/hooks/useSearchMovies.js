import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchSearchMovies = ({ keyword, page }) => {
  return keyword
    ? api.get('/search/movie', {
        params: {
          page: `${page}`,
          query: `${keyword}`,
          language: 'ko-KR',
          region: 'KR',
        },
      })
    : api.get('/movie/popular', {
        params: {
          page: `${page}`,
          language: 'ko-KR',
          region: 'KR',
        },
      })
}

export const useSearchMoviesQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
    queryFn: () => fetchSearchMovies({ keyword, page }),
    select: (result) => result.data,
  })
}
