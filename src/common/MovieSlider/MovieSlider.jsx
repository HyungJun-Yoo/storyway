import MovieCard from '@/common/MovieCard/MovieCard'
import React from 'react'
import Carousel from 'react-multi-carousel'
import './MovieSlider.style.css'

const MovieSlider = ({ type, movies, responsive }) => {
  const headerType = () => {
    if (type === 'popular') {
      return '인기'
    }

    if (type === 'top_rate') {
      return '최고 평점'
    }

    if (type === 'uncoming') {
      return '개봉 예정'
    }
  }

  return (
    <div className='p-4'>
      <h3 className='text-3xl font-bold pl-4'>{headerType()}</h3>
      <div className='mt-8 mb-8'>
        <Carousel
          centerMode={false}
          responsive={responsive}
          itemClass='carousel-item'
          containerClass='carousel-container'
        >
          {movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={`${movie.title}-${index}`}
              index={index}
            />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default MovieSlider
