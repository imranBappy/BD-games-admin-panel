import { TextField, Grid, Button } from '@material-ui/core';
import React from 'react';

const BetAddForm = ({ bet, setBet, handelAdd }) => {
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
                            label="Question..?"
                            name="question"
                            onChange={handelChange}
                        />
                        <Button
                            onClick={handelAdd}
                            style={{ marginTop: '20px' }}
                            fullWidth color="primary"
                            variant="contained"
                        >Add</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default BetAddForm;