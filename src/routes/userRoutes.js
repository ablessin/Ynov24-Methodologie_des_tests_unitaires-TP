const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middleware/verifyToken');

const userController = new UserController();


//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:
 *   post:
 *     summary: Pour créer un user
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:
 *   get:
 *     summary: Pour récupérer un user
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *    
 */
router.get('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:
 *   put:
 *     summary: Pour mettre à jour un user
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:
 *   delete:
 *     summary: Pour supprimer tous les users
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/login/:
 *   post:
 *     summary: Pour la connexion d'un user
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:id:
 *   get:
 *     summary: Pour récupérer un user par son id
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/user/:id:
 *   delete:
 *     summary: Pour supprimer un user par id
 *     tags:
 *       - Gestion utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de connexion.
 *               password:
 *                 type: string
 *                 description: Le mot de passe.
 *               age:
 *                 type: integer
 *                 description: L'âge du cobaye'.
 *             required:
 *               - username
 *               - password
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));



module.exports = router;