import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import { GamesContext } from '../Dashboards/Dashboards';
import { DashboardContext, UsersContext } from '../Layout/Layout';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const UserBetsListTable = ({ columns }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [user, setUser] = useContext(UsersContext)
    const [dashboard, setDashboard] = useContext(DashboardContext)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const [rows, setRows] = useState([])
    let newArr = []
    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/all-user-bets`)
            .then((response) => response.json())
            .then((json) => setRows(json))
        if (rows.length > 0) {
            const sorted = rows.sort((a, b) => {
                let aa = a.date.split('-'), bb = b.date.split('-');
                let aDate_ = aa[0].trim(), bDate_ = bb[0].trim();
                const aDate = new Date(aDate_)
                const bDate = new Date(bDate_)
                return bDate.getTime() - aDate.getTime()
            })
            newArr = sorted
        }
        if (rows.newArr > 0) {
            setRows(newArr)
        }
    }, [])



    const handelLoss = e => {
        if (!e.isLoss) {

            let newBalance = Number(e.amount) + Number(dashboard.balance)
            const dashboards = {
                ...dashboard,
                balance: newBalance
            }

            fetch(`https://powerful-stream-48655.herokuapp.com/update-dashboard`, {
                method: 'PATCH',
                body: JSON.stringify(dashboards),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            e.isLoss = true;
            fetch(`https://powerful-stream-48655.herokuapp.com/ans-update`, {
                method: 'PATCH',
                body: JSON.stringify(e),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setDashboard(dashboards)
            let eFilter = rows.filter(r => r._id !== e._id)
            setRows([...eFilter, e])
        }
    }

    const handelWin = e => {
        if (!e.isWin) {
            let newBalance = Number(e.amount) * Number(e.rate)
            const filter = user.find(user => user._id === e.userId)
            const newUser = { ...filter, balance: filter.balance + newBalance }
            fetch(`https://powerful-stream-48655.herokuapp.com/user-update`, {
                method: 'PATCH',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            e.isWin = true
            fetch(`https://powerful-stream-48655.herokuapp.com/ans-update`, {
                method: 'PATCH',
                body: JSON.stringify(e),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setUser([...user, newUser])

            let eFilter = rows.filter(r => r._id !== e._id)
            setRows([...eFilter, e])
        }
    }


    return (
        <>
            <div className="mostly-customized-scrollbar">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <>
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'status' && <> <Button
                                                                style={{ marginRight: 4 }}
                                                                onClick={() => handelLoss(row)}
                                                                color="secondary"
                                                                variant="contained">
                                                                {row.isLoss ? 'Lost' : 'Loss'}</Button>
                                                                <Button
                                                                    onClick={() => handelWin(row)}
                                                                    color="primary"
                                                                    variant="contained">{row.isWin ? 'Winned' : 'Win'}</Button>
                                                            </>
                                                            }
                                                            {column.id === 'isWin' && row.isWin ? 'Winned' : ''}
                                                            {value}
                                                        </TableCell>
                                                    </>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    );
};

export default UserBetsListTable;

