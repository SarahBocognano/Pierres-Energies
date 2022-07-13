const { Router } = require('express');
const router = Router();
const orderController = require('../controllers/order_controllers');

// Route qui permet de recevoir une requête de toute les commandes
router.get('/order/:id', orderController.get_orders);

// Route qui permet de de trouver un utilisateur et de créer une nouvelle commandes
router.post('/order/:id', orderController.checkout);

module.exports = router;