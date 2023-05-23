const Cart = require("../models/cart.model")

const createCart = async (req, res) => {
    try {
    const cart = await Cart.create({
       id: req.body.id,
    })      
    console.log("Cart created")
    return res.status(200).json(cart)
    } catch (err) {
    return res.status(404).send("Error: " + err)
    }
}

const getOneCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({ where: {id: req.params.cartId}})
        return res.status(200).json(cart)
    }catch (err){
        console.log(err)
        return res.status(400).send(err)
    }
}

const getAllCart = async (req, res) => {
    try{
        const cart = await Cart.findAll()
        return res.status(200).json(cart)
    }catch (err){
        console.log(err)
        return res.status(400).send(err)
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
        return res.status(200).json({ message: "User updated", fields_updated: cart });
      } else {
        return res.status(404).send("Cart not found");
      }
    } catch (error) {
      return res.status(500).send("Error to udpate user");
    }
  };

  const deleteCart = async (req, res) => {
    try{
        const cart =  await Cart.destroy({ where: {id: req.params.cartId}} )
        return res.status(200).send("Cart Deleted")
    } catch (err) {
        res.status(400).send("Cart has not been deleted")
    }
}


module.exports = {
    createCart,
    getOneCart,
    getAllCart,
    updateCart,
    deleteCart
}