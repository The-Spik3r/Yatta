export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface CreateUserRequest {
    name: string;
    email: string;
}
export interface HealthCheck {
    status: 'healthy' | 'unhealthy';
    uptime: number;
    timestamp: string;
}
export type Status = 'loading' | 'success' | 'error' | 'idle';
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
