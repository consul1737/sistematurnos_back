import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import history from 'connect-history-api-fallback';
import path from 'path';
import 'dotenv/config'; // Usa esta forma si trabajas con import

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/administrador.routes'));
app.use('/', require('./routes/pacientes.routes'));
app.use('/', require('./routes/whatsapp.route'));

// Middleware for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Settings

const PORT = process.env.PORT || 3003;

app.set('port', PORT);
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
