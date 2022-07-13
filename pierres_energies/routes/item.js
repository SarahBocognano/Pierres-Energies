const { Router } = require('express');
const item_controllers = require('../controllers/item_controllers');
const router = Router();

// Route qui permet de récupérer les items du serveur
router.get('/items', item_controllers.get_items);

// Route qui permet d'ajouter de nouveau items à la base de données
router.post('/items', item_controllers.post_item);

// Route qui permet de modifier un item déjà existant dans la base de données
router.put('/items/:id', item_controllers.update_item);

// Route qui permet de supprimer un item de la base de données
router.delete('/items/:id', item_controllers.delete_item);

module.exports = router;