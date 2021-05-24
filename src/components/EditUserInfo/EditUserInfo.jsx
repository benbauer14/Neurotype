import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import Swal from 'sweetalert2'
import {FaUserEdit} from 'react-icons/fa';
import './editUserInfo.css'
import axios from 'axios';



function EditUserInfo(props) {
    const dispatch = useDispatch();
    const userRole = useSelector((store) => store.user.role)
    const users = useSelector((store) => store.users)
    const history = useHistory()

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('');
    let [groupname, setGroupName] = useState('');
    let [group_id, setGroupId] = useState('');
    let [groups, setGroups] = useState([]);

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "EDITUSER"})
        for(let i=0; i<users.length; i++){
            if(users[i].id === Number.parseInt(props.match.params.id)){
                setName(users[i].name)
                setEmail(users[i].email)
                setGroupName(users[i].groupname)
                setRole(users[i].role)
                setGroupId(users[i].group_id)
            }
        }
        axios.get('/api/groups').then((response) => {
            setGroups(response.data)
            }).catch((err) => {
            console.log("Error getting groups", err)
            })
    }, [])

    const user = {
        name: name,
        email: email,
        // password: password,
        role: role,
        group_id: Number.parseInt(group_id),
        id: Number.parseInt(props.match.params.id)
    }
    
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

    const editUser = () => {
        console.log(user)
        dispatch({type: 'UPDATE_RESEARCHER', payload: user})
        Toast.fire({
            title: 'User Edited',
            // text: 'User Disabled',
            icon: 'success'
        })
        history.push('/edit')
    }

    console.log(user)
    

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

      


    console.log(props.match.params.id)
    const BarStyling = { width: "20rem", height: 25, background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const SelectStyling = { width: "21rem", height: 40, border: "none", textAlign: "left" };
    if(userRole === 'Super Admin') {
    return (
        <>
            <h2 className='createNewPart'>Edit User</h2>

            <div className="addPartDiv">
            <form>
                <input className='addPart' placeholder="Name" value={name} style={BarStyling} onChange={(event) => setName(event.target.value)}></input>
                {/* <input className='addPart' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input> */}
                <input className='addPart' placeholder="Email" value={email} style={BarStyling} onChange={(event) => setEmail(event.target.value)}></input>
                <select className='addPartSelect' placeholder="Group" style={SelectStyling} onChange={(event) => setGroupId(event.target.value)}>
                {groups.map(group =>{
                    if(group.id === group_id){
                        console.log(Number.parseInt(group.id))
                        return(<option key={Number.parseInt(group.id)} selected="selected" value={Number.parseInt(group.id)}>{group.name}</option>)
                    }else{
                        return(<option key={Number.parseInt(group.id)} value={Number.parseInt(group.id)}>{group.name}</option>)
                    }
                    })}
                </select>
                <select className='addPartSelect' placeholder="Role" value={role} style={SelectStyling} onChange={(event) => setRole(event.target.value)}>
                    <option value='Researcher'>Researcher</option>
                    <option value='Site Admin'>Site Admin</option>
                    <option value='Super Admin'>Super Admin</option>
                </select>
                <br></br>
            <Link >
                    <BootstrapButton className="editButton" onClick={() => editUser()}><FaUserEdit size="20px" className="editUserIcon"></FaUserEdit>Submit</BootstrapButton>
            </Link>
            </form>
            </div>

        </>
    )
    } else if (userRole === 'Site Admin' ) {
        return (
            <>
                <h2 className='createNewPart'>Edit User</h2>
                <div className="addPartDiv">

                    <div className="center">


                    <input className='addPart' placeholder="Name" value={name} style={BarStyling} onChange={(event) => setName(event.target.value)}></input>
                    {/* <input className='addPart' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input> */}
                    <input className='addPart' placeholder="Email" value={email} style={BarStyling} onChange={(event) => setEmail(event.target.value)}></input>
                <select className='addPartSelect' placeholder="Role" value={group_id} style={SelectStyling} onChange={(event) => setGroupId(event.target.value)}>
                {groups.map(group =>{
                    if(group.id === group_id){
                        console.log(Number.parseInt(group.id))
                        return(<option key={Number.parseInt(group.id)} selected="selected" value={Number.parseInt(group.id)}>{group.name}</option>)
                    }else{
                        return(<option key={Number.parseInt(group.id)} value={Number.parseInt(group.id)}>{group.name}</option>)
                    }
                    })}
                </select>
                    <select className='addPartSelect' placeholder="Role" value={role} style={SelectStyling} onChange={(event) => setRole(event.target.value)}>
                        <option value='Researcher'>Researcher</option>
                        <option value='Site Admin'>Site Admin</option>
                    </select>

                        <Link >
                                <BootstrapButton className="editButton" onClick={() => editUser()}><FaUserEdit size="25px" className="editUserIcon"></FaUserEdit></BootstrapButton>
                        </Link>
                    </div>
                </div>
    
            </>
        )
    } else {
        return ("ADMIN Access required")
    }
    
}

export default connect(mapStoreToProps)(EditUserInfo);