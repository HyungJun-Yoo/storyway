import React, { useEffect, useState } from 'react'
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

  const navigate = useNavigate()

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleNav = (navlink) => {
    navlink === 'Home' ? navigate('/') : navigate(`/${navlink}`)
    setSelectedNav(navlink)
  }

  return (
    <div
      className={`${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      } min-h-screen min-w-[350px]`}
    >
      <div className='flex justify-between items-center p-4 h-[120px]'>
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
        <div className='flex gap-4 mr-4'>
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
          className={`fixed flex justify-center w-full min-h-[400px] z-10 ${
            isDarkMode ? 'bg-gray-950' : 'bg-slate-100'
          }`}
        >
          <div className='w-full max-w-[1280px] bg-opacity-75 sm:pl-48 sm:pr-48'>
            <div className='flex mt-4 rounded shadow-lg relative'>
              <input
                type='text'
                placeholder='영화를 검색해주세요.'
                className={`border-b-2 p-2 rounded w-full min-w-[300px] ${
                  isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}
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
        </div>
      )}

      <Outlet />
    </div>
  )
}

export default AppLayout
