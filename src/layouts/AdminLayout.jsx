import { Navigate, Outlet } from "react-router-dom"

function AdminLayout() {
    // check token (hoac user)
    const token = localStorage.getItem('token')

    if (!token) return <Navigate to={'/login'} />
    return (
        <div>
            AdminLayout
            {/*slot*/}
            <Outlet />
        </div>
    )
}
export default AdminLayout