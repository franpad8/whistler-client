import React from 'react'
import { useEffect, useState } from 'react'
import { fetchTimeline } from '../api'
import Whistle from './Whistle'

export default () => {
    const [ whistleList, setWhistlesList ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const { success, data, error } = await fetchTimeline()
            if (!success) {
                alert(error)
                return ''
            }
            console.log(data.whistles)
            setWhistlesList(data.whistles)
        }
        fetchData()
    }, [])

    return <div>
        {whistleList.map(whistle => {
            return <Whistle key={whistle.whistleId} text={whistle.text} creatorName={whistle.creatorId.username} createdAt={whistle.createdAt}/>
        })}
    </div>
}