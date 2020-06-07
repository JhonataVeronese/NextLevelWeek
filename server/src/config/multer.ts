// Arquivo para upload de imagem no backend
// comando npm install multer
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
    storege: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex'); // Gera a string aleatoria
            const fileName = `${hash}-${file.originalname}`;// Cria o nome do arquivo contatenado com o nome original
            // Chama para salvar
            callback(null, fileName);
        }
    })
};