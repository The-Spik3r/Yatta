import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  LoginUserRequest,
  RegisterUserRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  AuthResponse,
  MessageResponse,
} from '@yatta/shared'
import { authService } from '../services'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
} as const

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authService.me,
    enabled: !!localStorage.getItem('accessToken'),
    retry: (failureCount, error: any) => {
      if (error?.status === 401) {
        return false
      }
      return failureCount < 2
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: RegisterUserRequest): Promise<AuthResponse> =>
      authService.register(userData),
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      queryClient.setQueryData(authKeys.me(), data.user)

      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginUserRequest): Promise<AuthResponse> =>
      authService.login(credentials),
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      queryClient.setQueryData(authKeys.me(), data.user)

      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

export function useRefreshToken() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (refreshData: RefreshTokenRequest): Promise<AuthResponse> =>
      authService.refreshToken(refreshData),
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      queryClient.setQueryData(authKeys.me(), data.user)

      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (emailData: ForgotPasswordRequest): Promise<MessageResponse> =>
      authService.forgotPassword(emailData),
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (resetData: ResetPasswordRequest): Promise<MessageResponse> =>
      authService.resetPassword(resetData),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await authService.logout()
    },
    onSuccess: () => {
      queryClient.clear()

      queryClient.removeQueries({ queryKey: authKeys.all })
    },
  })
}

export function useIsAuthenticated() {
  const { data: user, isLoading } = useMe()

  return {
    isAuthenticated: !!user && !!localStorage.getItem('accessToken'),
    user,
    isLoading,
  }
}
