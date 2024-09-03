import Banner from '@/pages/Home/components/Banner/Banner'
import PopularMovieSlide from '@/pages/Home/components/PopularMovieSlide/PopularMovieSlide'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='p-4'>
        <PopularMovieSlide type={'popular'} />
        <PopularMovieSlide type={'top_rate'} />
        <PopularMovieSlide type={'uncoming'} />
      </div>
    </div>
  )
}

export default Home
