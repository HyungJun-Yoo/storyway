import Loading from '@/components/Loading'
import { useMovieVideosQuery } from '@/hooks/useMovieVideos'
import React from 'react'

const MovieVideo = ({ id, title }) => {
  const { data: videoData, isLoading } = useMovieVideosQuery(id)

  if (isLoading) return <Loading />

  if (!videoData[0]?.key) return

  return (
    <div className='fixed w-[800px] h-[2000px] z-50'>
      <iframe
        className='w-full'
        src={`https://www.youtube.com/embed/${videoData[0].key}?autoplay=1&mute=1`}
        title={videoData[0].name}
        allowFullScreen
      />

      <div>{title}</div>
    </div>
  )
}

export default MovieVideo
