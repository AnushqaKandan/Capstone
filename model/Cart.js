import { connection } from '../config/index.js';

class Cart {
    // Fetch all items in the cart for a specific user
    fetchCart(req, res) {
        const strQry = `
        SELECT 
            cart.cartID,
            cart.quantity,  
            Products.prodName AS prodName,
            Products.amount,
            Products.category AS category,
            (cart.quantity * Products.amount) AS total_price,
            Products.prodURL,
            Products.prodID AS prodID
        FROM 
            cart
        JOIN 
            Products ON cart.prodID = Products.prodID
        WHERE 
            cart.userID = ${req.params.userID};
        `;
    
        connection.query(strQry, (err, results) => {
            if (err) {
                res.status(500).json({
                    msg: 'Unable to fetch cart items.',
                    error: err
                });
            } else {
                res.status(200).json({
                    results
                });
            }
        });
    }

    // Add a product to the cart or update its quantity if it already exists
    addToCart(prodID, userID, res) {
        const checkProductQry = `
            SELECT * FROM cart
            WHERE prodID = ? AND userID = ?;
        `;
        
        connection.query(checkProductQry, [prodID, userID], (err, results) => {
            if (err) {
                res.status(500).json({
                    msg: 'Error while checking the cart.',
                    error: err
                });
                return;
            }
            
            if (results.length > 0) {
                // If product already exists, increase its quantity
                const updatedQuantity = results[0].quantity + 1;
                const updateQry = `
                    UPDATE cart
                    SET quantity = ?
                    WHERE prodID = ? AND userID = ?;
                `;
                
                connection.query(updateQry, [updatedQuantity, prodID, userID], (err) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Error while updating the cart.',
                            error: err
                        });
                    } else {
                        res.status(200).json({
                            msg: 'Product quantity updated in cart.'
                        });
                    }
                });
            } else {
                // If product doesn't exist, add it to the cart
                const insertQry = `
                    INSERT INTO cart (prodID, userID, quantity)
                    VALUES (?, ?, 1);
                `;
                
                connection.query(insertQry, [prodID, userID], (err) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Error while adding product to the cart.',
                            error: err
                        });
                    } else {
                        res.status(200).json({
                            msg: 'Product added to cart.'
                        });
                    }
                });
            }
        });
    }

// Remove all items
clearCart(req, res) {
    const userID = parseInt(req.params.userID, 10);
    if (isNaN(userID)) {
        return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const deleteQry = ` 
        DELETE FROM cart
        WHERE userID = ?;
    `;
    
    connection.query(deleteQry, [userID], (err) => {
        if (err) {
            console.error('Error removing all items from cart:', err);
            return res.status(500).json({ msg: 'Error removing all items from cart' });
        }
        res.status(200).json({ msg: 'All items removed from cart successfully' });
    });   
}

removeFromCart(req, res) {
    try {
        const userID = parseInt(req.params.userID, 10);
        const prodID = parseInt(req.params.prodID, 10);

        if (isNaN(userID) || isNaN(prodID)) {
            return res.status(400).json({ msg: 'Invalid user ID or product ID' });
        }

        const deleteQry = `
            DELETE FROM cart
            WHERE prodID = ? AND userID = ?;
        `;
        connection.query(deleteQry, [prodID, userID], (err) => {
            if (err) {
                console.error('Error removing product from cart:', err);
                return res.status(500).json({ msg: 'Error removing product from cart' });
            }
            res.json({ status: res.statusCode, msg: 'Product removed from cart successfully' });
        });
    } catch (e) {
        console.error('Error in removeFromCart:', e);
        res.status(500).json({ msg: e.message });
    }
}
updateCartItemQuantity(req, res) {
    const userID = parseInt(req.params.userID, 10);
    const prodID = parseInt(req.params.prodID, 10);
    const { quantity } = req.body; // Get the new quantity from the request body

    if (isNaN(userID) || isNaN(prodID) || isNaN(quantity)) {
        return res.status(400).json({ msg: 'Invalid user ID, product ID, or quantity' });
    }

    const updateQry = `
        UPDATE cart
        SET quantity = ?
        WHERE prodID = ? AND userID = ?;
    `;
    
    connection.query(updateQry, [quantity, prodID, userID], (err) => {
        if (err) {
            console.error('Error updating cart item quantity:', err);
            return res.status(500).json({ msg: 'Error updating cart item quantity' });
        }
        res.status(200).json({ msg: 'Cart item quantity updated successfully' });
    });
}

}

export {
    Cart
}