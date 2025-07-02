// components/Layout.tsx
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar>
                <main className="container py-4">
                    {children}
                </main>
            </Sidebar>
        </>
    )
}
