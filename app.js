import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload'; // Corrección en el nombre del paquete
import history from 'connect-history-api-fallback';
import path from 'path';
import 'dotenv/config'; // Usa esta forma si trabajas con import



const app = express();

// Middlewares (código que se ejecuta antes de cualquier petición)
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true })); // Corrección de "useTempfiles" a "useTempFiles"
// Corrección de "_dirname" a "__dirname"
// Corrección de "_dirname" a "__dirname"

// Routes
app.use ('/', require('./routes/auth.routes'));
app.use ('/', require('./routes/administrador.routes'));
app.use ('/', require('./routes/pacientes.routes'));
app.use ('/', require('./routes/whatsapp.route'));
// middelword for veu
app.use(history());
app.use(express.static(path.join(__dirname, 'public'))); 

// Settings
app.set('port', process.env.PORT || 3002);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});
