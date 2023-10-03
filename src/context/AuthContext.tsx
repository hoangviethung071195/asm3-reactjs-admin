import { cloneDeep } from 'lodash';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser, removeCurrentUser, updateCurrentUser } from '../utils/helpers/local-storage';
import { signin, signup } from '../service/authentication.service';
import { UserModel } from '../models/User.model';

const AuthContext = React.createContext({
	currentUser: {} as UserModel,
	isAuthenticated: false,
	onLogout: () => { },
	onLogin: (user: UserModel) => { },
	onRegister: (user: UserModel) => { },
});

export function AuthContextProvider(props: PropsWithChildren) {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<UserModel>(getCurrentUser());

	useEffect(() => {
	}, []);

	function updateCurrentUserInfo(user: UserModel) {
		updateCurrentUser(user);
		setCurrentUser(cloneDeep(user));
	}

	const loginHandler = (user: UserModel) => {
		signin(user)
			.then(r => {
				if (r) {
					updateCurrentUserInfo({
						...r,
						token: 'Bearer ' + r.token
					});
					navigate('/');
					toast.success("Đăng nhập thành công!");
				}
			});
	};


	const logoutHandler = () => {
		setCurrentUser({});
		removeCurrentUser();
	};

	const registerHandler = (user: UserModel) => {
		signup(user).then(r => {
			if (r) {
				navigate("/login");
				toast.success("Đăng ký tài khoản thành công");
			}
		});
		setCurrentUser(user);
	};


	return (
		<AuthContext.Provider
			value={{
				currentUser: currentUser,
				isAuthenticated: !!currentUser?.token,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				onRegister: registerHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
