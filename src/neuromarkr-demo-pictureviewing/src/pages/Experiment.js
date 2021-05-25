import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { fromEvent } from "rxjs";
import { skipUntil, takeUntil, reduce } from "rxjs/operators";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";
import studyData from "../studies/pictureviewing";

import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";



const study = window.lab.util.fromObject(studyData)

export default function Experiment() {

  const session = useSelector(store => store.currentsession)
const participant = useSelector((store) => store.currentsession.participant_name)

  const dispatch = useDispatch();

  const { user } = useNotion();
  const [brainwaves, setBrainwaves] = useState(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  async function s3POST (data) {
    axios.post('/api/s3upload/uploadToS3', data).then ((response) => {
      console.log (response.data.message)
      const eegdata = {
        json: data,
        session_id: session.id,
        run: response.data.message
      }
      dispatch({type: 'POST_BRAINWAVES', payload: eegdata });
    }).catch((err) => {
      console.log(err)
    })
    }

  useEffect(() => {
    study.run();

    const subscription = notion
      .brainwaves("raw")
      .pipe(
        skipUntil(fromEvent(study,"run")),
        takeUntil(fromEvent(study,"end")),
        reduce((acc, brainwaves) => {
          return [...acc, brainwaves];
        },[])
      )
      .subscribe((brainwaves) => {
        setBrainwaves(brainwaves);
        // all brainwave data from the task below, should be sent to database
        // console.log(JSON.stringify(brainwaves, null, 2));
        s3POST(brainwaves)
        return(<button>Return to Activities Page</button>)
      })
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <main className="main-container">
      {user ? <Nav /> : null}

      <div className="container fullscreen" data-labjs-section="main">
        <main className="content-vertical-center content-horizontal-center">
          <div>
            <h2>Loading Experiment</h2>
            <p>
              The experiment is loading and should start in a few
              seconds.
            </p>
          </div>
        </main>
      </div>

    </main>
  );
}
