import Banner from '@/pages/Home/components/Banner/Banner'
import PopularMovieSlide from '@/pages/Home/components/PopularMovieSlide/PopularMovieSlide'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide title={'popular'} />
      <PopularMovieSlide title={'top_rate'} />
      <PopularMovieSlide title={'uncoming'} />
    </div>
  )
}

export default Home
