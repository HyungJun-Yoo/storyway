import MovieCard from '@/common/MovieCard/MovieCard'
import Loading from '@/components/Loading'
import { useSearchMoviesQuery } from '@/hooks/useSearchMovies'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const Movie = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const keyword = query.get('q')

  const { data, isLoading, isError } = useSearchMoviesQuery({ keyword, page })

  const handlePageClick = (number) => {
    setPage(number + 1)
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const getPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }
  if (data?.total_results === 0) {
    return (
      <div className='h-[50vh] flex justify-center items-center'>
        <div className='flex flex-col justify-center'>
          <p className='text-4xl font-mono'>
            "{keyword.length > 10 ? `${keyword.slice(0, 10)}...` : keyword}"
          </p>
          <p className='text-xl sm:text-4xl font-mono'>
            에 대한 검색 결과가 없습니다.
          </p>
        </div>
      </div>
    )
  }

  const totalPages = data?.total_pages
  const pageNumbers = getPageNumbers(page, totalPages)

  return (
    <div className='w-full'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10'>
        {data?.results?.map((movie, index) => (
          <MovieCard
            key={`${movie.title}-${index}`}
            movie={movie}
            index={index + (page - 1) * 20}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex items-center justify-center p-10 gap-4 sm:gap-8'>
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ${
              page === 1 ? 'opacity-20 cursor-not-allowed' : ''
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> 이전
          </button>

          {/* 페이지 번호 렌더링 */}
          <div className='flex gap-2 sm:gap-4'>
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => handlePageClick(number - 1)}
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer ${
                  number === page ? 'bg-gray-500 text-white' : ''
                }`}
              >
                {number}
              </span>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ${
              page === Math.ceil(data?.total_pages / 20)
                ? 'opacity-20 cursor-not-allowed'
                : ''
            }`}
          >
            다음 <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Movie
