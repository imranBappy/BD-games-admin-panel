import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'

import { ClubsContext } from '../Dashboards/Dashboards';
import { useHistory } from 'react-router';
import ClubActionFrom from './ClubActionFrom';
const useStyles = makeStyles((theme) => (styles(theme)));

const ClubAction = ({ open, action, setAction }) => {

    const [clubs, setClubs] = useContext(ClubsContext)
    const classes = useStyles();
    const history = useHistory()
    const [club, setClub] = useState({
        isValid: false, isName: true, isUsername: true, isPassword: true
    })

    const handelDelete = () => {
        // const filter = clubs.filter(club => club._id !== action._id)
        // setClubs(filter)
        // history.push('/admin/clubs-list')
    }

    const handelUpdate = () => {
        const filter = clubs.filter(club => club._id !== action._id)
        fetch('https://powerful-stream-48655.herokuapp.com/club-update', {
            method: 'PATCH',
            body: JSON.stringify(action),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json())
            .then((json) => console.log(json))
        setClubs([...filter, action])
        history.push('/admin/clubs-list')
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
                    <h1 style={{ textAlign: 'center' }} >Edit Club</h1>
                    <ClubActionFrom
                        action={action}
                        club={club}
                        setAction={setAction}
                        handelDelete={handelDelete}
                        setClub={setClub}
                        handelUpdate={handelUpdate}
                    />
                </div>
            </main>
        </>
    );
};

export default ClubAction;