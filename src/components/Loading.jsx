import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

const Loading = () => {
  return (
    <div className='h-full min-h-screen flex items-center justify-center bg-transparent'>
      <FadeLoader color='#36d7b7' loading={true} size={15} />
    </div>
  )
}

export default Loading
