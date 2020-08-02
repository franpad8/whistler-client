import React from 'react'
import { useEffect, useState, createRef } from 'react'
import { TextField, Button, Icon } from '@material-ui/core';

import { fetchTimeline, addNewWhistle } from '../api'
import Whistle from './Whistle'

export default () => {
    const [ whistleList, setWhistlesList ] = useState([])
    const [ canLoadMore, setCanLoadMore ] = useState(true)
    let newWhistleElemTextField = createRef()


    const onClickAddNewWhistle = async () => {
        const text = newWhistleElemTextField.current.querySelector('textarea').value
        if (!text) {
            alert('Cannot send empty text')
        }

        const { success, data, message }  = await addNewWhistle(text)

        if (!success) {
            alert(message)
            return
        }

        const lastWhistleId = whistleList[whistleList.length - 1].whistleId
        fetchData({ untilId: lastWhistleId })
    }

    async function fetchData({ untilId }={}) {
        const { success, data, error } = await fetchTimeline({ untilId })
        if (!success) {
            alert(error)
            return ''
        }
        if (data.whistles.length === 0) {
            setCanLoadMore(false)
        }
        setWhistlesList(data.whistles)
    }

    async function fetchMoreData() {
        console.log(whistleList)
        const lastWhistleId = whistleList[whistleList.length - 1].whistleId
        const { success, data, error } = await fetchTimeline({ afterId: lastWhistleId })
        if (!success) {
            alert(error)
            return ''
        }
        
        setWhistlesList((current) => {
            return current.concat(data.whistles)
            
        })
    }

    const onWhistleDeleted = () => {
        const lastWhistleId = whistleList[whistleList.length - 1].whistleId
        fetchData({ untilId: lastWhistleId })
    }

    const onClickLoadMoreButton = () => {
        fetchMoreData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
            id="outlined-multiline-static"
            placeholder="What's up?"
            multiline
            rows={4}
            variant="outlined"
            ref={newWhistleElemTextField}
            />
            <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            style={{ marginLeft: '1rem', maxHeight: '2rem' }}
            onClick={onClickAddNewWhistle}
            >
            Send
            </Button>
        </div>
        {whistleList.map(whistle => {
            return (
                <Whistle 
                    key={whistle.whistleId}
                    id={whistle.whistleId}
                    text={whistle.text}
                    creatorName={whistle.creatorId.username}
                    createdAt={whistle.createdAt}
                    onWhistleDeleted={onWhistleDeleted}
                />
            )
        })}
        {
        canLoadMore 
            ?  <Button variant="contained" color="primary" disableElevation onClick={onClickLoadMoreButton}>
                    Load more
                </Button>
            : null
        }
    </div>
}