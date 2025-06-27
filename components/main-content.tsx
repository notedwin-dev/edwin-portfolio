"use client"

interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="transition-all duration-300">
      {children}
    </main>
  )
}
