import axios from 'axios';
import React,{useState, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import MySurvey from '../surveyTypes/surveytypeone';
import './surveyone.css';

const SurveyOne = ()=> {
    const [showPage, setShowPage] = useState(true); // refreshing page will update to True
    const session = useSelector(store => store.currentsession)
    const participant = useSelector((store) => store.currentsession.participant_name)

    async function s3POST (data) {
        axios.post('/api/s3upload/uploadToS3', data).then ((response) => {
          console.log (response.data.message)
          const surveydata = {
            jsondata: data,
            session_id: session.id,
            csvlocation: response.data.message
          }
          dispatch({type: 'POST_SURVEY', payload: surveydata})
        }).catch((err) => {
          console.log(err)
        })
        }

        const parseData = (data) => {
            // const data = {
            //   key1: "value1",
            //   key2: "value2",
            //   key3: {key30: "value3-1",
            //         key31: "value3-2",
            //         key32: {key320: "value32-1"}},
            //   key4: "value4"
            // }
            const newObject = {}
            const keysFromData = (Object.keys(data))
            for(let i=0; i < keysFromData.length; i++){
              if(typeof(data[keysFromData[i]]) === 'object'){
                let keysFromSubObject = Object.keys(data[keysFromData[i]])
                for(let j=0; j < keysFromSubObject.length; j++){
                  if(typeof(data[keysFromData[i]][keysFromSubObject[j]]) === 'object'){
                    let keysFromSubSubObject = Object.keys(data[keysFromData[i]][keysFromSubObject[j]])
                    for(let k=0; k < keysFromSubSubObject.length; k++){
                      const newKey = keysFromData[i] + " " + keysFromSubObject[j] + " " + keysFromSubSubObject[k]
                      newObject[newKey] = data[keysFromData[i]][keysFromSubObject[j]][keysFromSubSubObject[k]]
                    }
                  }else{
                  const newKey = keysFromData[i] + " " + keysFromSubObject[j]
                  newObject[newKey] = data[keysFromData[i]][keysFromSubObject[j]]
                  }
                }
              }else{
                const newKey = keysFromData[i]
                newObject[newKey] = data[keysFromData[i]]
              }
            }

            return newObject
          }
    const dispatch = useDispatch()

    const onCompletePage = useCallback((data)=> {
        s3POST (data)
        setShowPage(!showPage);
    },[showPage])
    

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "SURVEY"})
    }, [])

    async function sendData (data) {
      let response = await s3POST(parseData(data))
      return await response
    }

    const handleComplete = () => {
      Swal.fire({
        title: 'Survey Complete',
        // text: 'User Disabled',
        icon: 'success'
    })
    }

    const BootstrapButton = withStyles({
      root: {
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);',
          textTransform: 'none',
          textDecoration: 'none',
          fontSize: 16,
          padding: '6px 12px',
          border: '1px solid',
          lineHeight: 1.5,
          backgroundColor: 'rgb(32, 115, 136)',
          borderColor: 'rgb(32, 115, 136)',
          color: 'white',
          fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
          ].join(','),
          '&:hover': {
              backgroundColor: 'rgb(39, 136, 160)',
              borderColor: '#0062cc',
              boxShadow: 'none',
          },
          '&:active': {
              boxShadow: 'none',
              backgroundColor: '#0062cc',
              borderColor: '#005cbf',
          },
          '&:focus': {
              boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
          },
      },
  })(Button);

    const setFinalPage = ()=> {
        return (
            <main>
                <h1>Thanks for Completing the Survey!</h1>
                <Link to={`/userhome/${participant}`}>
                    <BootstrapButton className="doneBtn" onClick={() => {handleComplete()}}>Done</BootstrapButton>
                </Link>
            </main>
        )
    }

    return (
        <div>
            {
                showPage?
                <MySurvey showCompletedPage={data=>onCompletePage(data)} />:
                setFinalPage()
            }
        </div>
    )
}

export default SurveyOne;