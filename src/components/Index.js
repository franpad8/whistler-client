import React from 'react'
import { useEffect, useState, createRef } from 'react'
import { TextField, Button, Icon } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchTimeline, addNewWhistle, deleteWhistle } from '../api'
import Whistle from './Whistle'

export default () => {
    const [ whistleList, setWhistlesList ] = useState([])
    const [ canLoadMore, setCanLoadMore ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ loadingMore, setLoadingMore ] = useState(false)
    let newWhistleElemTextField = createRef()


    const onClickAddNewWhistle = async () => {
        setLoading(true)
        setCanLoadMore(false)
        const textAreaElem = newWhistleElemTextField.current.querySelector('textarea')
        const text = textAreaElem.value
        if (!text) {
            alert('Cannot send empty text')
        }

        const { success, data, message }  = await addNewWhistle(text)

        if (success) {
            const lastWhistle = whistleList[whistleList.length - 1]
            let lastWhistleId
            if (lastWhistle) {
                lastWhistleId = lastWhistle.whistleId
            }
            fetchData({ untilId: lastWhistleId })
            textAreaElem.value = ''

        } else {
            alert(message)
        }
    }

    async function fetchData({ untilId }={}) {
        const { success, data, error } = await fetchTimeline({ untilId })
        if (success) {
            if (data.whistles.length === 0) {
                setCanLoadMore(false)
            } else {
                setCanLoadMore(true)
            }
            setWhistlesList(data.whistles)
        } else {
            alert(error)
        }
        
        setLoading(false)
    }

    async function fetchMoreData() {
        setLoadingMore(true)
        const lastWhistleId = whistleList[whistleList.length - 1].whistleId
        const { success, data, error } = await fetchTimeline({ afterId: lastWhistleId })
        if (success) {
            setWhistlesList((current) => {
                return current.concat(data.whistles)      
            })
            if (data.whistles.length === 0) {
                setCanLoadMore(false)
            } else {
                setCanLoadMore(true)
            }

        } else {       
            alert(error)
        }
        setLoadingMore(false)
    }

    const onWhistleDeleted = async (id) => {
        setLoading(true)
        setCanLoadMore(false)

        const { success, error } = await deleteWhistle(id)
        if (success) {
            const lastWhistleId = whistleList[whistleList.length - 1].whistleId
            fetchData({ untilId: lastWhistleId })
        } else {
            alert(error)
            setLoading(false)
            setCanLoadMore(true)
        }   
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

        {
        loading 
            ?  <CircularProgress style={{ marginTop: '2rem' }} color="inherit" size="1.5rem"/>
            :  whistleList.map(whistle => {
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
            })
        }
        {
        canLoadMore 
            ?  <Button style={{ minWidth: '7.5rem' }} variant="contained" color="primary" disableElevation onClick={onClickLoadMoreButton}>
                    {
                        loadingMore 
                            ? <CircularProgress color="inherit" size="1.5rem"/>
                            : 'Load more'
                    }
                </Button>
            : null
        }
    </div>
}