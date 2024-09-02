import React from 'react'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieCard from '@/pages/Home/components/MovieCard/MovieCard'
import './PopularMovieSlide.style.css'
import { usePopularMoviesQuery } from '@/hooks/usePopularMovies'
import { useTopRatedMoviesQuery } from '@/hooks/useTopRatedMovies'
import { useUncomingMoviesQuery } from '@/hooks/useUpcomingMovies'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

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

  const headerTitle = () => {
    if (type === 'popular') {
      return '인기 영화'
    }

    if (type === 'top_rate') {
      return '최고 평점 영화'
    }

    if (type === 'uncoming') {
      return '개봉 예정 영화'
    }
  }

  return (
    <div className='mt-8'>
      <h3 className='text-3xl font-bold pl-4'>{headerTitle()}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        responsive={responsive}
        itemClass='carousel-item'
        containerClass='carousel-container'
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={`${movie.title}-${index}`} />
        ))}
      </Carousel>
    </div>
  )
}

export default PopularMovieSlide
