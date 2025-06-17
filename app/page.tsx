"use client"
import dynamic from 'next/dynamic';

const ScrollingExperience = dynamic(() => import('@/components/ScrollingExperience'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function Home() {
  return (
    <>
      <main className="relative">
        <ScrollingExperience />
      </main>
    </>
  );
}
