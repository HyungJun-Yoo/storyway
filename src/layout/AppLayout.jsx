import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ThemeButton from '@/components/ThemeButton'
import useStore from '@/store/store'
import SearchButton from '@/components/SearchButton'
import Logo from '@/components/Logo'
import SearchForm from '@/layout/components/SearchForm/SearchForm'

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

  const searchByKeyword = (event) => {
    event.preventDefault()

    if (keyword === '' || !keyword) {
      return
    }

    navigate(`/movies?q=${keyword}`)
    setIsSearchOpen(false)
    setKeyword('')
  }

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
        <SearchForm
          searchByKeyword={searchByKeyword}
          keyword={keyword}
          setKeyword={setKeyword}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}

      <Outlet />
    </div>
  )
}

export default AppLayout
