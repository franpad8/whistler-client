import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchWhistlesByText, deleteWhistle, followUser, unfollowUser } from '../api'
import Whistle from '../components/Whistle'

export default ({ searchText }) => {
    const [ whistleList, setWhistlesList ] = useState([])
    const [ loading, setLoading ] = useState(true)


    const fetchData = useCallback(async () => {
        const { success, data, error } = await fetchWhistlesByText(searchText)
        if (success) {
            setWhistlesList(data.whistles)
        } else {
            alert(error)
        }
        
        setLoading(false)
    }, [searchText])

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

    const onUnfollow = async (id) => {
        setLoading(true)

        const { success, error } = await unfollowUser(id)
        if (success) {
            const lastWhistleId = whistleList[whistleList.length - 1].whistleId
            fetchData({ untilId: lastWhistleId })
        } else {
            alert(error)
            setLoading(false)
        }   
    }

    const onFollow = async (id) => {
        setLoading(true)

        const { success, error } = await followUser(id)
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
    }, [searchText, fetchData])

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
                        onFollow={onFollow}
                        onUnfollow={onUnfollow}
                        creatorId={creator ? creator._id: null}
                    />
                )
            })
        }
    </div>
}