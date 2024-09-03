import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/')}
      className='text-red-700 font-mono font-bold text-[30px] sm:text-[40px] cursor-pointer ml-1 sm:ml-4'
    >
      STORYWAY
    </div>
  )
}

export default React.memo(Logo)
