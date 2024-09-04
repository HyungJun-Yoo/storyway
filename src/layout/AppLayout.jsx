import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ThemeButton from '@/components/ThemeButton'
import useStore from '@/store/store'
import SearchButton from '@/components/SearchButton'
import Logo from '@/components/Logo'
import SearchForm from '@/layout/components/SearchForm/SearchForm'

const NAVLINKS = ['Home', 'Movies']

const AppLayout = () => {
  const { isDarkMode, toggleDarkMode } = useStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedNav, setSelectedNav] = useState(() => {
    return localStorage.getItem('selectedNav') || ''
  })
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState('')
  const [searchList, setSearchList] = useState(() => {
    const savedSearchList = localStorage.getItem('searchList')
    return savedSearchList ? JSON.parse(savedSearchList) : []
  })

  const navigate = useNavigate()
  const location = useLocation()

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev)
  }, [])

  const handleNav = useCallback(
    (navlink) => {
      navlink === 'Home' ? navigate('/') : navigate(`/${navlink}`)
      setSelectedNav(navlink)
      localStorage.setItem('selectedNav', navlink)
    },
    [navigate]
  )

  const searchByKeyword = (event) => {
    event.preventDefault()

    if (keyword === '' || !keyword) {
      setMessage('검색어를 입력해주세요')
      return
    }

    setSearchList((prevList) => {
      const updatedList = [keyword, ...prevList.filter((k) => k !== keyword)]
      if (updatedList.length > 10) {
        updatedList.pop()
      }
      localStorage.setItem('searchList', JSON.stringify(updatedList))
      return updatedList
    })

    navigate(`/movies?q=${keyword}`)
    setIsSearchOpen(false)
    setKeyword('')
    setMessage('')
  }

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      setSelectedNav('Home')
    } else if (location.pathname === '/movies') {
      setSelectedNav('Movies')
    }
  }, [location.pathname])

  return (
    <div
      className={`${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      } min-h-screen min-w-[350px] relative`}
    >
      <div
        className={`flex justify-between items-center p-1 sm:p-2 h-[120px] ${
          isDarkMode ? '' : 'bg-slate-50'
        }`}
      >
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
          message={message}
          setMessage={setMessage}
          searchList={searchList}
          setSearchList={setSearchList}
        />
      )}

      <Outlet />
    </div>
  )
}

export default AppLayout
