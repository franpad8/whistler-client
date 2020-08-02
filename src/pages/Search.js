import React from 'react'
import { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string'

import { fetchWhistlesByText, deleteWhistle } from '../api'
import Whistle from '../components/Whistle'

export default (props) => {
    const [ whistleList, setWhistlesList ] = useState([])
    const [ loading, setLoading ] = useState(true)


    async function fetchData() {
        const params = queryString.parse(props.location.search)
        console.log(params)
        const { success, data, error } = await fetchWhistlesByText(params.text)
        if (success) {
            setWhistlesList(data.whistles)
        } else {
            alert(error)
        }
        
        setLoading(false)
    }

    const onWhistleDeleted = async (id) => {
        setLoading(true)

        const { success, error } = await deleteWhistle(id)
        if (success) {
            const lastWhistleId = whistleList[whistleList.length - 1].whistleId
            fetchData({ untilId: lastWhistleId })
        } else {
            alert(error)
            setLoading(false)
        }   
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <div>
        {
        loading 
            ?  <CircularProgress style={{ marginTop: '2rem' }} color="inherit" size="1.5rem"/>
            :  whistleList.map(whistle => {
                const creator = whistle.creatorId
                return (
                    <Whistle 
                        key={whistle.whistleId}
                        id={whistle.whistleId}
                        text={whistle.text}
                        creatorName={creator ? creator.username : 'Deleted User'}
                        createdAt={whistle.createdAt}
                        onWhistleDeleted={onWhistleDeleted}
                    />
                )
            })
        }
    </div>
}