import React, { createContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import DashboardInfo from '../DashboardInfo/DashboardInfo';
import UsersList from '../UsersList/UsersList';
import GameAdd from '../GameAdd/GameAdd';
import GamesList from '../GamesList/GamesList';
import Clubs from '../Clubs/Clubs';
import AddClub from '../AddClub/AddClub';
import clubsInfo from '../../fakeData/clubs';
import ClubAction from '../ClubAction/ClubAction';
import fakeGames from '../../fakeData/fakeGame';
import Bets from '../Bets/Bets'
import GameEdit from '../GameEdit/GameEdit';
import AddBet from '../AddBet/AddBet';
import EditBet from '../BetEdit/BetEdit';
import Deposit from '../Deposit/Deposit';
import Withdraw from '../Withdraw/Withdraw';
import Admin from '../Admin/Admin';

const AuthContext = createContext()
const UsersContext = createContext()
const DashboardContext = createContext()
const Layout = ({ children }) => {
    let getUser = JSON.parse(localStorage.getItem('admin')) || { isLoggedIn: false }
    const [auth, setAuth] = useState(getUser)

    useEffect(() => {
        if (!getUser) {
            setAuth({ ...getUser, isLoggedIn: false })
        } else {
            setAuth({ ...getUser, isLoggedIn: true })
        }
    }, [])



    const [users, setUser] = useState([])
    const [dashboard, setDashboard] = useState({
        balance: 0,
        withdraw: 0,
        deposit: 0
    })

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-users')
            .then((response) => response.json())
            .then((json) => setUser(json));
    }, [])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-dashboard')
            .then((response) => response.json())
            .then((json) => {
                setDashboard(json)
                console.log(json);
            }

            );
    }, [])

    // console.log(dashboard);
    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                <UsersContext.Provider value={[users, setUser]}>
                    <DashboardContext.Provider value={[dashboard, setDashboard]}>
                        {children}
                    </DashboardContext.Provider>
                </UsersContext.Provider>
            </AuthContext.Provider>
        </>
    );
};

export default Layout;
export { Header, Admin, DashboardContext, Deposit, Withdraw, EditBet, AddBet, GameEdit, Bets, Sidebar, DashboardInfo, UsersList, AuthContext, UsersContext, GameAdd, GamesList, Clubs, AddClub, clubsInfo, ClubAction, fakeGames }


