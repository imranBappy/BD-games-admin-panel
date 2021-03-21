import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { Typography, Container, Avatar, Button, TextField, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../Layout/Layout';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [auth, setAuth] = useContext(AuthContext)
    let history = useHistory();
    const [admin, setAdmin] = useState([])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/admin-get')
            .then((response) => response.json())
            .then((json) => setAdmin(json));

    }, [])

    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/admin" } };

    const handleChange = e => {
        let name = e.target.name, value = e.target.value
        if (name === 'email') {
            if (!validateEmail(value)) {
                setAuth({
                    ...auth,
                    loginValid: false,
                    emailMes: 'Please Provide Valid Email'
                })
            } else {
                setAuth({
                    loginValid: true,
                    ...auth,
                    email: value,
                    emailMes: ''
                })
            }
        } else if (name === 'password') {
            if (value.length > 5) {
                setAuth({
                    ...auth,
                    loginValid: true,
                    password: value,
                    passwordMes: ''
                })
            } else {
                setAuth({
                    ...auth,
                    loginValid: false,
                    passwordMes: 'Password at least 6 characters.'
                })
            }
        }

    }
    const handleLogin = () => {
        if (auth.loginValid) {
            const user = admin.find(ad => ad.email === auth.email) || {}
            if (auth.password === user.password) {
                delete user.mess;
                localStorage.setItem('admin', JSON.stringify({ ...user, isLoggedIn: true }))
                setAuth({ ...user, isLoggedIn: true });
                history.replace(from);
            } else {
                setAuth({ ...user, isLoggedIn: false, mess: 'User not exist!' });
            }
        }
    }
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <div className={classes.form}>
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <p style={{ color: 'red' }}>{auth.mess}</p>
                        <Button
                            onClick={handleLogin}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                    </Button>

                    </div>
                </div>

            </Container>
        </>
    );
}



function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}