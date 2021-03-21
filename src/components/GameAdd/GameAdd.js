import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import GameAddFrom from './GameAddFrom';
import { GamesContext } from '../Dashboards/Dashboards';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => (styles(theme)));
const GameAdd = ({ open }) => {
    const history = useHistory()
    const [games, setGames] = useContext(GamesContext)
    const [isValid, setValid] = useState(true)
    const [game, setGame] = useState({
        name: '',
        country1: '',
        country2: '',
        time: '',
        date: '',
        type: '',
        status: ''
    })
    const classes = useStyles();
    let IsValid = true;
    const handelSubmit = () => {
        for (const key in game) {
            if (!(game[key].length > 1)) {
                IsValid = false;
            }
        }
        if (IsValid) {
            const { status, name, country1, country2, date, type, time } = game

            let isLive = false
            if (status === 'Live') {
                isLive = true
            } else if (status === 'Upcoming') {
                isLive = false
            }
            const newGame = {
                name,
                country1,
                country2,
                type,
                date,
                time,
                action: false,
                isShow: false,
                isLive: isLive
            }
            console.log(newGame);
            fetch('https://powerful-stream-48655.herokuapp.com/game-add', {
                method: 'POST',
                body: JSON.stringify(newGame),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                })
            setValid(true)
            setGames([...games, newGame])
            history.push('/games-list')
        } else {
            setValid(false)
        }

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
                    <h1 style={{ textAlign: 'center' }}>Game Add From</h1>
                    <GameAddFrom
                        isValid={isValid}
                        game={game} setGame={setGame}
                        handelSubmit={handelSubmit}
                    />
                </div>
            </main>

        </>
    );
};

export default GameAdd;