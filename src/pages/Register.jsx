import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // handleChange
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/register', {
        email, // es6
        password,
      })
      toast.success('them thanh cong')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Register mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            password
          </label>
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default RegisterPage