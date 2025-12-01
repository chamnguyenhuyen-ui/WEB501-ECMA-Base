import toast from 'react-hot-toast'

function List() {
  const handleDelete = () => {
    toast.success('Delete successfull')
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <button onClick={handleDelete}>Delete</button>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                First
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Last
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Handle
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">1</td>
              <td className="px-4 py-2 border border-gray-300">Mark</td>
              <td className="px-4 py-2 border border-gray-300">Otto</td>
              <td className="px-4 py-2 border border-gray-300">@mdo</td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">2</td>
              <td className="px-4 py-2 border border-gray-300">Jacob</td>
              <td className="px-4 py-2 border border-gray-300">Thornton</td>
              <td className="px-4 py-2 border border-gray-300">@fat</td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">3</td>
              <td className="px-4 py-2 border border-gray-300" colSpan={2}>
                Larry the Bird
              </td>
              <td className="px-4 py-2 border border-gray-300">@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List