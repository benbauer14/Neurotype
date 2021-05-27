import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import Swal from 'sweetalert2'
import './creategroup.css'
import axios from 'axios';



function CreateGroup() {
    const dispatch = useDispatch();
    const userRole = useSelector((store) => store.user.role)

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [PIN, setPIN] = useState('');

    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "CREATEGROUP"})
    }, [])

    const group = {
        name: name,
        description: description,
        PIN: PIN
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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    const addGroup = () => {
        if(PIN.length != 5) {
            Toast.fire({
                title: 'PIN must be 5 characters',
                // text: 'User Disabled',
                icon: 'error'
            })
            return null
        }
        axios.post('/api/groups/new', group).then((response) => {
            console.log(response)
            history.push('/home')
        }).catch((err) => {
            console.log('Error in group creation', err)
        })
    }
    
    if(userRole === 'Super Admin') {
    return (
        <>
            
            <div className="addPartDiv">
            <h2 className='createNewGroup'>Create New Group</h2>
                <div className="groupInputs">
                    <input className='addGroupInputs' placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                    <input className='addGroupInputs' placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                    <input className='addGroupInputs' type='number' placeholder="PIN" value={PIN} onChange={(event) => setPIN(event.target.value)}></input>
                </div>
                <Link >
                    <BootstrapButton className='addGroupBtn' onClick={() => addGroup()}> Create Group</BootstrapButton>
                </Link>
            </div>
        </>
    )
    } else {
        return(
            <>
                <h3>Must Be a Super Admin</h3>
            </>
        
        )
    }
    
}

export default connect(mapStoreToProps)(CreateGroup);