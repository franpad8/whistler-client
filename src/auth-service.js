import { authenticate } from './api'


export const handleAuthentication = async (email, password) => {
    const response = await authenticate(email, password)
    return response
}

// export const handleLogout = () => {
//     localStorage.removeItem('auth')
// }

// // export const getAuthToken = () => {
// //     const token = localStorage.getItem('auth')
// //     return token
// // }

// // export const isLoggedIn = () => {
// //     return localStorage.getItem('auth')
// // }
