import { Button } from "@/components/ui/button"
import { Bell, ChevronDown, ArrowRight } from "lucide-react"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex">
            <aside className="w-16 bg-white flex flex-col items-center py-6 z-20 relative border-r border-black">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors mb-auto">
                    <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                <div className="flex flex-col gap-6">
                    <a href="#" className="text-gray-800 hover:text-red-600 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-red-700 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126.742a12.99 12.99 0 0 0-2.84-.133c-1.235.07-2.25.437-2.939 1.061-.654.593-1.007 1.37-.965 2.126.04.718.446 1.364 1.144 1.817.663.43 1.519.62 2.407.537 1.346-.078 2.36-.553 3.014-1.414.52-.685.86-1.56.983-2.595l.056-.482.503.095c.943.178 1.72.635 2.246 1.318.52.676.832 1.544.902 2.513.105 1.454-.265 3.16-1.774 4.658-1.713 1.702-3.816 2.39-6.844 2.413z" />
                        </svg>
                    </a>
                </div>
            </aside>

            <div className="absolute left-16 top-0 bottom-0 w-[600px] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-full bg-red-600" style={{
                    clipPath: 'ellipse(80% 100% at 0% 50%)'
                }}>
                </div>
            </div>

            <div className="flex-1 relative z-10">
                <div className="absolute top-6 right-8">
                    <Button
                        variant="outline"
                        className="rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-800"
                    >
                        Sign Up Free
                    </Button>
                </div>

                <div className="flex items-center h-full px-16 py-12 gap-16">
                    <div className="flex-1 max-w-xl">
                        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                            Yatta.study<br />Track Your Progress
                        </h1>
                        <p className="text-lg text-red-100 mb-8 leading-relaxed max-w-md">
                            A minimalist web app that helps students track and celebrate their daily study progress with a clean, Japanese-inspired design 🌸
                        </p>
                        <Button className="bg-white hover:bg-gray-100 text-red-600 rounded-full px-8 py-6 text-base font-medium">
                            Start Studying
                        </Button>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute left-[-120px] top-20 bg-white rounded-2xl shadow-md p-4 w-44 rotate-[-10deg] hover:rotate-0 transition-transform border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <svg className="w-7 h-7 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">study session</p>
                        </div>

                        <div className="absolute left-[-80px] bottom-32 bg-white rounded-2xl shadow-md p-4 w-44 rotate-[8deg] hover:rotate-0 transition-transform border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-7 h-7 text-red-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">track progress</p>
                        </div>

                        <div className="absolute left-[-60px] bottom-[-20px] bg-white rounded-2xl shadow-md p-4 w-36 rotate-[-15deg] hover:rotate-0 transition-transform border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">📊</div>
                                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">view stats</p>
                        </div>
                        <div className="bg-white rounded-[3rem] shadow-md p-6 w-[360px] border-[4px] border-gray-100 relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        L
                                    </div>
                                    <span className="font-semibold text-gray-800">Student</span>
                                </div>
                                <Bell className="w-5 h-5 text-gray-600" />
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">Study streak</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-4xl font-bold text-gray-900">12 days</p>
                                    <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
                                        Week <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-6">
                                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={`row1-${i}`} className={`h-10 rounded-lg ${i <= 3 ? "bg-red-600" : "bg-gray-100"}`} />
                                ))}
                                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                                    <div
                                        key={`row2-${i}`}
                                        className={`h-10 rounded-lg ${i === 1 || i === 2 ? "bg-red-300" : i === 4 || i === 5 ? "bg-red-400" : "bg-gray-100"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                                            <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-800">Math homework</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                                            <svg
                                                className="w-6 h-6 text-red-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12,6 12,12 16,14" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-800">Study session 2h</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <div className="w-8 h-8 bg-red-600 rounded-full" />
                                    <div className="w-8 h-8 bg-red-300 rounded-full" />
                                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                    <div className="w-8 h-8 bg-gray-100 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
