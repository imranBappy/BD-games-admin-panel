import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ResultContent } from '../../App';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const BetList = ({ columns, rows, handelAction }) => {
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
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'result' && <Link
                                                                style={{ textDecoration: 'none' }}
                                                                to={`/result/${row._id}`
                                                                }>
                                                                <Button variant='contained'>
                                                                    Result
                                                                    </Button>
                                                            </Link>
                                                            }
                                                            {column.id === 'action' && <Button
                                                                style={{ width: 77 }}
                                                                color={value ? 'primary' : 'secondary'}
                                                                onClick={() =>
                                                                    handelAction(row)}
                                                                variant='contained' >{value ? 'Show' : 'Hide'}</Button>}
                                                            {column.id === 'edit' && <Link
                                                                to={`/edit-bet/${row._id}`}
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                <Button variant='contained' >Edit</Button>
                                                            </Link>}
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

export default BetList;

