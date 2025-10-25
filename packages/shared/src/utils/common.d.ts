/**
 * Utility function to format dates consistently across the application
 */
export declare function formatDate(date: Date | string): string;
/**
 * Utility function to validate email addresses
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Utility function to generate random IDs
 */
export declare function generateId(): string;
/**
 * Utility function to debounce function calls
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Utility function to capitalize first letter of a string
 */
export declare function capitalize(str: string): string;
/**
 * Utility function for sleep/delay
 */
export declare function sleep(ms: number): Promise<void>;
