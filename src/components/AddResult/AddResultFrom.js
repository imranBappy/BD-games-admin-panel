import { TextField, Button, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { BetsContent, ResultContent } from '../../App';

const AddResultFrom = () => {
    const id = useParams().id
    // const [result, setResult] = useContext(ResultContent)
    const [bet, setBet] = useState({})

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-bit?id=${id}`)
            .then((response) => response.json())
            .then((json) => setBet(json));
    }, [])

    const history = useHistory()
    const [bitResult, setBitResult] = useState({
        _id: ID(),
        ans: '',
        win: false,
        loss: false,
        rate: '0',
    })
    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setBitResult({ ...bitResult, [name]: value })
    }

    const handelAdd = () => {
        let newBet = { ...bet, ans: [...bet.ans, bitResult] }
        fetch('https://powerful-stream-48655.herokuapp.com/bet-update', {
            method: 'PATCH',
            body: JSON.stringify(newBet),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        history.push('/games-list')
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12} md={6}>

                    <TextField
                        onChange={handelChange}
                        fullWidth
                        name='ans'
                        label="Ans"
                    />
                    <TextField
                        onChange={handelChange}
                        fullWidth
                        name='rate'
                        label="Rate"
                    />

                    <Button onClick={handelAdd} style={{ marginTop: 40 }} color="primary" variant="contained" fullWidth>
                        Add
            </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default AddResultFrom;
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 15);
};