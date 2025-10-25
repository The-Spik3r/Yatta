import { z } from 'zod';
export declare const registerUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    token: string;
}, {
    password: string;
    token: string;
}>;
export declare const userResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    lastLogin: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    id: number;
    emailVerified: boolean;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
}, {
    name: string;
    email: string;
    id: number;
    emailVerified: boolean;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
}>;
export declare const authResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        email: z.ZodString;
        emailVerified: z.ZodBoolean;
        lastLogin: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        id: number;
        emailVerified: boolean;
        lastLogin: string | null;
        createdAt: string;
        updatedAt: string;
    }, {
        name: string;
        email: string;
        id: number;
        emailVerified: boolean;
        lastLogin: string | null;
        createdAt: string;
        updatedAt: string;
    }>;
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: {
        name: string;
        email: string;
        id: number;
        emailVerified: boolean;
        lastLogin: string | null;
        createdAt: string;
        updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
}, {
    user: {
        name: string;
        email: string;
        id: number;
        emailVerified: boolean;
        lastLogin: string | null;
        createdAt: string;
        updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare const messageResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export declare const errorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    details: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    error: string;
    details?: any[] | undefined;
}, {
    error: string;
    details?: any[] | undefined;
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export type RegisterUserRequest = z.infer<typeof registerUserSchema>;
export type LoginUserRequest = z.infer<typeof loginUserSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;
