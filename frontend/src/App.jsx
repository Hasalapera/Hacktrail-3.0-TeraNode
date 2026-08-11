import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
function App() {

  return (
      <Routes>
        {/* Root path eka login ekata redirect karanawa */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Pages routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Match wenne nathi ona url ekakata 404 page eka pennanawa */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
