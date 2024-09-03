import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

const Loading = () => {
  return (
    <div className='h-full min-h-screen flex items-center justify-center'>
      <FadeLoader color='#36d7b7' loading={true} size={15} />
    </div>
  )
}

export default Loading
