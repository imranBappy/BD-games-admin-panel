import React from 'react';
import { TextField, Grid, Button, Switch } from '@material-ui/core';
const AdminFrom = ({ admin, setAdmin, handelSubmit }) => {
    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setAdmin({ ...admin, [name]: value })
    }
    const handleChange = () => {
        setAdmin({ ...admin, isAdmin: !admin.isAdmin })
    };
    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handelChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={handelChange}
                    />
                    <Switch
                        checked={admin.isAmin}
                        onChange={handleChange}
                        name="isAdmin"
                        color="primary"
                    />
                    <Button
                        onClick={handelSubmit}
                        style={{ marginTop: '20px' }}
                        fullWidth color="primary"
                        variant="contained"
                    >Submit</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminFrom;