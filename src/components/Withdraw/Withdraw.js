import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../style/style'
import WithdrawList from './WithdrawList';
import { WithdrawContext } from '../Dashboards/Dashboards';
import withdrawBarData from '../../fakeData/withdrawData'
import { UsersContext, DashboardContext } from '../Layout/Layout';
const useStyles = makeStyles((theme) => (styles(theme)));
const Withdraw = ({ open }) => {
    const [withdraw, setWithdraw] = useContext(WithdrawContext)

    const classes = useStyles();
    const [users, setUsers] = useContext(UsersContext)
    const [dashboards, setDashboards] = useContext(DashboardContext)

    const handelStatus = e => {
        if (!e.status) {
            const filterUser = users.filter(user => user.username !== e.username)
            const filterFind = users.find(user => user.username === e.username)
            filterFind.balance = Number(filterFind.balance) - Number(e.amount)

            fetch('https://powerful-stream-48655.herokuapp.com/user-update', {
                method: 'PATCH',
                body: JSON.stringify(filterFind),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            e.status = true
            const filterWithdraw = withdraw.filter(w => w._id !== e._id)
            setDashboards({
                ...dashboards,
                balance: Number(dashboards.balance) - Number(e.amount),
                withdraw: Number(dashboards.withdraw) + Number(e.amount),
            })

            fetch(`https://powerful-stream-48655.herokuapp.com/update-dashboard`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...dashboards,
                    balance: Number(dashboards.balance) - Number(e.amount),
                    withdraw: Number(dashboards.withdraw) + Number(e.amount),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            fetch('https://powerful-stream-48655.herokuapp.com/withdraw-update', {
                method: 'PATCH',
                body: JSON.stringify(e),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            setUsers([...filterUser, filterFind])
            setWithdraw([...filterWithdraw, e])
        }
    }

    const handelAction = e => {
        const filter = withdraw.filter(f => f._id !== e._id)
        if (!e.action) {
            e.action = true
            fetch('https://powerful-stream-48655.herokuapp.com/withdraw-update', {
                method: 'PATCH',
                body: JSON.stringify(e),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setWithdraw([...filter, e])
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
                    <h1>Withdraw Request</h1>
                    <WithdrawList handelEdit={handelEdit} handelAction={handelAction} handelStatus={handelStatus} rows={withdraw} columns={withdrawBarData()} />
                </div>
            </main>
        </>
    );
};

export default Withdraw;