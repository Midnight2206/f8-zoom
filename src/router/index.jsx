import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import CloneMethods from '../pages/CloneMethods/CloneMethods.jsx'

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="clonemethods" element={<CloneMethods />} />
        <Route path="/" element={<CloneMethods />} />

      </Routes>
    </Router>
  )
}
export default AppRouter