import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import '../UsersList/UsersList.css'
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const ClubsList = ({ columns, rows, handelIsActive, handelAction }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
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
                                                const isActive = row.isActive
                                                return (
                                                    <TableCell style={{ background: isActive ? '' : '#ffaf91' }} key={column.id} align={column.align}>

                                                        { column.id === 'status' ?
                                                            <Button
                                                                style={{ width: 100 }}
                                                                variant='outlined'
                                                                color={isActive ? 'primary' : 'secondary'}
                                                                onClick={() => handelIsActive(row)}
                                                            >
                                                                {isActive ? 'Active' : 'Inactive'}
                                                            </Button>
                                                            : column.id === 'action' ? <Button
                                                                variant='outlined'
                                                                color='primary'
                                                                style={{ width: 100 }}
                                                                onClick={() => handelAction(row)}
                                                            >
                                                                Edit
                                                            </Button> :
                                                                value
                                                        }

                                                    </TableCell>
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

export default ClubsList;

