import Banner from '@/pages/Home/components/Banner/Banner'
import PopularMovieSlide from '@/pages/Home/components/PopularMovieSlide/PopularMovieSlide'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide type={'popular'} />
      <PopularMovieSlide type={'top_rate'} />
      <PopularMovieSlide type={'uncoming'} />
    </div>
  )
}

export default Home
