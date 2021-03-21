import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import './UsersList.css'
import { ClubsContext } from '../Dashboards/Dashboards';
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const UserTable = ({ columns, rows, handelStatus, handelDelete }) => {
    const classes = useStyles();
    const [clubs, setClubs] = useContext(ClubsContext)
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
                                                const isActive = row.isActive
                                                let club = clubs.find(club => club._id === row.clubId)
                                                let clubName = club.name ? club.name : ''
                                                return (
                                                    <TableCell style={{ background: isActive ? '' : '#ffaf91' }} key={column.id} align={column.align}>
                                                        {column.id === 'club' && clubName}
                                                        { column.id === 'status' &&
                                                            <Button
                                                                onClick={() => handelStatus(row)}
                                                                style={{ width: 100 }}
                                                                variant='outlined'
                                                                color={isActive ? 'primary' : 'secondary'}>
                                                                {isActive ? 'Active' : 'Inactive'}
                                                            </Button>
                                                        }
                                                        {column.id === 'action' && <Button
                                                            onClick={() => handelDelete(row)}
                                                            variant='outlined'
                                                            color='secondary' >
                                                            Delete
                                                        </Button>
                                                        }
                                                        {value}
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

export default UserTable;

