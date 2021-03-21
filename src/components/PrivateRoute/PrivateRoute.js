import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../Layout/Layout';

const PrivateRoute = ({ children, ...rest }) => {
    const [auth] = useContext(AuthContext)
    return (
        <>
            <Route
                {...rest}
                render={({ location }) =>
                    auth.isLoggedIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </>
    );
};

export default PrivateRoute;