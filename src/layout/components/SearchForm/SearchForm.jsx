import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store/store'
import { useKoreanMoviesQuery } from '@/hooks/useKoreanMovies'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { useNavigate } from 'react-router-dom'

const SearchForm = ({
  searchByKeyword,
  keyword,
  setKeyword,
  setIsSearchOpen,
}) => {
  const { isDarkMode, toggleDarkMode } = useStore()
  const { data, isLoading, isError } = useKoreanMoviesQuery()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  const handleNavigate = (id) => {
    navigate(`/movies/${id}`)
    setIsSearchOpen(false)
    setKeyword('')
  }

  const koreanMovieData = data?.results?.slice(0, 10) || []

  return (
    <div
      className={`absolute flex flex-col items-center w-full min-h-[400px] z-50 ${
        isDarkMode ? 'bg-gray-950' : 'bg-slate-100'
      }`}
    >
      <form
        onSubmit={(event) => searchByKeyword(event)}
        className='w-full max-w-[1280px] bg-opacity-75 sm:pl-36 sm:pr-36'
      >
        <div className='flex mt-4 rounded shadow-lg relative'>
          <input
            type='text'
            placeholder='영화를 검색해주세요.'
            className={`border-b-2 p-2 rounded w-full min-w-[300px] ${
              isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button
            type='submit'
            className='flex justify-center items-center absolute top-2 right-4 cursor-pointer'
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={`w-[24px] h-[24px] ${
                isDarkMode ? 'text-black' : 'text-white'
              }`}
            />
          </button>
        </div>
      </form>

      <div className='w-full max-w-[1280px] flex flex-1 p-12 sm:pl-36 sm:pr-36'>
        <div className='flex-1 flex font-bold border-r-2 border-white'>
          <div className='text-xl font-bold'>최근 검색어</div>
        </div>
        <div className='flex-1 flex flex-col ml-12'>
          <div className='text-xl font-bold'>실시간 인기 검색어</div>
          <ul className='flex flex-col mt-4 gap-2'>
            {koreanMovieData.map((movie, index) => (
              <li
                onClick={() => handleNavigate(movie.id)}
                className='flex items-center gap-2 cursor-pointer'
                key={`${movie.title}-${index}`}
              >
                <p className='w-10 text-red-800 text-xl'>{index + 1}</p>
                <p className='font-serif text-base text-nowrap'>
                  {movie.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
