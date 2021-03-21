import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import UserBetsListTable from './UserBitsListTable';
import userBetsListData from '../../fakeData/userBetsListData';

const useStyles = makeStyles((theme) => (styles(theme)));
const UserBitsList = ({ open }) => {
    const classes = useStyles();


    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div>
                    <h1 style={{ textAlign: 'center' }}>User Bets List</h1>
                    <UserBetsListTable columns={userBetsListData()} />
                </div>
            </main>
        </>
    );
};

export default UserBitsList