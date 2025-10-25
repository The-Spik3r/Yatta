import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryProvider } from './providers'
import Layout from './components/Layout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

function App() {
    return (
        <QueryProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </QueryProvider>
    )
} export default App