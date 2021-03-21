import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GamesListTable from './GamesListTable';
import fakeGameBarData from '../../fakeData/fakeGameBarData';
import { GamesContext } from '../Dashboards/Dashboards';
const useStyles = makeStyles((theme) => (styles(theme)));
const GamesList = ({ open, setGEdit, setBGame }) => {
    const history = useHistory()
    const classes = useStyles();

    const [games, setGames] = useContext(GamesContext)
    const handelLive = e => {
        let filter = games.filter(game => game._id !== e._id)
        e.isLive = !e.isLive
        update(e)
        setGames([...filter, e])
    }
    const handelStatus = e => {
        let filter = games.filter(game => game._id !== e._id)
        e.isShow = !e.isShow
        update(e)
        setGames([...filter, e])
    }
    const handelFinish = e => {
        let filter = games.filter(game => game._id !== e._id)
        e.action = !e.action
        update(e)
        setGames([...filter, e])
    }
    const handelEdit = e => {
        setGEdit(e)
        history.push('/game-edit')
    }

    const handelBet = e => {

        setBGame(e)
        history.push('/bets-list')
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
                    <Link style={{ textDecoration: 'none' }} to='/game-add'>
                        <Button variant='outlined' color='primary' >
                            Add Game
                        </Button>
                    </Link>
                    <h1 style={{ textAlign: 'center' }} >Games List</h1>
                    <div>
                        <GamesListTable
                            columns={fakeGameBarData()}
                            rows={games}
                            handelLive={handelLive}
                            handelStatus={handelStatus}
                            handelFinish={handelFinish}
                            handelEdit={handelEdit}
                            handelBet={handelBet}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default GamesList;

function update(game) {
    fetch('https://powerful-stream-48655.herokuapp.com/game-update', {
        method: 'PATCH',
        body: JSON.stringify(game),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}