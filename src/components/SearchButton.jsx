import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store/store'

const SearchButton = ({ isSearchOpen, onClick }) => {
  const { isDarkMode, toggleDarkMode } = useStore()

  return (
    <button
      onClick={onClick}
      className={`w-[40px] h-[40px] border rounded-full ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      <FontAwesomeIcon icon={isSearchOpen ? faTimes : faSearch} />
    </button>
  )
}

export default React.memo(SearchButton)
