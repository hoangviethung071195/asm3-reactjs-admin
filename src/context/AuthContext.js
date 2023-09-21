import cloneDeep from 'lodash.clonedeep';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser, removeCurrentUser, updateCurrentUser } from '../helpers/product.helper';
import { signin, signup } from '../service/products.service';

const AuthContext = React.createContext({
	currentUser: {},
	isAuthenticated: false,
	onLogout: () => { },
	onLogin: () => { },
	onRegister: () => { },
	onAddToCart: () => { },
	onRemoveCart: () => { },
});

export function AuthContextProvider(props) {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	useEffect(() => {

	}, []);

	function updateCurrentUserInfo(user) {
		updateCurrentUser(user);
		setCurrentUser(cloneDeep(user));
	}

	const loginHandler = (user) => {
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

	const registerHandler = (user) => {
		console.log('user', user);
		signup(user).then(r => {
			if (r) {
				navigate("/login");
				toast.success("Đăng ký tài khoản thành công");
			}
		});
		setCurrentUser(user);
	};

	const addToCart = (newCart) => {
		const { carts = [] } = currentUser;
		const cart = carts.find(c => c.id === newCart.id);
		if (cart) {
			cart.quantity += newCart.quantity;
		} else {
			carts.push(newCart);
		}
		currentUser.carts = carts;
		updateCurrentUserInfo(currentUser);
	};

	const removeCart = (cart) => {
		currentUser.carts = currentUser.carts.filter(c => c.id !== cart.id);
		updateCurrentUserInfo(currentUser);
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser: currentUser,
				isAuthenticated: currentUser?.token,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				onRegister: registerHandler,
				onAddToCart: addToCart,
				onRemoveCart: removeCart,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
