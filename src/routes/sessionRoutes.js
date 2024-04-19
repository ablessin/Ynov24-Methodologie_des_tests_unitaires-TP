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

//with token
/**
 * 
 * /**
 * @openapi
 * /api/session/today/:
 *   get:
 *     summary: Récupère la durée restante pour la session du jour
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
 *               
 *             required:
 *               - email
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/session/endDate:
 *   put:
 *     summary: Add an endDate for a session
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
 *               sessionId:
 *                 type: string
 *                 description: l'id de session
 *               endDate:
 *                 type: date
 *                 description: La date de fin
 *               
 *             required:
 *               - sessionId
 *               - endDate
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

//with token
/**
 * 
 * /**
 * @openapi
 * /api/session/stats:
 *   get:
 *     summary: Récupère des stats sur les sessions
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
 *             required:
 *               - email
 */
router.post('/user/create', verifyToken, userController.createUser.bind(userController));

module.exports = router;