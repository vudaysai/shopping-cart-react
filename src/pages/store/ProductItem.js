import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';
import ProductForm from './productForm';

const ProductItem = ({ product }) => {

	const { addProduct, cartItems, increase } = useContext(CartContext);
	const isAdmin = localStorage.getItem('isAdmin')
	const isInCart = product => {
		return !!cartItems.find(item => item._id === product._id);
	}
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
				<button onClick={() => increase(product)} className="btn btn-outline-primary btn-sm mr-2">Delete</button>
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
