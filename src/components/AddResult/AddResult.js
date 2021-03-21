import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import AddResultFrom from './AddResultFrom';

const useStyles = makeStyles((theme) => (styles(theme)));
const AddResult = ({ open }) => {
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
                    <h1 style={{ textAlign: 'center' }}>Add Result</h1>
                    <AddResultFrom />
                </div>
            </main>
        </>
    );
};

export default AddResult;