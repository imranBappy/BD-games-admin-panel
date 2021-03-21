import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TablePagination, TableHead, TableContainer, TableCell, Paper, Table, TableBody, Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { ResultContent, ResultEditContent } from '../../App'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});
const ResultTable = ({ columns }) => {
    const [resultEdit, setResultEdit] = useContext(ResultEditContent)

    const [bet, setBet] = useState({})
    const [rows, setRows] = useState([])

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-bit?id=${id}`)
            .then((response) => response.json())
            .then((json) => {
                setBet(json)
                console.log(json.ans);
                setRows(json.ans)
            });
    }, [])


    const [result] = useContext(ResultContent)
    const id = useParams().id
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
    const handelWin = e => {
        const ans = bet.ans || []
        const filterAns = ans.filter(a => a._id !== e._id)
        let loss = filterAns.map(a => {
            return { ...a, loss: true }
        })
        e.loss = false
        e.win = true
        let updateAns = [...loss, e]
        let updateResult = { ...bet, ans: updateAns }
        fetch('https://powerful-stream-48655.herokuapp.com/bet-update', {
            method: 'PATCH',
            body: JSON.stringify(updateResult),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setRows(updateAns)
    }

    return (
        <>
            <div className="mostly-customized-scrollbar">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, i) => (
                                        <TableCell
                                            key={i}
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                let win = row.win, loss = row.loss
                                                return (
                                                    <>
                                                        <TableCell style={{ background: win ? ' #3F88D1' : '' }} key={column.id} align={column.align}>
                                                            {column.id === 'win' &&
                                                                <Button
                                                                    style={{ width: 91 }}
                                                                    onClick={() => handelWin(row)}
                                                                    variant='contained'
                                                                    color='primary'
                                                                >
                                                                    {win ? 'Winned' : 'Win'}
                                                                </Button>
                                                            }
                                                            {column.id === 'loss' &&
                                                                <Button
                                                                    variant='contained'
                                                                    color='secondary'
                                                                >{loss ? 'Lost' : 'Loss'}
                                                                </Button>
                                                            }
                                                            {column.id === 'edit' &&
                                                                <Link style={{ textDecoration: 'none' }}
                                                                    to={`/result-edit/${result._id}`}
                                                                >
                                                                    <Button
                                                                        onClick={() => setResultEdit(row)}
                                                                        variant='contained'
                                                                        color='secondary'
                                                                    >Edit</Button>
                                                                </Link>
                                                            }

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

export default ResultTable;

