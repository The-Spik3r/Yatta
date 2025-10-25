import {
  LoginUserRequest,
  RegisterUserRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  AuthResponse,
  UserResponse,
  MessageResponse,
} from '@yatta/shared'
import { apiFetch, API_ENDPOINTS } from './api'

export const authService = {
  register: async (userData: RegisterUserRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  login: async (credentials: LoginUserRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  refreshToken: async (
    refreshData: RefreshTokenRequest
  ): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      body: JSON.stringify(refreshData),
    })
  },

  forgotPassword: async (
    emailData: ForgotPasswordRequest
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(emailData),
    })
  },

  resetPassword: async (
    resetData: ResetPasswordRequest
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(resetData),
    })
  },

  me: async (): Promise<UserResponse> => {
    return apiFetch<UserResponse>(API_ENDPOINTS.AUTH.ME)
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },
}
