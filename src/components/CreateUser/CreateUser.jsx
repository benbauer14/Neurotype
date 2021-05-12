import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

const CreateUser = () => {

    let groupID = 1; //placeholder for now until can access from store
    const dispatch = useDispatch();

    const [ userEmail, setUserEmail ] = useState( '' );
    const [ userTitle, setUserTitle ] = useState( '' );
    const [ userName, setUserName ] = useState( '' );
    const [ userPassword, setUserPassword ] = useState( '' );

    console.log( 'email', userEmail )
    console.log( 'title', userTitle )
    console.log( 'userName', userName )
    console.log( 'userPass', userPassword )

    const createThisUser = () => {

        let newUser = {
            email: userEmail,
            name: userName,
            password: userPassword,
            role: userTitle,
        }

        dispatch({type: 'ADD_RESEARCHER', payload: newUser })
    }


    return (
        <>
            <h2>Add a new Reseacher!</h2>
            <form>
                <label>
                    Email (username):
                    <input type="text" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}/>
                </label>
                <label>
                    Title:
                    <input type="text" value={userTitle} onChange={(event) => setUserTitle(event.target.value)}/>
                </label>
                <label>
                    Name:
                    <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="text" value={userPassword} onChange={(event) => setUserPassword(event.target.value)}/>
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}

export default CreateUser;