import React,{useState, useCallback} from 'react';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'


import { makeStyles, withStyles } from '@material-ui/core/styles';
import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = ()=> {
    const [showPage, setShowPage] = useState(true); // refreshing page will update to True
    const participant = useSelector((store) => store.currentsession.participant_name)

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

    const handleComplete = () => {
        Swal.fire({
          title: 'Survey Complete',
          // text: 'User Disabled',
          icon: 'success'
      })
      }
    
    const setFinalPage = ()=> {
        return (
            <main>
                <h1>Thanks for Completing the Survey!</h1>
                <Link to={`/userhome/${participant}`}>
                    <BootstrapButton onClick={() => {handleComplete()}}>Done</BootstrapButton>
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