import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import { GamesContext } from '../Dashboards/Dashboards'
import { useHistory } from 'react-router';
import BetEditFrom from './BetEditFrom'
import { useParams } from 'react-router';
const useStyles = makeStyles((theme) => (styles(theme)));

const EditBet = ({ open, bGame, eBet, setEBet }) => {
    const classes = useStyles();
    const [games, setGame] = useContext(GamesContext)
    let history = useHistory()
    let bets = bGame.bets || []

    const [bet, setBet] = useState({})
    const id = useParams().id

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-bit?id=${id}`)
            .then((response) => response.json())
            .then((json) => setBet(json));
    }, [])

    const handelSubmit = () => {
        fetch('https://powerful-stream-48655.herokuapp.com/bet-update', {
            method: 'PATCH',
            body: JSON.stringify(bet),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        history.push('/admin/games-list')
    }
    const handedDelete = () => {
        fetch(`https://powerful-stream-48655.herokuapp.com/delete-bet/${bet._id}`, {
            method: 'DELETE',
        });
        history.push('/admin/games-list')
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
                    <h1 style={{ textAlign: 'center' }}>Bet Edit</h1>
                    <BetEditFrom handedDelete={handedDelete} bet={bet} handelSubmit={handelSubmit} setBet={setBet} />
                </div>
            </main>
        </>
    );
};

export default EditBet;
