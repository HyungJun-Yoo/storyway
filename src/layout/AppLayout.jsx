import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ThemeButton from '@/components/ThemeButton'
import useStore from '@/store/store'
import SearchButton from '@/components/SearchButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from '@/components/Logo'

const NAVLINKS = ['Home', 'Movies']

const AppLayout = () => {
  const { isDarkMode, toggleDarkMode } = useStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedNav, setSelectedNav] = useState('Home')
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev)
  }, [])

  const handleNav = useCallback(
    (navlink) => {
      navlink === 'Home' ? navigate('/') : navigate(`/${navlink}`)
      setSelectedNav(navlink)
    },
    [navigate]
  )

  return (
    <div
      className={`${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      } min-h-screen min-w-[350px] relative`}
    >
      <div className='flex justify-between items-center p-1 sm:p-2 h-[120px]'>
        <nav className='flex gap-28 xl:gap-36'>
          <Logo />
          <ul className='hidden sm:flex items-center gap-4'>
            {NAVLINKS.map((navlink) => (
              <li
                key={navlink}
                onClick={() => handleNav(navlink)}
                className={`font-bold text-[18px] sm:text-[24px] cursor-pointer ${
                  selectedNav === navlink && 'border-b-2 border-red-500'
                }`}
              >
                {navlink}
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex gap-4 mr-1 sm:mr-2'>
          <SearchButton isSearchOpen={isSearchOpen} onClick={toggleSearch} />
          <ThemeButton />
        </div>
      </div>

      <div className='sm:hidden p-4 mb-4'>
        <ul className='flex items-center gap-4 ml-4'>
          {NAVLINKS.map((navlink) => (
            <li
              key={navlink}
              onClick={() => handleNav(navlink)}
              className={`text-[18px] sm:text-[24px] cursor-pointer ${
                selectedNav === navlink && 'border-b-2 border-red-500'
              }`}
            >
              {navlink}
            </li>
          ))}
        </ul>
      </div>

      {isSearchOpen && (
        <div
          className={`fixed flex flex-col items-center w-full min-h-[400px] z-50 ${
            isDarkMode ? 'bg-gray-950' : 'bg-slate-100'
          }`}
        >
          <div className='w-full max-w-[1280px] bg-opacity-75 sm:pl-36 sm:pr-36'>
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
              <div className='flex justify-center items-center absolute top-2 right-4 cursor-pointer'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className={`w-[24px] h-[24px] ${
                    isDarkMode ? 'text-black' : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className='w-full max-w-[1280px] flex flex-1 p-12 sm:pl-36 sm:pr-36'>
            <div className='flex-1 flex font-bold border-r-2 border-white'>
              <div className='text-xl font-bold'>최근 검색어</div>
            </div>
            <div className='flex-1 flex flex-col ml-12'>
              <div className='text-xl font-bold'>실시간 인기 검색어</div>
              <ul className='flex flex-col mt-4'>
                <li className='flex items-center gap-2 cursor-pointer'>
                  <p className='text-red-800 text-xl'>1</p>
                  <p className='font-serif text-base'>우씨왕후</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  )
}

export default AppLayout
