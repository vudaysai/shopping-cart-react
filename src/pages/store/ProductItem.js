import React, { useContext, useState } from 'react';
import { store } from 'react-notifications-component';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';
import ProductForm from './productForm';
import { ProductsContext } from '../../contexts/ProductsContext';

const ProductItem = ({ product }) => {

	const { addProduct, cartItems, increase } = useContext(CartContext);
	const { fetchProducts } = useContext(ProductsContext)
	const isAdmin = localStorage.getItem('isAdmin')
	const isInCart = product => {
		return !!cartItems.find(item => item._id === product._id);
	}
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const deleteProduct = () => {
		const URL = process.env.REACT_APP_SERVER_URL + 'api/products/' + product._id;
		fetch(URL, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson) {
					store.addNotification({
						title: "Delete!",
						message: "Product Deleted",
						type: "danger",
						insert: "top",
						container: "top-right",
						animationIn: ["animate__animated", "animate__fadeIn"],
						animationOut: ["animate__animated", "animate__fadeOut"],
						dismiss: {
							duration: 5000,
							onScreen: true
						}
					});
					fetchProducts()
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
	const renderUserBasedActions = () => {
		if (!(isAdmin === 'true')) {
			return (
				<>
					{
						isInCart(product) &&
						<button
							onClick={() => increase(product)}
							className="btn btn-outline-primary btn-sm">Add more</button>
					}

					{
						!isInCart(product) &&
						<button
							onClick={() => addProduct(product)}
							className="btn btn-primary btn-sm">Add to cart</button>
					}
				</>
			)
		}
		return (
			<>
				<button onClick={deleteProduct} className="btn btn-outline-primary btn-sm mr-2">Delete</button>
				<button onClick={handleShow} className="btn btn-outline-primary btn-sm">Edit</button>
			</>
		)
	}

	return (
		<>
			<div className="card card-body">
				<img style={{ display: "block", margin: "0 auto 10px", maxHeight: "200px" }} className="img-fluid"
					src={product.imageURL} alt={product.name} />
				<p>{product.name}</p>
				<h3 className="text-left">{formatNumber(product.price)}</h3>
				<div className="text-right">
					{renderUserBasedActions()}
				</div>
			</div>
			<ProductForm product={product} show={show} handleClose={handleClose} isEdit />
		</>
	);
}

export default ProductItem;
