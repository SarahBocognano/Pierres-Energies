const { Router }  = require('express');
const auth_controllers = require('../controllers/auth_controllers');
const router = Router();
const auth = require('../middleware/auth_middleware');

// Route qui permet d'enregistrer dans notre système les informations de connexion de l'utilisateur
router.post('/register', auth_controllers.signup);

// Route qui permet à l'utilisateur de se connecter 
router.post('/login', auth_controllers.login);

// Route qui permet de vérifier si un utilisateur est connecté ou non
router.get('/user', auth, auth_controllers.get_user);

module.exports = router;