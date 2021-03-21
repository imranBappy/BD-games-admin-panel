import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../style/style'
import DepositTable from './DepositTable';
import { DepositContext } from '../Dashboards/Dashboards';
import depositBarData from '../../fakeData/depositData';
import { DashboardContext, UsersContext } from '../Layout/Layout';

const useStyles = makeStyles((theme) => (styles(theme)));
const Deposit = ({ open }) => {
    const classes = useStyles();
    const [users, setUsers] = useContext(UsersContext)
    const [deposit, setDeposit] = useContext(DepositContext)
    const [dashboards, setDashboards] = useContext(DashboardContext)

    const handelStatus = e => {
        const findUser = users.find(user => user.username === e.username)
        const filterUser = users.filter(user => user.username !== e.username)
        const filter = deposit.filter(f => f._id !== e._id)
        if (!e.status) {
            findUser.balance = Number(findUser.balance) + Number(e.amount)
            setDashboards({ ...dashboards, deposit })
            setUsers([...filterUser, findUser])
            e.status = true
            fetch('https://powerful-stream-48655.herokuapp.com/user-update', {
                method: 'PATCH',
                body: JSON.stringify(findUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            fetch('https://powerful-stream-48655.herokuapp.com/deposit-update', {
                method: 'PATCH',
                body: JSON.stringify(e),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            fetch(`https://powerful-stream-48655.herokuapp.com/update-dashboard`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...dashboards, deposit: Number(dashboards.deposit) + Number(e.amount)
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setDashboards({
                ...dashboards, deposit: Number(dashboards.deposit) + Number(e.amount)
            })
            setDeposit([...filter, e])
        }
    }

    const handelAction = e => {
        const filter = deposit.filter(f => f._id !== e._id)
        if (!e.action) {
            e.action = true
            setDeposit([...filter, e])
        }
    }
    const handelEdit = e => {
        console.log(e);
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
                    <h1>Deposit</h1>
                    <DepositTable handelEdit={handelEdit} handelAction={handelAction} handelStatus={handelStatus} rows={deposit} columns={depositBarData()} />
                </div>
            </main>
        </>
    );
};

export default Deposit;