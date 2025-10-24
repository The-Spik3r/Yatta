const NotFound = () => {
    return (
        <div className="max-w-full text-center py-16">
            <div className="text-8xl mb-8">🤔</div>
            <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-slate-600 mb-6">Página no encontrada</h2>
            <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">
                Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <a
                href="/"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
            >
                Volver al inicio
            </a>
        </div>
    )
}

export default NotFound