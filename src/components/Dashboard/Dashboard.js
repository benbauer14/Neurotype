import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


const Dashboard = (props) => {
    const dispatch = useDispatch();
    const sessions = useSelector((store) => store.sessions);
    

    useEffect(() => {
        dispatch({type: "FETCH_SESSIONS"})
        dispatch({type: 'SET_PAGE', payload: "DASHBOARD"})
    },[])


    console.log(props)

    return (
        <>
            {JSON.stringify(sessions)}
        </>
    )
}

export default Dashboard;