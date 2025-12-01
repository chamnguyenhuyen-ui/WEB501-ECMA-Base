import { Toaster } from 'react-hot-toast'
import { Routes, Route, Link } from 'react-router-dom'
import ListPage from './pages/List'
import AddPage from './pages/Add'

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-gray-200">
              Trang chủ
            </a>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-gray-200">
              Đăng nhập
            </a>
            <a href="#" className="hover:text-gray-200">
              Đăng ký
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  )
}

export default App