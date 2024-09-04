import React, { useState } from 'react'
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
  message,
  setMessage,
  searchList,
  setSearchList,
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
    setMessage('')
  }

  const removeSearchList = () => {
    setSearchList([])
    localStorage.removeItem('searchList')
  }

  const handleSearchListClick = (search) => {
    navigate(`/movies?q=${search}`)
    setIsSearchOpen(false)
    setKeyword('')
    setMessage('')
  }

  const koreanMovieData = data?.results?.slice(0, 10) || []

  return (
    <div
      className={`absolute flex flex-col items-center w-full min-h-[400px] z-50 ${
        isDarkMode ? 'bg-gray-950' : 'bg-slate-50'
      }`}
    >
      <form
        onSubmit={(event) => searchByKeyword(event)}
        className='w-full max-w-[1280px] bg-opacity-75 pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-36 md:pr-36'
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
        {message && <div className='text-red-500 mt-4'>{message}</div>}
      </form>

      <div className='w-full max-w-[1280px] flex justify-center flex-1 pt-12 pb-12 pl-4 pr-4 md:pl-36 md:pr-36'>
        <div
          className={`flex-1 flex flex-col font-bold sm:border-r-2 ${
            isDarkMode ? 'sm:border-white' : 'sm:border-gray-400'
          }`}
        >
          <div className='flex flex-shrink gap-4 justify-center sm:justify-start sm:min-w-[253px]'>
            <div className='text-xl font-bold text-nowrap'>최근 검색어</div>
            {searchList.length > 0 && (
              <button
                onClick={removeSearchList}
                className={`text-sm text-nowrap border p-1 opacity-30 hover:opacity-70 ${
                  isDarkMode
                    ? 'border-gray-100 text-gray-100'
                    : 'border-black text-black'
                }`}
              >
                검색 내역 지우기
              </button>
            )}
          </div>
          <ul className='flex flex-col mt-4 gap-2 pl-4 pt-4 sm:pl-0 sm:pt-0'>
            {searchList.length > 0 ? (
              searchList.map((search, index) => (
                <li
                  onClick={() => handleSearchListClick(search)}
                  className='flex items-center gap-2 cursor-pointer'
                  key={`${search}-${index}`}
                >
                  <p className='font-sans text-sm sm:text-base text-nowrap'>
                    {search.length > 20 ? `${search.slice(0, 20)}...` : search}
                  </p>
                </li>
              ))
            ) : (
              <div
                className={`text-sm opacity-60 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                검색 내역이 없습니다.
              </div>
            )}
          </ul>
        </div>
        <div className='hidden sm:flex flex-1 flex-col ml-12'>
          <div className='text-xl font-bold'>실시간 인기 검색어</div>
          <ul className='flex flex-col mt-4 gap-2'>
            {koreanMovieData.map((movie, index) => (
              <li
                onClick={() => handleNavigate(movie.id)}
                className='flex items-center gap-2 cursor-pointer'
                key={`${movie.title}-${index}`}
              >
                <p
                  className={`w-10 text-xl ${
                    isDarkMode ? 'text-red-800' : 'text-red-500'
                  }`}
                >
                  {index + 1}
                </p>
                <p className='font-serif text-base text-nowrap'>
                  {movie.title.length > 20
                    ? `${movie.title.slice(0, 20)}...`
                    : movie.title}
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
