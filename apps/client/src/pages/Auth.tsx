import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    loginUserSchema,
    registerUserSchema,
    type LoginUserRequest,
    type RegisterUserRequest,
} from '@yatta/shared'
import { useLogin, useRegister } from '@/hooks'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)

    const [loginData, setLoginData] = useState<LoginUserRequest>({
        email: '',
        password: ''
    })

    const [registerData, setRegisterData] = useState<RegisterUserRequest>({
        name: '',
        email: '',
        password: ''
    })

    const loginMutation = useLogin()
    const registerMutation = useRegister()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const validatedData = loginUserSchema.parse(loginData)
            await loginMutation.mutateAsync(validatedData)
            alert('Login successful!')
        } catch (err: any) {
            console.error('Login error:', err)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const validatedData = registerUserSchema.parse(registerData)
            await registerMutation.mutateAsync(validatedData)
            alert('Registration successful!')
        } catch (err: any) {
            console.error('Register error:', err)
        }
    }

    const isLoading = loginMutation.isPending || registerMutation.isPending

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loginMutation.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{loginMutation.error.message}</p>
                        </div>
                    )}

                    {registerMutation.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{registerMutation.error.message}</p>
                        </div>
                    )}

                    {isLogin ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={registerData.name}
                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}