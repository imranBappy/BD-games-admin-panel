import React, { useContext } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import './BalanceInfo.css'
import { DashboardContext } from '../Layout/Layout';
const BalanceInfo = () => {
    const [dashboard] = useContext(DashboardContext)


    return (
        <>
            <Grid spacing={5} container direction="row" justify="center" alignItems="center" >
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography component='span'>
                                    <MonetizationOnIcon />
                                </Typography>
                                <Typography style={{ margin: 10, fontWeight: 'bold' }} variant="h6" component="span">
                                    Total Balance
                                    </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {dashboard.balance}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography component='span'>
                                    <MonetizationOnIcon />
                                </Typography>
                                <Typography style={{ margin: 10, fontWeight: 'bold' }} variant="h6" component="span">
                                    Total Deposit
                                </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {dashboard.deposit}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} >
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography component='span'>
                                    <MonetizationOnIcon />
                                </Typography>
                                <Typography style={{ margin: 10, fontWeight: 'bold' }} variant="h6" component="span">
                                    Total Withdraw
                                </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {dashboard.withdraw}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default BalanceInfo;