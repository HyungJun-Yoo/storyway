import React, { useState } from 'react'

const MovieCard = ({ movie }) => {
  const { title, backdrop_path, genre_ids, overview, release_date } = movie
  const [isHovered, setIsHovered] = useState(false)

  const backgroundPath = () => {
    return `https://media.themoviedb.org/t/p/original/${backdrop_path}`
  }

  const genres = genre_ids
    .map((id) => {
      const genreMap = {
        27: '공포',
        878: 'SF',
        53: '스릴러',
      }
      return genreMap[id] || `장르 ${id}`
    })
    .join(', ')

  return (
    <div
      className='relative group w-[220px] h-[330px] bg-cover bg-center rounded-lg overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-105'
      style={{ backgroundImage: `url(${backgroundPath()})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className='absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='text-sm'>{genres}</p>
          <p className='text-sm'>
            개봉일: {new Date(release_date).toLocaleDateString()}
          </p>
          <p className='mt-2 text-xs text-center'>
            {overview.length > 100 ? `${overview.slice(0, 100)}...` : overview}
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
      )}
    </div>
  )
}

export default MovieCard
