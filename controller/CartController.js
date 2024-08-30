import express from 'express'
import bodyParser from 'body-parser'
import { cart } from '../model/index.js'

const cartRouter = express.Router()

cartRouter.use(bodyParser.json())


cartRouter.get('/:userID', (req, res) => {
    cart.fetchCart(req.params.userID, res);
});

cartRouter.post('/addToCart', (req, res) => {
    const { prodID, userID } = req.query;
    cart.addToCart(prodID, userID, res);
});

cartRouter.delete('/deleteFromCart', (req, res) => {
    const { prodID, userID } = req.query;
    cart.deleteFromCart(prodID, userID, res);
});


// cartRouter.get('/', (req, res) => {
//     cart. fetchCart(req, res)
// })


// cartRouter.get('/:id', (req, res) => {
//     cart.itemsInCart(req, res)
// })

// cartRouter.post('/add', (req, res) => {
//     cart.addToCart(req, res)
// })

// cartRouter.delete('/:id', (req, res) => {
//     cart.deleteFromCart(req, res)
// })


export {
    cartRouter
}
