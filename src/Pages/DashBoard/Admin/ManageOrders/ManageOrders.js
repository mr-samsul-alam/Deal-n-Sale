import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, LinearProgress, Typography } from '@mui/material';
import UseAuth from '../../../../FireBase/UseAuth';
import MyOrdersTable from './MyOrdersTable';

export default function ManageOrders() {
  const { user } = UseAuth()
  const [orders, setOrders] = React.useState([]);
  const [cartsProgress, setCartsProgress] = React.useState(20);
  const [cartBuffer, setCartBuffer] = React.useState(30);
  React.useEffect(() => {
    setCartBuffer(40)
    setCartsProgress(50)
    fetch(`https://sleepy-dawn-01844.herokuapp.com/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
    setCartBuffer(100)
    setCartsProgress(100)


  }, [user?.email])
  console.log(orders)
  return (
    <>
      <LinearProgress variant="buffer" value={cartsProgress} valueBuffer={cartBuffer} />
      <Typography variant='h3' style={{ textAlign: 'center', marginTop: '20px' }}>
        My Cart
      </Typography>

      {
        orders.length === 0 ? (<h1 style={{ textAlign: 'center' }} >Sir No order get yet</h1>) : (<div style={{ display: "flex", justifyContent: 'center', marginTop: '50px' }}>
          <TableContainer style={{ width: '1000px', }} component={Paper}>
            <Table sx={{ minWidth: 700, }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" >name</TableCell>
                  <TableCell align="center" >Email</TableCell>
                  <TableCell align="center">Product's Name</TableCell>
                  <TableCell align="center">Count</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => <MyOrdersTable key={row?._id} row={row} setOrders={setOrders} orders={orders}></MyOrdersTable>)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>)
      }


    </>
  );
}
