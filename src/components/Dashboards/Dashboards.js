import React, { createContext, useContext, useEffect, useState } from 'react';
import { withdrawData } from '../../fakeData/withdrawData';
import AddResult from '../AddResult/AddResult';
import GamesFinish from '../GamesFinish/GamesFinish';

import { Admin, EditBet, Withdraw, Deposit, Header, AddBet, Sidebar, GameEdit, Bets, DashboardInfo, UsersList, GameAdd, GamesList, Clubs, AddClub, clubsInfo, ClubAction, fakeGames, AuthContext } from '../Layout/Layout'
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Results from '../Result/Result';
import ResultEdit from '../ResultEdit/ResultEdit';
import UserBitsList from '../UserBitsList/UserBitsList';
export const ClubsContext = createContext()
export const GamesContext = createContext()
export const DepositContext = createContext()
export const WithdrawContext = createContext()

const Dashboards = () => {
    const [auth] = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [clubs, setClubs] = useState([])
    const [gEdit, setGEdit] = useState({});
    const [deposit, setDeposit] = useState([])
    const [withdraw, setWithdraw] = useState([])
    const [games, setGames] = useState([]);
    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-deposit')
            .then((response) => response.json())
            .then((json) => setDeposit(json));
    }, [])
    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-club')
            .then((response) => response.json())
            .then((json) => setClubs(json));
    }, [])
    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/game-get')
            .then((response) => response.json())
            .then((json) => setGames(json));
    }, [])
    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-withdraw')
            .then((response) => response.json())
            .then((json) => setWithdraw(json));

    }, [])
    const [action, setAction] = useState({})
    const [bGame, setBGame] = useState({})
    const [eBet, setEBet] = useState()
    return (
        <div>
            <ClubsContext.Provider value={[clubs, setClubs]}>
                <GamesContext.Provider value={[games, setGames]}>
                    <DepositContext.Provider value={[deposit, setDeposit]}>
                        <WithdrawContext.Provider value={[withdraw, setWithdraw]}>
                            <div style={{ display: 'flex' }}>
                                <Header setOpen={setOpen} open={open} />
                                <Sidebar setOpen={setOpen} open={open} />
                                <PrivateRoute path='/users-list' >
                                    <UsersList open={open} />
                                </PrivateRoute>
                                <PrivateRoute exact path='/' >
                                    <DashboardInfo open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/games-list' >
                                    <GamesList setBGame={setBGame} setGEdit={setGEdit} open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/game-add' >
                                    <GameAdd open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/game-edit' >
                                    <GameEdit gEdit={gEdit} setGEdit={setGEdit} open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/bets-list/:id' >
                                    <Bets setEBet={setEBet} bGame={bGame} setBGame={setBGame} open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/add-bet/:id' >
                                    <AddBet bGame={bGame} open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/edit-bet/:id' >
                                    <EditBet eBet={eBet} setEBet={setEBet} bGame={bGame} open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/result/:id' >
                                    <Results open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/add-result/:id' >
                                    <AddResult open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/result-edit/:id' >
                                    <ResultEdit open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/finish' >
                                    <GamesFinish open={open} />
                                </PrivateRoute>
                                <PrivateRoute path='/user-bits-list' >
                                    <UserBitsList open={open} />
                                </PrivateRoute>


                                {
                                    auth.isAdmin && <>
                                        <PrivateRoute path='/add-club' >
                                            <AddClub open={open} />
                                        </PrivateRoute>
                                        <PrivateRoute path='/club-action' >
                                            <ClubAction action={action} setAction={setAction} open={open} />
                                        </PrivateRoute>
                                        <PrivateRoute path='/clubs-list' >
                                            <Clubs open={open} setAction={setAction} />
                                        </PrivateRoute>
                                        <PrivateRoute path='/deposit-request' >
                                            <Deposit open={open} />
                                        </PrivateRoute>
                                        <PrivateRoute path='/withdraw-request' >
                                            <Withdraw open={open} />
                                        </PrivateRoute>
                                        <PrivateRoute path='/admin-manage' >
                                            <Admin open={open} />
                                        </PrivateRoute>
                                    </>
                                }

                            </div>
                        </WithdrawContext.Provider>
                    </DepositContext.Provider>
                </GamesContext.Provider>
            </ClubsContext.Provider>
        </div>
    );
};

export default Dashboards;
