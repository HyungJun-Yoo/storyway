import React from 'react'
import svg from '@/assets/404.svg'

const NotFound = () => {
  return (
    <>
      <div className='flex justify-center'>
        <img src={svg} alt='NotFound' className='w-[800px]' />
      </div>
    </>
  )
}

export default NotFound
