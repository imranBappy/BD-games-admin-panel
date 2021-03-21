import { TextField, Grid, FormControl, InputLabel, Select, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import './GameEdit.css'
const gameType = ['Football', 'Cricket', 'Basketball']
const GameEditForm = ({ gEdit, setGEdit, handleUpdate }) => {
    const { name, country1, country2, type, date, time } = gEdit
    const history = useHistory()
    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setGEdit({ ...gEdit, [name]: value })
    }
    const handleDelete = () => {
        fetch(`https://powerful-stream-48655.herokuapp.com/game-delete/${gEdit._id}`, {
            method: 'DELETE',
        });
        history.push('/admin/games-list')
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
                            id="name"
                            label="Tournament Name"
                            name="name"
                            value={name}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country1"
                            label="Country1"
                            name="country1"
                            value={country1}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country2"
                            label="Country2"
                            name="country2"
                            value={country2}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type='date'
                            name="date"
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="1.19 AM"
                            name="time"
                            value={time}
                            onChange={handelChange}
                        />
                        <FormControl style={{ marginTop: 15 }} required variant="outlined" className='select-option' fullWidth >
                            <InputLabel htmlFor="select-type">Game Type </InputLabel>
                            <Select
                                required
                                native
                                label="select-type "
                                inputProps={{
                                    name: 'type',
                                    id: 'select-type',
                                }}
                                onChange={handelChange}
                                value={type}
                            >
                                <option aria-label="None" />
                                {
                                    gameType.map((club, i) => <option key={i} value={club}>{club}</option>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginTop: 20 }} required variant="outlined" className='select-option' fullWidth >
                            <InputLabel htmlFor="select-status">Game Status </InputLabel>
                            <Select
                                required
                                native
                                label="select-status "
                                inputProps={{
                                    name: 'status',
                                    id: 'select-status',
                                }}
                                onChange={handelChange}
                            >
                                <option aria-label="None" />
                                {
                                    ['Live', 'Upcoming'].map((club, i) => <option key={i} value={club}>{club}</option>)
                                }
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleUpdate}
                            style={{ marginTop: '20px' }}
                            fullWidth color="primary"
                            variant="contained"
                        >Update</Button>
                        <Button
                            onClick={handleDelete}
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

export default GameEditForm;