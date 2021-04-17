import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext()

const URL = process.env.REACT_APP_SERVER_URL + "api/transactions/checkout";
const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {

	const [state, dispatch] = useReducer(CartReducer, initialState)

	const increase = payload => {
		dispatch({ type: 'INCREASE', payload })
	}

	const decrease = payload => {
		dispatch({ type: 'DECREASE', payload })
	}

	const addProduct = payload => {
		dispatch({ type: 'ADD_ITEM', payload })
	}

	const removeProduct = payload => {
		dispatch({ type: 'REMOVE_ITEM', payload })
	}

	const clearCart = () => {
		dispatch({ type: 'CLEAR' })
	}

	const handleCheckout = () => {
		const products = state.cartItems.map(({ name, quantity }) => ({ name, quantity }))

		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
			body: JSON.stringify({ products, price: state.total, quantity: state.itemCount })
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.success) {
					dispatch({ type: 'CHECKOUT' })
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		clearCart,
		handleCheckout,
		...state
	}

	return (
		<CartContext.Provider value={contextValues} >
			{ children}
		</CartContext.Provider>
	);
}

export default CartContextProvider;
