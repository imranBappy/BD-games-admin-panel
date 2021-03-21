import { TextField, Grid, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';


const BetEditFrom = ({ handelSubmit, handedDelete, bet, setBet }) => {

    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setBet({ ...bet, [name]: value })
    }

    return (
        <>
            <div >
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="question"
                            name="question"
                            value={bet.question}
                            onChange={handelChange}
                        />

                        <Button
                            onClick={handelSubmit}
                            style={{ marginTop: '20px' }}
                            fullWidth color="primary"
                            variant="contained"
                        >Update</Button>
                        <Button
                            onClick={handedDelete}
                            style={{ marginTop: '20px' }}
                            fullWidth color="secondary"
                            variant="contained"
                        >Delete</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default BetEditFrom;