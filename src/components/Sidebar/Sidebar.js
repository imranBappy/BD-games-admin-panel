import React, { useContext } from 'react';
import './Sidebar.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ListItem, ListItemText, IconButton, Divider, List, Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Layout/Layout';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const Sidebar = ({ open, setOpen }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [auth, setAuth] = useContext(AuthContext)
    const sidebarBtn = [
        { name: 'Dashboard', path: '/', isAdmin: false },
        { name: 'Users List', path: '/users-list', isAdmin: true },
        { name: 'Games List', path: '/games-list', isAdmin: false },
        { name: 'Clubs List', path: '/clubs-list', isAdmin: true },
        { name: 'Deposit Request', path: '/deposit-request', isAdmin: true },
        { name: 'Withdraw Request', path: '/withdraw-request', isAdmin: true },
        { name: 'Game Finish', path: '/finish', isAdmin: true },
        { name: 'Admin', path: '/admin-manage', isAdmin: true },
        { name: 'User Bets', path: '/user-bits-list', isAdmin: true },
    ]

    const handelLogout = () => {
        const logoutUser = {
            email: "",
            isAdmin: false,
            isLoggedIn: false,
            password: "",
            _id: "",
        }
        setAuth(logoutUser)
        localStorage.setItem('admin', JSON.stringify(logoutUser))
    }

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {<>{
                        sidebarBtn.map((btn, i) => (<>
                            {auth.isAdmin ? <>
                                <Link className='link' to={btn.path} key={i}>
                                    <ListItem button >
                                        <ListItemText className='side-bar-btn' primary={btn.name} />
                                    </ListItem>
                                </Link>
                            </> : <>
                                {!btn.isAdmin &&
                                    <Link className='link' to={btn.path} key={i}>
                                        <ListItem button >
                                            <ListItemText className='side-bar-btn' primary={btn.name} />
                                        </ListItem>
                                    </Link>
                                }
                            </>}
                        </>
                        ))}
                        {/* <Link className='link' > */}
                        <ListItem button >
                            <ListItemText onClick={handelLogout} className='side-bar-btn' primary={'Logout'} />
                        </ListItem>
                        {/* </Link> */}
                    </>
                    }
                </List>
                <Divider />
            </Drawer >
        </>
    );
};

export default Sidebar;