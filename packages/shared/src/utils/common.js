/**
 * Utility function to format dates consistently across the application
 */
export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
/**
 * Utility function to validate email addresses
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Utility function to generate random IDs
 */
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
/**
 * Utility function to debounce function calls
 */
export function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Utility function to capitalize first letter of a string
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
 * Utility function for sleep/delay
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
