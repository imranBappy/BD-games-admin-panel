import React, { useContext } from 'react';
import UserTable from './UserTable';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import userData from '../../fakeData/userdata';
import { UsersContext } from '../Layout/Layout';
const columns = userData()
const useStyles = makeStyles((theme) => (styles(theme)));
export default function UsersList({ open }) {
    const classes = useStyles();
    const [users, setUser] = useContext(UsersContext)

    const handelStatus = (e) => {
        e.isActive = !e.isActive
        fetch('https://powerful-stream-48655.herokuapp.com/user-update', {
            method: 'PATCH',
            body: JSON.stringify(e),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        let filter = users.filter(user => user._id !== e._id)
        setUser([...filter, e])
    }
    const handelDelete = (e) => {
        let filter = users.filter(user => user._id !== e._id)
        fetch('https://powerful-stream-48655.herokuapp.com/delete-user/' + e._id, {
            method: 'DELETE',
        })
        setUser(filter)
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
                    <h1 style={{ textAlign: 'center' }} >Users List</h1>
                    <UserTable handelDelete={handelDelete} handelStatus={handelStatus} rows={users} columns={columns} />
                </div>
            </main>

        </>
    );
}
