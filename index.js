const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const updateInvitados = require('./updateInvitados');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

db = mysql.createConnection({
    host: 'youareinvite.com',
    user: 'zbnfekkk_mitAdmin',
    password: 'Mit20Nor+',
    database: 'zbnfekkk_MITDT',
    conconstnectTimeout: 10000 // 10 segundos
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});

app.get('/api/data', (req, res) => {
    let num_invitados = req.query.num_invitados;
    let sql = 'SELECT c.invitado_id, i.nombre, c.num_invitados_max FROM INV_Confirmacion as c, INV_Invitados as i WHERE c.invitado_id = i.invitado_id';

    if (num_invitados) {
        // Asegúrate de que num_invitados es un número
        num_invitados = parseInt(num_invitados, 10);

        if (isNaN(num_invitados)) {
            return res.status(400).json({ error: 'Invalid num_invitados' });
        }

        sql += ' WHERE num_invitados = ?';
    }

    db.query(sql, num_invitados, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(results);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/updateInvitados', (req, res) => {
    const { invitadoIdToUpdate, asistencia, numero_de_invitados } = req.body;
    updateInvitados(db, invitadoIdToUpdate, asistencia, numero_de_invitados);
    res.json({ message: 'Invitados updated successfully' });
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime la pila de llamadas del error
    res.status(500).send('Something broke!');
});

