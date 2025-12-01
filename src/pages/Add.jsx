import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Tour noi dia')

  // handleChange
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/tours', {
        name, // es6
        price: Number(price),
        category: category,
      })
      toast.success('them thanh cong')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Price
          </label>
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="number"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select */}
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tour noi dia">Tour noi dia</option>
            <option value="Tour quoc te">Tour quoc te</option>
          </select>
        </div>

        {/* Submit button */}
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