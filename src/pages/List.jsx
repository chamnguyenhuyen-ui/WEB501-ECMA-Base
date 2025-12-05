import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

// Component SVG cho icon Thùng rác (Trash)
const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 1.956.16 6.75l1.91 18.067L18.16 1.956.16 6.75l1.91 18.067M5.467 5.75l-1.071 18.067h14.788L18.533 5.75H5.467Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 5.25v-1.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.5m-3 0h-3"/>
  </svg>
);

// Component SVG cho icon Chỉnh sửa (Edit)
const EditIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Zm0 0-3.5-3.5" />
  </svg>
);

// Component SVG cho icon Thêm (Plus)
const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);


// Hàm tiện ích định dạng tiền tệ
const formatCurrency = (price) => {
  if (price === undefined || price === null) return '—';
  // Định dạng theo chuẩn VNĐ (VD: 1.000.000 ₫)
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

function ListPage() {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // Load dữ liệu
  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (error) {
        console.error('Lỗi tải danh sách:', error);
        toast.error('Lỗi khi tải danh sách tour. Vui lòng kiểm tra server.')
      } finally {
        setIsLoading(false);
      }
    }
    getTours()
  }, [])

  // Xử lý xóa tour
  const handleDelete = async id => {
    try {
      // 🛑 Lưu ý: Cần thay thế window.confirm() bằng một Modal UI tùy chỉnh
      if (window.confirm('Bạn có chắc chắn muốn xóa tour này không? Hành động này không thể hoàn tác.')) {
        await axios.delete('http://localhost:3000/tours/' + id)
        setTours(tours.filter(tour => tour.id !== id))
        toast.success('Đã xóa tour thành công.')
      }
    } catch (error) {
      console.error('Lỗi xóa tour:', error);
      toast.error('Lỗi khi xóa tour. Vui lòng thử lại.')
    }
  }

  // Hiển thị trạng thái đang tải
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* Header & Nút Thêm Mới */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Danh sách Tour 🗺️
        </h1>
        <Link 
          to="/them-moi" 
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
        >
          <PlusIcon className="w-5 h-5"/> Thêm Tour Mới
        </Link>
      </div>

      {tours.length === 0 ? (
        // Hiển thị khi không có dữ liệu
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-xl text-gray-600 font-semibold">
            Không tìm thấy dữ liệu tour nào.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Hãy nhấn "Thêm Tour Mới" để bắt đầu.
          </p>
        </div>
      ) : (
        // Bảng hiển thị dữ liệu (Responsive Table)
        <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Ảnh</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên Tour</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">Thao tác</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {tours.map(tour => (
                <tr key={tour.id} className="hover:bg-blue-50/50 transition duration-150">
                  
                  {/* ID */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-gray-900">#{tour.id}</td>
                  
                  {/* Ảnh */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    {tour.image ? (
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-16 h-12 object-cover rounded-md shadow-sm border border-gray-100"
                        // Fallback cho ảnh lỗi
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x48/CCCCCC/333333?text=N/A" }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Không ảnh</span>
                    )}
                  </td>
                  
                  {/* Tên Tour */}
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                    {tour.name}
                  </td>
                  
                  {/* Giá */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-green-700 font-semibold">
                    {formatCurrency(tour.price)}
                  </td>
                  
                  {/* Loại */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">
                    {tour.category || '—'}
                  </td>
                  
                  {/* Trạng thái (Active/Inactive) */}
                  <td className="px-6 py-3 whitespace-nowrap text-center">
                    <span 
                        className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
                            tour.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {tour.active ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </td>
                  
                  {/* Xử lý (Sửa/Xóa) */}
                  <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center gap-4">
                      {/* Nút Sửa */}
                      <Link 
                        className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110" 
                        to={`/edit/${tour.id}`}
                        title="Chỉnh sửa Tour"
                      >
                        <EditIcon />
                      </Link>
                      
                      {/* Nút Xóa */}
                      <button
                        className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                        onClick={() => handleDelete(tour.id)}
                        title="Xóa Tour"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListPage