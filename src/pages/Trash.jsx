import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TrashEmailList from '../components/TrashEmailList'
import TrashEmailDetail from '../components/TrashEmailDetail'

const Trash = () => {
  return (
    <div>
    {/* Nested Routes for Inbox */}
    <Routes>
      <Route path="/" element={<TrashEmailList />} />
      <Route path=":id" element={<TrashEmailDetail />} />
    </Routes>
  </div>
  )
}

export default Trash