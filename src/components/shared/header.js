import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import { CartContext } from '../../contexts/CartContext';
import { CartIcon } from '../icons';
import styles from './header.module.scss';

const Header = () => {
	const history = useHistory();
	const { itemCount } = useContext(CartContext);
	const isAdmin = localStorage.getItem('isAdmin');

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('isAdmin');
		history.go(0)
	}

	const orders = () => {
		return history.push('/orders')
	}
	return (
		<header className={styles.header}>
			<Link to='/'>Store</Link>
			<Link to='/about'>About</Link>
			{!(isAdmin === 'true') && <Link to='/cart'> <CartIcon /> Cart ({itemCount})</Link>}
			<Dropdown >
				<Dropdown.Toggle className={styles.sett} variant="Secondary" id="dropdown-basic">
					Settings
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={orders}>Orders</Dropdown.Item>
					{isAdmin === 'true' && <Dropdown.Item onClick={e => history.push('/users')}>Users</Dropdown.Item>}
					<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</header>
	);
}

export default Header;