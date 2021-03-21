import { Button, TextField, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { BetsContent, ResultContent, ResultEditContent } from '../../App'
const ResultEditForm = () => {
    const [resultEdit, setResultEdit] = useContext(ResultEditContent)
    const [bet, setBet] = useState({})
    const [result, setResult] = useContext(ResultContent)
    const history = useHistory()

    const id = useParams().id
    // const [result, setResult] = useContext(ResultContent)


    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-bit?id=${id}`)
            .then((response) => response.json())
            .then((json) => setBet(json));
    }, [])

    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setResultEdit({ ...resultEdit, [name]: value })
    }

    const handelEdit = () => {
        console.log(bet);
        let filter = bet.ans.filter(b => b._id !== resultEdit._id)
        const newAns = [...filter, resultEdit]
        let updateBet = { ...bet, ans: newAns }
        fetch('https://powerful-stream-48655.herokuapp.com/bet-update', {
            method: 'PATCH',
            body: JSON.stringify(updateBet),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        history.push('/games-list')
    }

    const handelDelete = () => {
        // const ans = result.ans || []
        // const filter = bets.filter(b => b._id !== result._id)
        // const filterAns = ans.filter(a => a._id !== resultEdit._id)
        // setResult({ ...result, ans: filterAns })
        // setBets([...filter, result])
        // history.push('/result')
    }

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        onChange={handelChange}
                        fullWidth
                        name='ans'
                        label="Ans"
                        value={resultEdit.ans}
                    />
                    <TextField
                        onChange={handelChange}
                        fullWidth
                        name='rate'
                        value={resultEdit.rate}
                        label="Rate"
                    />

                    <Button onClick={handelEdit} style={{ marginTop: 40 }} color="primary" variant="contained" fullWidth>
                        Update
            </Button>
                    <Button onClick={handelDelete} style={{ marginTop: 40 }} color="secondary" variant="contained" fullWidth>
                        Delete
            </Button>
                </Grid>
            </Grid >
        </div>
    );
};

export default ResultEditForm;