import { Button, Container, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Checking = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({ isAdmin: true, isLoggedIn: false })

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handelSubmit = () => {
        axios({
            method: 'POST',
            data: user,
            url: 'https://powerful-stream-48655.herokuapp.com/login'
        }).then(res => console.log(res.data))
    }
    const getUser = () => {
        axios({
            method: 'GET',
            url: 'https://powerful-stream-48655.herokuapp.com/user'
        }).then(res => console.log(res.data))
    }



    return (
        <div>
            <Container maxWidth="xs">
                <h4>Admin List </h4>
                <TextField
                    onChange={handleChange}
                    fullWidth
                    label="Email"
                    name="email"
                />
                <TextField
                    onChange={handleChange}
                    fullWidth
                    label="Password"
                    name="password"
                />
                <Button style={{ marginTop: 30 }} fullWidth color="primary" variant="contained" onClick={handelSubmit}>
                    Submit
                </Button>
                <Button style={{ marginTop: 30 }} fullWidth color="primary" variant="contained" onClick={getUser}>
                    Get User
                </Button>

            </Container>
        </div>
    );
};

export default Checking;