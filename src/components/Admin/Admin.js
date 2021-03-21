import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import AdminFrom from './AdminFrom';
import { AuthContext } from '../Layout/Layout';
import { Button } from '@material-ui/core';
import AdminList from './AdminList';
import adminBarData, { admitData } from '../../fakeData/adminBarData';

const useStyles = makeStyles((theme) => (styles(theme)));
const Admin = ({ open }) => {
    const [form, setForm] = useState(false)
    const [auth, setAuth] = useContext(AuthContext)
    const [admins, setAdmins] = useState([])
    const classes = useStyles();

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/admin-get')
            .then((response) => response.json())
            .then((json) => {
                setAdmins(json)
            });
    }, [])

    const [admin, setAdmin] = useState({
        email: '',
        password: '',
        isAdmin: false,
        isLoggedIn: true,
    })
    const handelSubmit = () => {
        fetch('https://powerful-stream-48655.herokuapp.com/admin-post', {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        setAdmin({ ...admin, isAdmin: false })
        setAdmins([...admins, admin])
        setAdmin({ ...admin, isAdmin: false })
        setForm(false)
    }
    const handelDelete = e => {
        const filter = admins.filter(a => a._id !== e._id)
        setAdmins(filter)
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
                    <Button></Button>
                    <Button onClick={() => setForm(!form)} color='primary' variant="outlined">Create Admin</Button>
                    {
                        form ? <AdminFrom handelSubmit={handelSubmit} admin={admin} setAdmin={setAdmin} /> :
                            <AdminList handelDelete={handelDelete} columns={adminBarData()} rows={admins} />
                    }
                </div>
            </main>
        </>
    );
};

export default Admin;