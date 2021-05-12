import React, { useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//this page is used to test dispatches and store retrieval.


const AboutPage = () => {

  const dispatch = useDispatch()
  const participants = useSelector((store) => store.participants);

  const getPart = () => {
    dispatch({type: 'FETCH_PARTICIPANTS'})
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
      name: "bob",
      password: "bob",
      role: 'Researcher',
      group_id: 1
    }
    console.log(researcher)
    dispatch({type: 'REGISTER', payload: researcher})
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

    return (
      <>
      <div>
        <p>This page is used to test dispatches and store retrieval</p>
        <button onClick={() => getPart()}>Get em</button>
        <button onClick={() => postPart()}>Post em</button>
        <button onClick={() => putPart()}>Update em</button>
        <button onClick={() => postRes()}>Update em</button>

        {JSON.stringify(participants)}

      </div>
      </>
    );
  
}

export default AboutPage;
