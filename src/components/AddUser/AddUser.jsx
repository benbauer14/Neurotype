import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import './AddUser.css'



function AddUser(props) {
    const dispatch = useDispatch();
    const userRole = useSelector((store) => store.user.role)

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('');
    let [group_id, setGroupID] = useState('');
    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "ADDUSER"})
    }, [])

    const user = {
        name: name,
        email: email,
        password: password,
        role: role,
        group_id: group_id
    }
    

    const addParticipant = () => {
        dispatch({type: 'REGISTER', payload: user})
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
                backgroundColor: '#0069d9',
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
    
    if(userRole === 'Site Admin' || userRole === 'Super Admin') {
    return (
        <>
            <h2 className='createNewPart'>Create New User</h2>
            <div>
                <input className='addPart' placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                <input className='addPart' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <input className='addPart' placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <input className='addPart' placeholder="Group" value={group_id} onChange={(event) => setGroupID(event.target.value)}></input>
                <select className='addPart' placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)}>
                <option value='Site Admin'>Site Admin</option>
                <option value='Researcher'>Researcher</option>
                </select>
                <Link >
                    <BootstrapButton className='addPartBtn' onClick={() => addParticipant()}><BsFillPersonPlusFill></BsFillPersonPlusFill></BootstrapButton>
                </Link>
            </div>
        </>
    )
    } else {
        return(
            <>
                <h3>Must Be a Site Admin</h3>
            </>
        
        )
    }
    
}

export default connect(mapStoreToProps)(AddUser);