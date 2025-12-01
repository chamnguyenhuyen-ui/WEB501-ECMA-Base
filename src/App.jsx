import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import List from './pages/List'

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
            <a href="/list" className="hover:text-gray-200">
              Danh sách
            </a>
            <a href="#" className="hover:text-gray-200">
              Thêm mới
            </a>
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
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>

        <Routes>
          <Route path="/list" element={<List />} />
        </Routes>
      </div>

      <Toaster />
    </>
  )
}

export default App