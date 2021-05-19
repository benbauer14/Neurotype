import axios from 'axios';
import React, { useState, Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//this page is used to test dispatches and store retrieval.


const AboutPage = () => {

  const dispatch = useDispatch()
  const participants = useSelector((store) => store.participants);
  const users = useSelector((store) => store.users);
  const sessions = useSelector((store) => store.sessions);

  const getPart = () => {
    dispatch({type: 'FETCH_PARTICIPANTS'})
  }
  const getRes = () => {
    dispatch({type: 'FETCH_USERS'})
  }
  const getSessions = () => {
    dispatch({type: 'FETCH_SESSIONS'})
  }

  const getUniqueSessions = () => {
    dispatch({type: 'FETCH_UNIQUESESSIONS', payload: {name: "Bob"}})
  }

  const postPart = () => {
    const patient = {
      name: "Bob",
      Gender: "M",
      birthdate: "1/1/2000",
      height: 70,
      weight: 200
    }
    console.log(patient)
    dispatch({type: 'POST_PARTICIPANT', payload: patient})
  }


  const postRes = () => {
    const researcher = {
      email: "Bob@bob.com",
      name: "ben",
      password: "ben",
      role: 'Researcher',
      group_id: 1
    }
    console.log(researcher)
    dispatch({type: 'REGISTER', payload: researcher})
  }

  const postSuprAdm = () => {
    const suprAdm = {
      email: "Super@Super.com",
      name: "super",
      password: "super",
      role: "Super Admin",
      group_id: 1
    }
    console.log(suprAdm)
    dispatch({type: 'REGISTER', payload: suprAdm})
  }

  const postSiteAdm = () => {
    const siteAdm = {
      email: "Site@Site.com",
      name: "site",
      password: "site",
      role: "Site Admin",
      group_id: 1
    }
    console.log(siteAdm)
    dispatch({type: 'REGISTER', payload: siteAdm})
  }

  const putPart = () => {
    const patient = {
      id: 3,
      name: "Bob",
      Gender: "M",
      birthdate: "1/1/2000",
      height: 70,
      weight: 1200
    }
    console.log(patient)
    dispatch({type: 'UPDATE_PARTICIPANT', payload: patient})
  }

  const putRes = () => {
    const researcher = {
      id: 2,
      email: "Bob@bobby.com",
      name: "bob",
      password: "bob",
      role: 'Researcher',
      group_id: 1,
      disabled: false
    }
    console.log(researcher)
    dispatch({type: 'UPDATE_RESEARCHER', payload: researcher})
  }

  const s3POST = () => {
    axios.post('/api/s3upload/uploadToS3', {name: 'test'}).then ((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
    }

  dispatch({type: 'SET_PAGE', payload: "HOME"})
  useEffect(() => {
      dispatch({type: 'SET_PAGE', payload: "ABOUT"})
  }, [])


    return (
      <>
      <div>
        <p>This page is used to test dispatches and store retrieval</p>
        <button onClick={() => getPart()}>Get Participants</button>
        <button onClick={() => postPart()}>Create Participant</button>
        <button onClick={() => putPart()}>Update Participant</button>
        <button onClick={() => postRes()}>Create Researcher</button>
        <button onClick={() => postSuprAdm()}>Create Super Admin</button>
        <button onClick={() => postSiteAdm()}>Create Site Admin</button>
        <button onClick={() => putRes()}>Update Researcher</button>
        <button onClick={() => getRes()}>Get Researchers</button>
        <button onClick={() => getSessions()}>Get Sessions</button>
        <button onClick={() => getUniqueSessions()}>Get Unique Sessions by Patient Name</button>
        <button onClick={() => s3POST()}>POST csv to S3</button>
        {JSON.stringify(participants)}
        {JSON.stringify(users)}
        {JSON.stringify(sessions)}
      </div>
      </>
    );
  
}

export default AboutPage;
