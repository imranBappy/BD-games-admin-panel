import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import ResultEditForm from './ResultEditForm';

const useStyles = makeStyles((theme) => (styles(theme)));
const ResultEdit = ({ open }) => {
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
                    <h1 style={{ textAlign: 'center' }}>Result Edit from</h1>
                    <ResultEditForm />
                </div>
            </main>
        </>
    );
};

export default ResultEdit;