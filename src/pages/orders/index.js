import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Layout from '../../components/Layout';
import './index.scss';

const URL = "http://localhost:5000/api/transactions";

const OrderGrid = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(URL, {
      headers: { token: localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setOrders(result.transactions)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  return (
    <>
      <Layout title="Orders" description="All your orders" >
        <div >
          <div className="text-center mt-5">
            <h1>Orders</h1>
            <p>All your orders</p>
          </div>
          <div className='card-grid-layout'>
            {orders.map((x, index) => {
              return (
                <Card >
                  <Card.Body>
                    <Card.Title>Order {index + 1}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{x._id}</Card.Subtitle>
                    <Card.Text>
                      {x.products.map(product => {
                        return (
                          <p>{product.name} X {product.quantity}</p>
                        )
                      })

                      }
                    </Card.Text>
                    <Card.Link href="#">Total Quantity: {x.quantity}</Card.Link>
                    <Card.Link href="#">Total Price: {x.price}</Card.Link>
                  </Card.Body>
                </Card>
              )
            })}
          </div>
        </div>
      </Layout>

    </>
  );
}

export default OrderGrid;
