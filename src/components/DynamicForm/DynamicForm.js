import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import From from './From';

const DynamicForm = () => {
    const [count, setCount] = useState([1])
    const handelChange = (e) => {
        let value = e.target.value
        setCount(Number(value))
    }

    return (
        <>
            <FormControl style={{ marginTop: 20 }} required variant="outlined" className='select-option' fullWidth >
                <InputLabel htmlFor="select-status">Game Add</InputLabel>
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
                        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((club, i) => <option key={i} value={club}>{club}</option>)
                    }
                </Select>
            </FormControl>

        </>
    );
};

export default DynamicForm;