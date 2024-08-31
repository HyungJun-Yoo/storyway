import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/layout/AppLayout'
import Home from '@/pages/Home/Home'
import Movie from '@/pages/Movie/Movie'
import MoiveDetail from '@/pages/MovieDetail/MovieDetail'
import NotFound from '@/pages/NotFound/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path='/movies'>
          <Route index element={<Movie />} />
          <Route path=':id' element={<MoiveDetail />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
