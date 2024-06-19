function updateInvitados(db, invitadoIdToUpdate, asistencia, numero_de_invitados) {
    console.log('updateInvitados function is running');

    // Actualizar la base de datos
    db.query(
        'UPDATE INV_Confirmacion SET confirmacion = ?, num_invitados = ?, fecha_confirmacion = NOW() WHERE invitado_id = ?',
        [asistencia, numero_de_invitados, invitadoIdToUpdate],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating database: ', error);
                return;
            }

            console.log(`Rows affected: ${results.affectedRows}`);
        }
    );
}

module.exports = updateInvitados;