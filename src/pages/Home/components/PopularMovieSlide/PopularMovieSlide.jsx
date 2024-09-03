import React from 'react'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieCard from '@/common/MovieCard/MovieCard'
import { usePopularMoviesQuery } from '@/hooks/usePopularMovies'
import { useTopRatedMoviesQuery } from '@/hooks/useTopRatedMovies'
import { useUncomingMoviesQuery } from '@/hooks/useUpcomingMovies'
import MovieSlider from '@/common/MovieSlider/MovieSlider'
import { responsive } from '@/constants/responsive'

const PopularMovieSlide = ({ type }) => {
  let queryResult

  if (type === 'popular') {
    queryResult = usePopularMoviesQuery()
  } else if (type === 'top_rate') {
    queryResult = useTopRatedMoviesQuery()
  } else if (type === 'uncoming') {
    queryResult = useUncomingMoviesQuery()
  } else {
    return <Error />
  }

  const { data, isLoading, isError } = queryResult

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  const length = data?.results?.length
  if (length === 0) return <Error />

  return (
    <div className='mt-8'>
      <MovieSlider type={type} movies={data.results} responsive={responsive} />
    </div>
  )
}

export default PopularMovieSlide
