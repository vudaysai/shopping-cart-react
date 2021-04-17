import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductItem from './ProductItem';
import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './ProductsGrid.module.scss';
import ProductForm from './productForm';

const ProductsGrid = () => {

	const { products } = useContext(ProductsContext)
	const [show, setShow] = useState(false);
	const isAdmin = localStorage.getItem('isAdmin');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className={styles.p__container}>
				<div className="row">
					<div className="col-sm-8">
						<div className="py-3">
							{products.length} Products
          </div>
					</div>
					{isAdmin === 'true' &&
						<div className="col-sm-4">
							<div className="form-group">
								<Button className="form-control" variant="primary" onClick={handleShow}>Add Product</Button>
							</div>
						</div>
					}
				</div>
				<div className={styles.p__grid}>

					{
						products.map(product => (
							<ProductItem key={product._id} product={product} />
						))
					}

				</div>
				<div className={styles.p__footer}>

				</div>
			</div>
			<ProductForm product={{}} show={show} handleClose={handleClose} />
		</>
	);
}

export default ProductsGrid;
