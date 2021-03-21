import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import ClubsList from './ClubsList';
import { clubBar } from '../../fakeData/clubs';
import { UsersContext } from '../Layout/Layout';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { ClubsContext } from '../Dashboards/Dashboards';
const useStyles = makeStyles((theme) => (styles(theme)));

const Clubs = ({ open, action, setAction }) => {
    const classes = useStyles();
    const [users] = useContext(UsersContext)
    const [clubs, setClubs] = useContext(ClubsContext)
    const history = useHistory()
    function manegeClub(members, clubs) {
        // set member
        for (let i = 0; i < clubs.length; i++) {
            let member = 0
            members.forEach(m => {
                if (clubs[i]['_id'] === m._id) {
                    member++
                }
            });
            clubs[i]['members'] = member
        }
        //set balance
        for (let i = 0; i < clubs.length; i++) {
            let balance = 0
            members.forEach(m => {
                if (clubs[i]['_id'] === m._id) {
                    balance += m.balance
                }
            });
            clubs[i]['balance'] = balance
        }
        // short 
        clubs.sort(function (a, b) {
            return b.balance - a.balance
        });
    }
    manegeClub(users, clubs)
    const handelIsActive = e => {
        let filter = clubs.filter(c => c._id !== e._id)
        e.isActive = !e.isActive
        fetch('https://powerful-stream-48655.herokuapp.com/club-edit-active', {
            method: 'PATCH',
            body: JSON.stringify(e),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json())
            .then((json) => console.log(json))

        setClubs([...filter, e])
    }


    const handelAction = e => {
        e.isEdit = true
        setAction(e)
        history.push('/club-action')
    }
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

                <div className={classes.drawerHeader} />
                <>
                    <h1 style={{ textAlign: 'center' }}>Clubs List</h1>
                    <Box mb={4}>
                        <Link style={{ textDecoration: 'none' }} to='/add-club'>
                            <Button color="primary" variant='outlined' >
                                Add Club
                            </Button>
                        </Link>
                    </Box>

                    <ClubsList handelAction={handelAction} handelIsActive={handelIsActive} rows={clubs} columns={clubBar()} />
                </>
            </main>

        </>
    );
};

export default Clubs;

