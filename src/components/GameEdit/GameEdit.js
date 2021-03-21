
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../style/style'
import GameEditForm from './GameEditForm';
import { GamesContext } from '../Dashboards/Dashboards';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => (styles(theme)));

const GameEdit = ({ open, gEdit, setGEdit }) => {
    const history = useHistory()
    const classes = useStyles();
    const [games, setGame] = useContext(GamesContext)
    const handleUpdate = () => {
        const filter = games.filter(g => g._id !== gEdit._id)
        fetch('https://powerful-stream-48655.herokuapp.com/game-update', {
            method: 'PATCH',
            body: JSON.stringify(gEdit),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setGame([...filter, gEdit])
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
                    <h1 style={{ textAlign: 'center' }}>Game Edit</h1>
                    <GameEditForm
                        gEdit={gEdit}
                        setGEdit={setGEdit}
                        handleUpdate={handleUpdate}
                    />
                </div>
            </main>
        </>
    );
};

export default GameEdit;