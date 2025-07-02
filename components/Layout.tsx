// components/Layout.tsx
import NavBar from './NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <main className="container py-4">
                {children}
            </main>
        </>
    )
}
