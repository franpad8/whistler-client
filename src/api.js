
import axios from 'axios'

export const authenticate = async (email, password) => {
    try{
        const response = await axios.post(
            'http://localhost:3001/users/login', 
            {
                "email": email,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return { success: true, token: response.data.token }

    } catch(error) {
        let message = 'An error ocurred trying to signing in. Please try later.'
        if (error.response) {
            const status = error.response.status
            if ([401, 422].includes(status)) {
                message = error.response.data.error
            }
        }
        return { success: false, message }
    }
}

export const fetchTimeline = async () => {
    try {
        const response = await axios.get(
            'http://localhost:3001/whistles', 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth')}`
                }
            }
        )
        console.log(response)
        return { success: true, data: response.data }

    } catch(error) {
        let messageError = 'An error ocurred trying to fetch the timeline data'
        if (error.response) {
            const status = error.response.status
            if ([401, 403].includes(status)) {
                messageError = error.response.data.error
            }
        }
        return { success: false, error: messageError }
    }

}

