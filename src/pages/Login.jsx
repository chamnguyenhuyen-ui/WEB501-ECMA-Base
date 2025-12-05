import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!email || !password) {
      toast.error('Vui lòng điền đầy đủ Email và Mật khẩu.')
      return
    }

    try {
      await axios.post('http://localhost:3000/login', {
        email, 
        password,
      })
      
      toast.success('Đăng nhập thành công! Đang chuyển hướng...')
      // Chuyển hướng đến /danh-sach
      navigate('/danh-sach') 

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(`Đăng nhập thất bại: ${errorMessage}`)
    }
  }

  return (
    <div className="flex justify-center mt-32 bg-gray-50"> 
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          👋 Đăng Nhập
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </div>

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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage