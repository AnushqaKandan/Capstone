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
    const { userID, prodID } = req.params;
    cart.removeFromCart(userID, prodID, res);
});


// cartRouter.delete('/:prodID/:userID', (req, res) => {
//     const { prodID, userID } = req.params; // Use req.params for URL parameters

//     // Ensure that both prodID and userID are provided
//     if (!prodID || !userID) {
//         return res.status(400).json({
//             msg: 'Product ID and User ID are required.'
//         });
//     }
    
//     cart.removeFromCart(prodID, userID, res);
// });

export {
    cartRouter
}
