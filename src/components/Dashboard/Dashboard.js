import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


const Dashboard = (props) => {
    const dispatch = useDispatch();
    const sessions = useSelector((store) => store.sessions);
    const user = useSelector((store) => store.user);
    

    useEffect(() => {
        if(user.role === 'Super Admin'){
            dispatch({type: "FETCH_SESSIONS"})
        }else{
            console.log(user.group_id)
            dispatch({type: "FETCH_SESSIONGROUP", payload: user.group_id})
        }

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