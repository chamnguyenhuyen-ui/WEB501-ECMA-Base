import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Import useNavigate để chuyển hướng

function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Tour nội địa')
  const [active, setActive] = useState(false)

  // Hook để điều hướng sau khi thêm thành công
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()

    // 🛑 Validation cơ bản
    if (!name || !price || !image) {
      toast.error('Vui lòng điền đầy đủ Tên, Giá, và URL Ảnh.')
      return
    }

    const numericPrice = Number(price)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error('Giá phải là một số dương hợp lệ.')
      return
    }

    try {
      // Gửi dữ liệu lên API
      await axios.post('http://localhost:3000/tours', {
        name,
        price: numericPrice, // Đảm bảo giá là kiểu Number
        image,
        category,
        active,
      })
      toast.success('Thêm tour thành công! Đang chuyển hướng...')
      
      // 🚀 Chuyển hướng về trang danh sách (ListPage) sau khi thêm thành công
      navigate('/') 
      
    } catch (error) {
      // Xử lý lỗi từ server
      const errorMessage = error.response?.data?.message || error.message
      toast.error(`Lỗi: ${errorMessage}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          ➕ Thêm Tour Mới
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Tên Tour */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Tour</label>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              type="text"
              id="name"
              placeholder="Nhập tên tour (ví dụ: Du lịch Hạ Long 3 ngày 2 đêm)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
              required
            />
          </div>

          {/* Giá */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
            <input
              value={price}
              onChange={event => setPrice(event.target.value)}
              type="number"
              id="price"
              placeholder="Ví dụ: 5000000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
              required
            />
          </div>

          {/* Ảnh URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Ảnh URL</label>
            <input
              value={image}
              onChange={event => setImage(event.target.value)}
              type="url"
              id="image"
              placeholder="https://example.com/tour.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
              required
            />
          </div>

          {/* Loại Tour */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              id="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer transition duration-150"
            >
              <option value="Tour nội địa">Tour nội địa</option>
              <option value="Tour quốc tế">Tour quốc tế</option>
            </select>
          </div>

          {/* Active checkbox */}
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={e => setActive(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-900">
              Trạng thái (Active/Inactive)
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Thêm Tour
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddPage