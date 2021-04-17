import React, { createContext, useState, useEffect } from 'react';
export const ProductsContext = createContext()

const URL = "http://localhost:5000/api/products";

const ProductsContextProvider = ({ children }) => {

	const [products, setProducts] = useState([]);

	const fetchProducts = () => {
		fetch(URL)
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