import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostView from './pages/PostView'
import Login from './pages/Login'
import Editor from './pages/Editor'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-paper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
