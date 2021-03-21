import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import betListBat from '../../fakeData/betListBar';
import BetList from '../BetList/BetList';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { GamesContext } from '../Dashboards/Dashboards'
import { BetsContent } from '../../App';
const useStyles = makeStyles((theme) => (styles(theme)));

const Bets = ({ open }) => {
    const [bets, setBets] = useState([])
    const classes = useStyles();
    const id = useParams().id

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/bet-get?id=${id}`)
            .then((response) => response.json())
            .then((json) => {
                setBets(json)
            }
            );
    }, [])

    const handelAction = e => {
        e.action = !e.action
        console.log(e);
        fetch('https://powerful-stream-48655.herokuapp.com/bet-update', {
            method: 'PATCH',
            body: JSON.stringify(e),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        const filter = bets.filter(b => b._id !== e._id)
        setBets([e, ...filter])
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
                    <h1 style={{ textAlign: 'center' }}>Bets List</h1>
                    <Link to={`/add-bet/${id}`} style={{ textDecoration: 'none', marginBottom: 10 }}>
                        <Button style={{ marginBottom: 20 }} color="primary" variant="outlined">
                            Add Bet
                        </Button>
                    </Link>
                    <BetList
                        rows={bets}
                        columns={betListBat()}
                        handelAction={handelAction}
                    />
                </div>
            </main>
        </>
    );
};

export default Bets;
