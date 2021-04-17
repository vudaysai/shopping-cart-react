import React, { createContext, useState, useEffect } from 'react';
export const ProductsContext = createContext()

const URL = process.env.REACT_APP_SERVER_URL + "api/products";

const ProductsContextProvider = ({ children }) => {

	const [products, setProducts] = useState([]);

	const fetchProducts = () => {
		const token = localStorage.getItem('token')
		if (token) {
			fetch(URL, {
				headers: { token }
			})
				.then(res => res.json())
				.then(
					(result) => {
						setProducts(result)
					},
					(error) => {
						console.log(error)
					}
				)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<ProductsContext.Provider value={{ products, fetchProducts }} >
			{ children}
		</ProductsContext.Provider>
	);
}

export default ProductsContextProvider;