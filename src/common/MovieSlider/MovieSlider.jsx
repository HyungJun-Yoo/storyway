import MovieCard from '@/common/MovieCard/MovieCard'
import React from 'react'
import Carousel from 'react-multi-carousel'
import './MovieSlider.style.css'

const MovieSlider = ({ title, movies, responsive }) => {
  const headerTitle = () => {
    if (title === 'popular') {
      return '인기 영화'
    }

    if (title === 'top_rate') {
      return '최고 평점 영화'
    }

    if (title === 'uncoming') {
      return '개봉 예정 영화'
    }
  }

  return (
    <div>
      <h3 className='text-3xl font-bold pl-4'>{headerTitle()}</h3>
      <Carousel
        infinite={true}
        centerMode={false}
        responsive={responsive}
        itemClass='carousel-item'
        containerClass='carousel-container'
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={`${movie.title}-${index}`} />
        ))}
      </Carousel>
    </div>
  )
}

export default MovieSlider
