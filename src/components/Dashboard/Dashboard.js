import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';


const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "FETCH_SESSION"})
    },[])

    return (
        <>
            (Session Data)
        </>
    )
}

export default Dashboard;