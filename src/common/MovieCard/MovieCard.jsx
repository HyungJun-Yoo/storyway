import React, { useState } from 'react'
import useStore from '@/store/store'
import { useMovieGenreQuery } from '@/hooks/useMovieGenre'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import undefindImage from '@/assets/undefindImage.jpg'

const MovieCard = ({ movie, index }) => {
  const { isDarkMode, toggleDarkMode } = useStore()
  const { data: genreData } = useMovieGenreQuery()

  const {
    title,
    backdrop_path,
    genre_ids,
    release_date,
    vote_average,
    poster_path,
  } = movie
  const [isHovered, setIsHovered] = useState(false)

  const backgroundPath = () => {
    if (poster_path) {
      return `https://image.tmdb.org/t/p/w500/${poster_path}`
    }

    return undefindImage
  }

  const showGenre = (genreIdList) => {
    if (!genreData) return []

    const ganreNameList = genreIdList
      .map((id) => {
        const genreObj = genreData.find((ganre) => ganre.id === id)
        return genreObj ? genreObj.name : null
      })
      .filter(Boolean)

    return ganreNameList.slice(0, 3)
  }

  return (
    <div className='h-[650px] relative p-4'>
      <div
        className='relative group w-full min-w-[220px] h-[500px] bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer transition-transform transform hover:scale-105'
        style={{ backgroundImage: `url(${backgroundPath()})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div className='w-full min-w-[220px] h-[500px] absolute inset-0 bg-black opacity-70 flex flex-col justify-center items-center text-white transition-transform transform z-10'>
            <div className='h-full flex flex-col justify-center items-center p-1 sm:p-4'>
              <h3 className='text-lg font-bold text-center text-cyan-400'>
                {title}
              </h3>
              <p className='text-sm text-cyan-400'>
                개봉일: {new Date(release_date).toISOString()?.split('T')[0]}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <div
          className={`${
            isDarkMode ? 'text-white' : 'text-black'
          } text-3xl  font-sans font-semibold`}
        >
          {index + 1}
        </div>
        <div className='flex flex-col gap-2'>
          <div
            className={`${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            } text-nowrap text-base font-bold overflow-hidden text-ellipsis max-w-[200px]`}
          >
            {title}
          </div>
          <div className='flex gap-2 flex-wrap'>
            {showGenre(genre_ids).map((genre, index) => (
              <div
                key={`${genre}-${index}`}
                className='flex justify-center text-sm bg-red-400 rounded-full p-1 min-w-[36px]'
              >
                {genre}
              </div>
            ))}
          </div>
          <div className='flex gap-2 items-center'>
            {vote_average.toFixed(1) !== '0.0' && (
              <>
                <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                <span className='text-sm'>{vote_average.toFixed(1)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
