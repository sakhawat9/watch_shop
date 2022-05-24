/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
import {
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import Layout from "../common/Layout";
import Title from "../common/Title";
import { Store } from "../utils/Store";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/watch/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <Layout title="Your Shopping Cart">
      <div className="section-padding">
        <Title
          title="Your Shopping Cart"
          subtitle="Start your order and enjoy the tastiest watch."
          description=""
        />
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-xl w-2/4 text-center">
                <img
                  className="md:w-3/5 mx-auto"
                  src="https://res.cloudinary.com/medsy/image/upload/v1653387617/20943865_gh1pvl.jpg"
                  alt="Empty cart"
                />
                <Link href="/allProducts">
                  <a className="btn-brand">
                    Go Watch Page <FaLongArrowAltRight />
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Link href={`/watch/${item.slug}`}>
                              <a>
                                <Image
                                  className="rounded"
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                              </a>
                            </Link>
                          </TableCell>

                          <TableCell>
                            <Link href={`/watch/${item.slug}`} passHref>
                              <a>
                                <Typography>{item.name}</Typography>
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartHandler(item, e.target.value)
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => removeItemHandler(item)}
                              className="inline-flex items-center gap-2 px-2 py-1 text-white border-0 rounded bg-primary-500 focus:outline-none hover:bg-primary-600"
                            >
                              <IoMdClose className="text-2xl" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Typography>
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        items): $
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <button
                        onClick={checkoutHandler}
                        className="btn btn-default w-full flex items-center justify-center gap-2"
                      >
                        Check Out <FaLongArrowAltRight />
                      </button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
