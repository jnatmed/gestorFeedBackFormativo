const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Configuración del Motor de Plantillas (Twig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// 2. Middlewares (Para que Express entienda los datos de los formularios)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Servir archivos estáticos (opcional, para CSS/Imágenes en el futuro)
app.use(express.static(path.join(__dirname, '../public')));

// 4. Importar las Rutas
const feedbackRoutes = require('./routes/feedbackRoutes');

// 5. Usar las Rutas
app.use('/', feedbackRoutes);

// 6. Lanzar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ==================================================
    🚀 Servidor corriendo con éxito!
    🔗 URL local: http://localhost:${PORT}
    📡 Conectado a Supabase: ${process.env.SUPABASE_URL ? 'SÍ' : 'Faltan credenciales'}
    ==================================================
    `);
});