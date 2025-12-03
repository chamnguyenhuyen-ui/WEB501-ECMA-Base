import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function ListPage() {
  const [tours, setTours] = useState([])

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getTours()
  }, [])

  const handleDelete = async id => {
    try {
      if (confirm('Tao muon xoa tour nay')) {
        await axios.delete('http://localhost:3000/tours/' + id)
        setTours(tours.filter(tour => tour.id !== id))
        toast.success('Ok tao da xoa duoc roi')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hình Ảnh
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên Tour
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Loại</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Hành động</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Xử lý</th>
            </tr>
          </thead>

          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.image ? (
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price?.toLocaleString('vi-VN')}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.category || '—'}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.active ? 'Active' : 'Inactive'}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex gap-3">
                    <Link className="text-blue-600 underline" to={`/edit/${tour.id}`}>
                      Sửa
                    </Link>
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleDelete(tour.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListPage