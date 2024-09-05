import express from 'express'
import bodyParser from 'body-parser'
import { cart } from '../model/index.js'

const cartRouter = express.Router()

cartRouter.use(bodyParser.json())


cartRouter.get('/:userID', (req, res) => {
    cart.fetchCart(req.params.userID, res);
});

cartRouter.post('/addToCart', (req, res) => {
    const { prodID, userID } = req.body; // Use req.body for POST
    cart.addToCart(prodID, userID, res);
});

cartRouter.delete('/deleteFromCart', (req, res) => {
    const { prodID, userID } = req.body; // Use req.body for DELETE
    cart.deleteFromCart(prodID, userID, res);
});

export {
    cartRouter
}
