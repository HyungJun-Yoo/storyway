import React from 'react'
import { usePopularMoviesQuery } from '@/hooks/usePopularMovies'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import randomNumber from '@/utils/randomNumber'

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  console.log(data)
  const length = data?.results?.length
  if (length === 0) return <Error />

  let number = randomNumber(length)
  const selectData = data.results[number]

  const backgroundPath = () => {
    const path = `https://media.themoviedb.org/t/p/original/${selectData.backdrop_path}`

    return path
  }

  return (
    <div
      className='w-full min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-end relative'
      style={{ backgroundImage: `url(${backgroundPath()})` }}
    >
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='flex flex-col p-6 relative z-10'>
        <h1 className='text-white text-xl sm:text-3xl font-bold mb-4 drop-shadow-lg'>
          {selectData.title}
        </h1>
        <div className='w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px]'>
          <p className='text-white text-base sm:text-lg drop-shadow-md line-clamp-3'>
            {selectData.overview}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
