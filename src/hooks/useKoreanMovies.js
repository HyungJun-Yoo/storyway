import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchKoreanMovies = () => {
  return api.get(`/discover/movie`, {
    params: {
      language: 'ko-KR',
      sort_by: 'popularity.desc',
      region: 'KR',
      with_original_language: 'ko',
      certification_country: 'KR',
      'certification.lte': '15',
    },
  })
}

export const useKoreanMoviesQuery = () => {
  return useQuery({
    queryKey: ['korean-movie'],
    queryFn: fetchKoreanMovies,
    select: (result) => result.data,
  })
}
