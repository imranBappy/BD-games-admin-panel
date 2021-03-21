import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import BalanceInfo from '../BalanceInfo/BalanceInfo';
import UsersInfo from '../UsersInfo/UsersInfo';
import styles from '../style/style'

const useStyles = makeStyles((theme) => (styles(theme)));
const DashboardInfo = ({ open }) => {
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
                    <BalanceInfo />
                    <UsersInfo />
                </div>
            </main>
        </>
    );
};

export default DashboardInfo;