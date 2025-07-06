import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full px-7 max-w-7xl mx-auto">
        {children}
      </main>
      <Toaster position="top-center" closeButton />
    </>
  )
}