require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Verificamos que las variables existan
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error("❌ ERROR: Faltan SUPABASE_URL o SUPABASE_KEY en el archivo .env");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = supabase;