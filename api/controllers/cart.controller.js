const Cart = require("../models/cart.model")
const Product = require('../models/product.model')

const createCart = async (req, res) => {
    try {
      const cart = await Cart.create({
        id: req.body.id,
    })      
      //console.log("Cart created")
      return res.status(200).json(cart)
    } catch (err) {
      return res.status(404).send(">> Oops something went wrong creating the cart.")
    }
}

const getOneCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({ where: {id: req.params.cartId}})
        return res.status(200).json(cart)
    }catch (err){
        return res.status(400).send(">> Oops something went wrong.")
    }
}

const getAllCart = async (req, res) => {
  try{
    const cart = await Cart.findAll()
    return res.status(200).json(cart)
  }catch (err){
    return res.status(400).send(">> Oops something went wrong.")
  }
}

//No Work
const updateCart = async (req, res) => {
    try {
      const [cartExist, cart] = await Cart.update(req.body, {
        returning: true,
        where: {
          id: req.params.cartId,
        },
      });
      if (cartExist !== 0) {
        return res.status(200).json({ message: "Cart updated", fields_updated: cart });
      } else {
        return res.status(404).send("Cart not found");
      }
    } catch (error) {
      return res.status(500).send("Error to udpate cart");
    }
  };

  const deleteCart = async (req, res) => {
    try{
        const cart =  await Cart.destroy({ where: {id: req.params.cartId}} )
        return res.status(200).send("Cart Deleted")
    } catch (err) {
        return res.status(400).send("Cart has not been deleted")
    }
}


const addProductsToCart = async (req, res) => {
  try { 
    const cart = await Cart.findByPk(req.params.cartId)
    await cart.addProducts(req.params.productId)
    if (cart){
      return res.status(200).json(">> Products added to your shopping cart.")
    }else{
      return res.status(400).send('>> Oops something went wrong.')
    }
  } catch (error) {
    return res.status(400).send(">> Oops something went wrong.")
  }
}

const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId)
    await cart.removeProducts(req.params.productId)
    if (cart){
      return res.status(200).json(">> Products deleted from your shopping cart.")
    }else{
      return res.status(400).send('>> Oops something went wrong.')
      
    }
  } catch (error) {
    return res.status(400).send(">> Oops something went wrong.")

  }
}


module.exports = {
    createCart,
    getOneCart,
    getAllCart,
    updateCart,
    deleteCart,
    addProductsToCart,
    deleteProductFromCart
  }