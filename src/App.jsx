import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>

      {/* login route */}
      <Route path="/login" element={<LoginPage />} />

    </Routes>
  )
}

export default App
