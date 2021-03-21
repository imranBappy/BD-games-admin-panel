import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const GamesListTable = ({ columns, rows, handelLive, handelFinish, handelStatus, handelEdit }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

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
                                                const isShow = row.isShow
                                                return (
                                                    <>
                                                        {row.action && <>
                                                            <TableCell style={{ background: isShow ? '' : '#ffaf91' }} key={column.id} align={column.align}>
                                                                {value}
                                                                {column.id === 'bet' &&
                                                                    <Link style={{ textDecoration: 'none' }} to={`/bets-list/${row._id}`} >
                                                                        <Button
                                                                            variant='outlined'
                                                                            color="primary"
                                                                        >Bet</Button>
                                                                    </Link>
                                                                }
                                                                {column.id === 'isShow' && <Button
                                                                    onClick={() => handelStatus(row)}
                                                                    style={{ width: 78 }}
                                                                    variant='outlined' color="primary">
                                                                    {value ? 'Show' : 'Hide'}
                                                                </Button>
                                                                }
                                                                {column.id === 'action' && <>
                                                                    <Button
                                                                        onClick={() => handelEdit(row)}
                                                                        style={{ width: 81, marginRight: 5 }}
                                                                        variant='outlined'
                                                                        color="primary">Edit</Button>
                                                                    <Button
                                                                        style={{ width: 81 }}
                                                                        variant='outlined'
                                                                        color="secondary"
                                                                        onClick={() => handelFinish(row)}
                                                                    >UnFinish</Button>
                                                                </>
                                                                }
                                                                {column.id === 'isLive' && <Button
                                                                    onClick={() => handelLive(row)}
                                                                    style={{ width: 112 }}
                                                                    variant='outlined' color={value ? "secondary" : 'primary'}>
                                                                    {value ? "Live" : 'Upcoming'}
                                                                </Button>}
                                                                {column.id === 'team' && `${row.country1} VS ${row.country2} `}
                                                                {column.id === 'date' && ` / ${row.time} `}
                                                            </TableCell>
                                                        </>}
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

export default GamesListTable;

