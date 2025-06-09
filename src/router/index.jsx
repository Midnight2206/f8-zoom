import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ArrayMethods from '../pages/ArrayMethods'

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArrayMethods />} />
        <Route path="arraymethods" element={<ArrayMethods />} />
      </Routes>
    </Router>
  )
}
export default AppRouter