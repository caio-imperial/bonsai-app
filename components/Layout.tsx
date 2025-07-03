// components/Layout.tsx
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-auto col-md-3 col-xl-2 px-0">
                    <Sidebar />
                </div>
            <div className="col vh-100 overflow-auto px-4 py-3">
                {children}
            </div>
            </div>
        </div>
    )
}
