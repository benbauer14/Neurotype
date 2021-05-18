import React,{useState, useCallback} from 'react';
import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = ()=> {
    const [showPage, setShowPage] = useState(true); // refreshing page will update to True

    const s3POST = (data) => {
        axios.post('/api/s3upload/uploadToS3', data).then ((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
        }

    const onCompletePage = useCallback((data)=> {
        console.log(data);
        console.log('!!!!')
        s3POST(data)
        setShowPage(!showPage);
    },[showPage])
    
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