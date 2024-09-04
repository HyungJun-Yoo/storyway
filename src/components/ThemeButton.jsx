// ThemeButton.jsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store/store'

const ThemeButton = () => {
  const { isDarkMode, toggleDarkMode } = useStore()

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-[40px] h-[40px] rounded-full transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      <FontAwesomeIcon
        icon={isDarkMode ? faSun : faMoon}
        size='lg'
        className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
      />
    </button>
  )
}

export default React.memo(ThemeButton)
