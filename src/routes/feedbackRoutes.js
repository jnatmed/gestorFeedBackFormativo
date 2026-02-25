const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Ruta principal
router.get('/', feedbackController.renderIndex);

// Ruta para procesar el formulario
router.post('/guardar', feedbackController.storeFeedback);

module.exports = router;