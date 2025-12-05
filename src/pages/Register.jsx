import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom' // Import Link và useNavigate

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate() // Khởi tạo hook chuyển hướng

  const handleSubmit = async event => {
    event.preventDefault()

    if (!email || !password) {
      toast.error('Vui lòng điền đầy đủ Email và Mật khẩu.')
      return
    }

    try {
      await axios.post('http://localhost:3000/register', {
        email, 
        password,
      })
      toast.success('Đăng ký thành công! Đang chuyển đến trang Đăng Nhập...')
      
      // Chuyển hướng người dùng sang trang Đăng Nhập sau khi đăng ký thành công
      navigate('/login') 

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(`Đăng ký thất bại: ${errorMessage}`)
    }
  }

  return (
    // ➡️ ĐÃ SỬA: Bỏ items-center và dùng mt-20 để đẩy form lên
    <div className="flex justify-center mt-20 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl h-fit">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          📝 Đăng Ký Tài Khoản
        </h1>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              type="email"
              id="email"
              placeholder="nhap@email.com"
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              id="password"
              placeholder="********"
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
            />
          </div>

          {/* Nút Đăng Ký */}
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
          >
            Đăng Ký
          </button>
        </form>
        
        {/* Liên kết Đăng Nhập */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage