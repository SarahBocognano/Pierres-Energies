const { Router } = require('express');
const router = Router();
const cartController = require('../controllers/cart_controllers')

// Route qui permet de recevoir une requête avec tout les items du panier d'un utilisateur
router.get('/cart/:id', cartController.get_cart_items);

// Route qui permet d'ajouter un item au panier
router.post('/cart/:id', cartController.add_cart_item);

// Route qui permet de supprimer un item du panier
router.delete('/cart/:id', cartController.remove_cart_item);

module.exports = router;