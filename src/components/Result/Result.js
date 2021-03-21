import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import betListBat from '../../fakeData/betListBar';
import BetList from '../BetList/BetList';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { GamesContext } from '../Dashboards/Dashboards'
import resultBarData, { allBits } from '../../fakeData/test';
import ResultTable from './ResultTable'
import { ResultContent } from '../../App';

const useStyles = makeStyles((theme) => (styles(theme)));

const Results = ({ open }) => {
    const id = useParams().id
    const classes = useStyles();
    const history = useHistory()
    const [result, setResult] = useContext(ResultContent)
    // let betResult = result.ans || []

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-bit?id=${id}`)
            .then((response) => response.json())
            .then((json) => {
                setResult(json)
            });
    }, [])

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div>
                    <h1 style={{ textAlign: 'center' }}>Result List</h1>
                    <Link style={{ textDecoration: 'none' }} to={`/add-result/${result._id}`}>
                        <Button color="primary" variant="outlined">
                            Add Result
                        </Button>
                    </Link>
                    <ResultTable columns={resultBarData()} />
                </div>
            </main>
        </>
    );
};

export default Results;




