
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
        let defaultMessageError = 'An error ocurred trying to signing in. Please try later.'
        return buildErrorResponse(error, [401, 422], defaultMessageError)
    }
}

export const addNewWhistle = async text => {
    try{
        const response = await axios.post(
            'http://localhost:3001/whistles/', 
            {
                text
            },
            {
                headers: buildHeaderWithToken()
            }
        )
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred trying to adding the whistle. Please try later.'
        return buildErrorResponse(error, [401, 422], defaultMessageError)
    }
}

export const deleteWhistle = async id => {
    try{
        const response = await axios.delete(
            `http://localhost:3001/whistles/${id}`, 
            {
                headers: buildHeaderWithToken()
            }
        )
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred deleting the whistle. Please try later.'
        return buildErrorResponse(error, [401, 403, 404, 422], defaultMessageError)
    }
}


export const fetchTimeline = async ({ afterId, untilId } = {}) => {
    try {
        let url = 'http://localhost:3001/whistles'
        if (untilId) {
            url = `${url}?untilId=${untilId}`
        } 
        else if (afterId) {
            url = `${url}?afterId=${afterId}`
        } 
        const response = await axios.get(
            url, 
            {
                headers: buildHeaderWithToken()
            }
        )
        console.log(response)
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred trying to fetch the timeline data'
        return buildErrorResponse(error, [401, 403], defaultMessageError)
    }

}

export const fetchWhistlesByText = async (searchText) => {
    try {
        let url = `http://localhost:3001/whistles/search?text=${searchText}` 
        const response = await axios.get(
            url, 
            {
                headers: buildHeaderWithToken()
            }
        )
        console.log(response)
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred trying to fetch the timeline data'
        return buildErrorResponse(error, [401, 403], defaultMessageError)
    }

}

export const unfollowUser = async (id) => {
    try {
        let url = `http://localhost:3001/users/unfollow/${id}` 
        const response = await axios.put(
            url,
            {},
            {
                headers: buildHeaderWithToken()
            }
        )
        console.log(response)
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred trying to unfollow the user'
        return buildErrorResponse(error, [400, 401, 422], defaultMessageError)
    }
}

export const followUser = async (id) => {
    try {
        let url = `http://localhost:3001/users/follow/${id}` 
        const response = await axios.put(
            url,
            {},
            {
                headers: buildHeaderWithToken()
            }
        )
        console.log(response)
        return { success: true, data: response.data }

    } catch(error) {
        let defaultMessageError = 'An error ocurred trying to follow the user'
        return buildErrorResponse(error, [400, 401, 422], defaultMessageError)
    }
}

const buildHeaderWithToken = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`
})

function buildErrorResponse(error, expectedErrors, messageError) {
        if (error.response) {
            const status = error.response.status
            if (expectedErrors.includes(status)) {
                messageError = error.response.data.error
            }
        }
        return { success: false, error: messageError }
}
