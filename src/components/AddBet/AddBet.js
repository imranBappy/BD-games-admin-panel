import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import BetAddForm from './BetAddForm';
import { useHistory, useParams } from 'react-router';
import { BetsContent } from '../../App';
const useStyles = makeStyles((theme) => (styles(theme)));
const AddBet = ({ open, bGame }) => {
    const classes = useStyles();
    const [bets, setBets] = useContext(BetsContent)
    const id = useParams().id
    let history = useHistory()
    const [bet, setBet] = useState({
        question: '',
        gameId: id,
        action: true,
        ans: []
    })

    const handelAdd = () => {
        fetch('https://powerful-stream-48655.herokuapp.com/bet-add', {
            method: 'POST',
            body: JSON.stringify(bet),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setBets([...bets, bet])
        history.push('/games-list')
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
                    <h1 style={{ textAlign: 'center' }}>Bet Add</h1>
                    <BetAddForm bet={bet} handelAdd={handelAdd} setBet={setBet} />
                </div>
            </main>
        </>
    );
};

export default AddBet;
