import { useMovieGenreQuery } from '@/hooks/useMovieGenre'
import React, { useState } from 'react'

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery()
  console.log(genreData)

  const { title, backdrop_path, genre_ids, release_date } = movie
  const [isHovered, setIsHovered] = useState(false)

  const backgroundPath = () => {
    return `https://media.themoviedb.org/t/p/original/${backdrop_path}`
  }

  const showGenre = (genreIdList) => {
    if (!genreData) return []
    const ganreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((ganre) => ganre.id === id)
      return genreObj.name
    })

    return ganreNameList
  }

  return (
    <div
      className='relative group w-[140px] sm:w-[180px] lg:w-[250px] h-[200px] sm:h-[250px] lg:h-[300px] bg-cover bg-center rounded-lg overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-105'
      style={{ backgroundImage: `url(${backgroundPath()})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className='w-[140px] sm:w-[180px] lg:w-[250px] h-[200px] sm:h-[250px] lg:h-[300px] absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white'>
          <div className='w-[140px] sm:w-[180px] lg:w-[250px] flex text-sm gap-2 mt-4 overflow-hidden whitespace-nowrap text-ellipsis'>
            {showGenre(genre_ids).map((genre, index) => (
              <p className=''>{genre}</p>
            ))}
          </div>

          <div className='h-full flex flex-col justify-center p-1 sm:p-4'>
            <h3 className='text-lg font-bold'>{title}</h3>

            <p className='text-sm'>
              개봉일: {new Date(release_date).toLocaleDateString()}
            </p>
            <a
              href={`https://www.youtube.com/results?search_query=${title} 예고편`}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-2 text-blue-400 hover:underline'
            >
              예고편 보기
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard
