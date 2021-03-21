import React, { useContext } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import './UsersInfo.css'
import { UsersContext } from '../Layout/Layout';
import { GamesContext } from '../Dashboards/Dashboards';
const UsersInfo = () => {
    const [users] = useContext(UsersContext)
    const [game] = useContext(GamesContext)
    return (
        <>
            <Grid spacing={5} container direction="row" justify="center" alignItems="center" >
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography className="infoTitle" variant="h6" component="span">
                                    Total Users
                                </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {users.length}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography className="infoTitle" variant="h6" component="span">
                                    Total Games
                                </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {game.length}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography className="infoTitle" variant="h6" component="span">
                                    Total Admin
                                </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    5
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default UsersInfo;