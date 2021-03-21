import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import ClubAddFrom from './ClubAddFrom';
import clubIdGenerator from '../Clubs/clubIdGenerator'
import { UsersContext } from '../Layout/Layout';
import { ClubsContext } from '../Dashboards/Dashboards';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => (styles(theme)));
const AddClub = ({ open }) => {
    const [users] = useContext(UsersContext)
    const [clubs, setClubs] = useContext(ClubsContext)
    const classes = useStyles();
    const history = useHistory()
    const [club, setClub] = useState({
        isValid: false, isName: true, isUsername: true, isPassword: true
    })
    let { name, username, password, isValid } = club

    const handelSubmit = () => {
        if (club.isValid) {
            let date = new Date()
            let newDate = date.toDateString()
            const newClub = {
                name,
                username,
                password,
                date: newDate,
                isActive: true,
                balance: 0,
                members: 0
            }
            fetch('https://powerful-stream-48655.herokuapp.com/add-club/', {
                method: 'POST',
                body: JSON.stringify(newClub),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
            setClubs([...clubs, newClub])
            history.push('/clubs-list')
        }
    }
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div>
                    <h1 style={{ textAlign: 'center' }} >Add Club</h1>
                    <ClubAddFrom
                        club={club}
                        handelSubmit={handelSubmit}
                        setClub={setClub}
                    />
                </div>
            </main>
        </>
    );
};

export default AddClub;