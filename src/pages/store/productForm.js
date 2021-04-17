import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductsContext } from '../../contexts/ProductsContext';

const ProductForm = ({ product, isEdit, handleClose, show }) => {
  const { fetchProducts } = useContext(ProductsContext)
  const [data, setData] = useState({ ...product })

  const handleSubmit = () => {
    const { name, price, imageURL } = data;
    const URL = `http://localhost:5000/api/products/${isEdit ? data._id : ''}`;
    fetch(URL, {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, imageURL })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          handleClose()
          fetchProducts()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={e => setData({ ...data, name: e.target.value })} type="text" value={data.name} placeholder="Enter Product Name" />
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" onChange={e => setData({ ...data, price: e.target.value })} value={data.price} placeholder="Enter Product Price" />
          </Form.Group>

          <Form.Group controlId="productImageURL">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" onChange={e => setData({ ...data, imageURL: e.target.value })} value={data.imageURL} placeholder="Enter Product Image URL" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default ProductForm;
