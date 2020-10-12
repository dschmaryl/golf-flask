import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { checkToken } from './store/auth/actions';

import { AppStateType } from './store/types';
// import { Token } from './types/auth';

import { Login } from './screens/Login';
import { Main } from './screens/Main';

type PropTypes = {
	token: string;
	isAuthenticated: boolean;
	authenticationFailed: boolean;
	checkToken: Function;
};

const AppComponent: React.FC<PropTypes> = ({
	token,
	isAuthenticated,
	authenticationFailed,
	checkToken
}) => {
	if (token && isAuthenticated) {
		return <Main />;
	} else if (!token || authenticationFailed) {
		return <Login />;
	} else {
		checkToken();
		return (
			<div>
				<p>authenticating...</p>
			</div>
		);
	}
};

const mapStateToProps = (state: AppStateType) => ({
	token: state.auth.token,
	isAuthenticated: state.auth.isAuthenticated,
	authenticationFailed: state.auth.authenticationFailed
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
	checkToken: () => dispatch(checkToken())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
