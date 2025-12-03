import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Tour nội địa')
  const [active, setActive] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/tours', {
        name,
        price: Number(price),
        image,
        category,
        active
      })
      toast.success('Thêm tour thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Tên Tour</label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Ảnh URL</label>
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
            type="url"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/tour.jpg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Loại</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tour nội địa">Tour nội địa</option>
            <option value="Tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        {/* Active checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
            className="h-4 w-4"
          />
          <label className="font-medium">Hành động</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default AddPage