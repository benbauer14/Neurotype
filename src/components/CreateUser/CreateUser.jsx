import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import {  withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import './createUser.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

const BarStyling = { width: "20rem", height: 25, background: "#F2F1F9", border: "none", padding: "0.5rem" };
const SelectStyling = { width: "21rem", height: 40, border: "none", textAlign: "left" };

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

const BootstrapInput = withStyles((theme) => ({
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#FFF',
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
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
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  


const CreateUser = () => {
    const user = useSelector(store => store.user)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch({type: 'SET_PAGE', payload: "CREATEUSER"})
      axios.get('/api/groups').then((response) => {
        setGroups(response.data)
        }).catch((err) => {
        console.log("Error getting groups", err)
        })
  }, [])



    let groupID = 1; //placeholder for now until can access from store

    const [ userEmail, setUserEmail ] = useState( '' );
    const [ userTitle, setUserTitle ] = useState( 'none' );
    const [ userName, setUserName ] = useState( '' );
    const [ userPassword, setUserPassword ] = useState( '' );
    const [ userGroupID, setGroupID ] = useState( '' );
    const [ groups, setGroups] = useState('')

    const history = useHistory()
    const createThisUser = () => {

        let newUser = {
            email: userEmail,
            name: userName,
            password: userPassword,
            role: userTitle,
            group_id: userGroupID
        }

        dispatch({type: 'ADD_RESEARCHER', payload: newUser })
        history.push('/')
    }

    const conditionalTitles = () => {
        if(user.role === 'Site Admin'){
            return(
            
            <select className='titleSelect' placeholder="Title" value={userTitle} style={SelectStyling} onChange={(e) => {setUserTitle(e.target.value)}}>
                <option value="" hidden>Title</option>
                <option value='Researcher'>Researcher</option>
            </select>
            
            )
        }else if( user.role === 'Super Admin'){
            return(
            
            <select className='titleSelect' placeholder="Title" style={SelectStyling} onChange={(e) => {setUserTitle(e.target.value)}}>

                <option className='selectTitle' value="" selected hidden disabled>Title</option>

                <option value='Researcher'>Researcher</option>
                <option value='Site Admin'>Site Admin</option>
                <option value='Super Admin'>Super Admin</option>
            </select>
            
            )
        }
    }
    const conditionalGroup = () => {
        if(!Array.isArray(groups)){
            return("loading")
        }else{
            console.log('done', groups)
        }
        if(user.role === 'Site Admin'){
            let siteAdminGroup = ""
            for(let i = 0; i < groups.length; i++){
                if(groups[i].id === user.group_id){
                    siteAdminGroup = groups[i].name
                }
            }
            return(
            <div className="groupSelect">
            <select className='selectGroup' placeholder="Group Name" value={userGroupID} style={SelectStyling} onChange={(e) => {setGroupID(e.target.value)}}>
                <option value="" selected hidden disabled>Group Name</option>
                <option value={user.group_id}>{siteAdminGroup}</option>
            </select>
            </div>
            )
        }else if(user.role === 'Super Admin'){
            return(
                <div className="groupSelect">
                <select className='selectGroup' placeholder="Group Name" value={userGroupID} style={SelectStyling} onChange={(e) => {setGroupID(e.target.value)}}>
                <option value="" selected hidden disabled>Group Name</option>
                    {groups.map(group =>{
                        return(<option key={group.id} value={group.id}>{group.name}</option>)
                    })}
                </select>
                </div>
            )
        }
    }

    return (
        <div className="addresearcher">
            
            <div className='createUserCard'>
            <h2 className='addResearcher'>Create New Reseacher</h2>
            <form>
                    <input // email
                    className="inputs"
                    style={BarStyling}
                    key="random1"
                    // value={keyword}
                    placeholder={"Email"}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                {conditionalTitles()}
                <input // username
                    className="inputsName"
                    style={BarStyling}
                    key="random2"
                    // value={keyword}
                    placeholder={"User Name"}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input // password
                    className="inputs"
                    style={BarStyling}
                    key="random3"
                    // value={keyword}
                    placeholder={"Password"}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                {conditionalGroup()}

                <p><BootstrapButton className="submitButton2" onClick={ (event) => createThisUser() }>Submit</BootstrapButton></p>


            </form>
            </div>
        </div>
    )
}

export default CreateUser;