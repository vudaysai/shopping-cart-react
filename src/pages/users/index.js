import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Layout from '../../components/Layout';
import './index.scss';

const URL = process.env.REACT_APP_SERVER_URL + "api/users";

const UserGrid = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(URL, {
      headers: { token: localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result.users)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  return (
    <>
      <Layout title="Users" description="All non-admin users" >
        <div >
          <div className="text-center mt-5">
            <h1>Users</h1>
            <p>All Users</p>
          </div>
          <div className='card-grid-layout'>
            {users.map((user, index) => {
              return (
                <Card >
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user._id}</Card.Subtitle>
                    <Card.Text>
                      {user.email}
                    </Card.Text>
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

export default UserGrid;
