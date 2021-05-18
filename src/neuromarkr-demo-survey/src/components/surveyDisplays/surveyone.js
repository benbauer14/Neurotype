import React,{useState, useCallback} from 'react';
import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = ()=> {
    const [showPage, setShowPage] = useState(true); // refreshing page will update to True

    const onCompletePage = useCallback((data)=> {
        console.log(data);
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