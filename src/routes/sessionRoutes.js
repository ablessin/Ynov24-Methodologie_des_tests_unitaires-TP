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
 * /api/session/:
 *   post:
 *     summary: Pour créer une session
 *     tags:
 *       - Gestion de session
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
 * /api/session/:
 *   get:
 *     summary: Pour récupérer toutes les sessions
 *     tags:
 *       - Gestion de session
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
 * /api/session/:
 *   put:
 *     summary: Pour modifier une session
 *     tags:
 *       - Gestion de session
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
 * /api/session/:
 *   delete:
 *     summary: Pour supprimer toutes les sessions
 *     tags:
 *       - Gestion de session
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
 * /api/session/:id:
 *   get:
 *     summary: Pour récupérer une session par son id
 *     tags:
 *       - Gestion de session
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
 * /api/session/:id:
 *   delete:
 *     summary: Pour supprimer une session par son id
 *     tags:
 *       - Gestion de session
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