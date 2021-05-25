import axios from 'axios';
import React,{useState, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = ()=> {
    const [showPage, setShowPage] = useState(true); // refreshing page will update to True
    const session = useSelector(store => store.currentsession)

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

    const setFinalPage = ()=> {
        return (
            <main>
                <h1>Thanks for Completing the Survey!</h1>
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