const supabase = require('../config/supabase');

exports.renderIndex = async (req, res) => {
    try {
        // 1. Traer lista de estudiantes para el desplegable (Select)
        const { data: estudiantes, error: errorEst } = await supabase
            .from('estudiantes')
            .select('*')
            .order('nombre', { ascending: true });

        // 2. Traer historial de feedbacks con el nombre del estudiante
        const { data: feedbacks, error: errorFeed } = await supabase
            .from('feedbacks')
            .select(`
                *,
                estudiantes ( nombre )
            `)
            .order('id', { ascending: false });

        if (errorEst || errorFeed) throw errorEst || errorFeed;

        // 3. Renderizar la vista Twig pasando los datos
        res.render('index.twig', { 
            titulo: "Gestor de Feedback Formativo", 
            estudiantes, 
            feedbacks 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor: " + error.message);
    }
};

exports.storeFeedback = async (req, res) => {
    try {
        const { estudiante_id, categoria, comentario, tipo_feedback } = req.body;
        
        const { error } = await supabase
            .from('feedbacks')
            .insert([{ 
                estudiante_id: parseInt(estudiante_id), 
                categoria, 
                comentario, 
                tipo_feedback 
            }]);

        if (error) throw error;
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error al guardar: " + error.message);
    }
};