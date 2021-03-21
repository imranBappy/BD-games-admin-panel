import { TextField, Grid, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { UsersContext } from '../Layout/Layout';
const ClubAddFrom = ({ club, setClub, handelSubmit }) => {
    const [users] = useContext(UsersContext)
    const handelChange = (e) => {
        let name = e.target.name, value = e.target.value
        switch (name) {
            case 'name':
                if (value.length > 1) {
                    setClub({ ...club, isValid: true, isName: true, [name]: value, nameMas: '' })
                } else {
                    setClub({
                        ...club, isName: false, [name]: '', isValid: false,
                        nameMas: 'Name must be two  char'
                    })
                }
                return;
            case 'username':
                if (value) {
                    for (let i = 0; i < users.length; i++) {
                        const username = users[i].username.toLowerCase();
                        if (username === value.toLowerCase()) {
                            setClub({ ...club, isValid: false, isUsername: true, [name]: value, usernameMas: '' })
                            return
                        } else {
                            setClub({
                                ...club, isValid: false, [name]: '', isUsername: false,
                                usernameMas: 'Username not exist'
                            })
                        }
                    }
                }
                return;
            case 'password':
                if (value.length > 5) {
                    setClub({ ...club, isValid: true, isPassword: true, [name]: value, passwordMas: '' })
                } else {
                    setClub({
                        ...club, isValid: false, [name]: '', isPassword: false,
                        passwordMas: 'Password must be 6  char'
                    })
                }
                return;
        }
    }

    return (
        <>
            <div >
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={!club.isName}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Club Name"
                            name="name"
                            onChange={handelChange}
                            helperText={club.nameMas && club.nameMas}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country1"
                            label="Club Owner Username"
                            name="username"
                            onChange={handelChange}
                            error={!club.isUsername}
                            helperText={club.usernameMas && club.usernameMas}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            onChange={handelChange}
                            error={!club.isPassword}
                            helperText={club.passwordMas && club.passwordMas}
                        />

                        <Button
                            onClick={handelSubmit}
                            style={{ marginTop: '20px' }}
                            fullWidth color="primary"
                            variant="contained"
                        >Submit</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default ClubAddFrom;