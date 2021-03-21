import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const DepositTable = ({ columns, rows, handelAction, handelEdit, handelStatus }) => {
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
                                                return (
                                                    <>
                                                        <TableCell style={{ background: row.action ? '#FFA07A' : row.status && '#32CD32' }} key={column.id} align={column.align}>
                                                            {column.id === 'status' && <>{value ? 'Accepted' : 'Pending'}</>}
                                                            {column.id === 'action' && <>{
                                                                !value && <Button onClick={() => handelStatus(row)} variant="contained" style={{ width: 100, marginRight: 5 }} color="primary" >{row.status ? 'Accepted' : 'Accept'}</Button>
                                                            }
                                                                {!row.status && <Button onClick={() => handelAction(row)} variant="contained" style={{ width: 100 }} color="secondary" >{value ? 'Rejected' : 'Reject'}</Button>}

                                                            </>}
                                                            {column.id === 'edit' && <>
                                                                <Button onClick={() => handelEdit(row)} variant='outlined' color="secondary" >Edit</Button>
                                                            </>}
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

export default DepositTable;

