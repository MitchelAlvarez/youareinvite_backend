const fs = require('fs');
const path = require('path');

function updateInvitados(invitadoIdToUpdate, asistencia, numero_de_invitados) {
    console.log('updateInvitados function is running');
    const filePath = path.join(__dirname, '../public/assets/moks/invitadosList.json');
    console.log(`File path: ${filePath}`);

    const data = fs.readFileSync(filePath, 'utf8');
    const obj = JSON.parse(data);

    console.log(`Before update: ${JSON.stringify(obj, null, 2)}`);

    obj.invitados.forEach(invitado => {
        if (Number(invitado.invitado_id) === Number(invitadoIdToUpdate)) {
            console.log(`Updating: ${invitado.nombre}`);
            invitado.asistencia = asistencia;
            invitado.numero_de_invitados = numero_de_invitados;
        }
    });

    const newData = JSON.stringify(obj, null, 2);
    console.log(`After update: ${newData}`);

    fs.writeFileSync(filePath, newData, 'utf8');
}

module.exports = updateInvitados;