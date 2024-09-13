import express from 'express'
import bodyParser from 'body-parser'
import { cart } from '../model/index.js'

const cartRouter = express.Router()

cartRouter.use(bodyParser.json())


cartRouter.get('/:userID', (req, res) => {
    cart.fetchCart(req, res);
});

cartRouter.post('/addToCart', (req, res) => {
    const { prodID, userID } = req.body; // Use req.body for POST
    cart.addToCart(prodID, userID, res);
});

cartRouter.delete('/:userID/:prodID', (req, res) => {
    cart.removeFromCart(req, res);
});

cartRouter.delete('/:userID', (req, res) => {
    cart.clearCart(req, res);
});

// cartRouter.patch('/:userID/:prodID', (req, res) => {
//     cart.updateCartItemQuantity(req, res);
// });


export {
    cartRouter
}
