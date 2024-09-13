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

cartRouter.put('/cart/:userID/updateQuantity', (req, res) => {
    const { prodID, quantity } = req.body;
    const userID = req.params.userID;
    
    const updateQry = `
        UPDATE cart
        SET quantity = ?
        WHERE prodID = ? AND userID = ?;
    `;
    
    connection.query(updateQry, [quantity, prodID, userID], (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error updating quantity' });
        }
        res.status(200).json({ msg: 'Quantity updated successfully' });
    });
});

export {
    cartRouter
}
