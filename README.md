**Archivo 1: Introducción**

# Aplicación de Asistencia a Turnos

## Resumen

La aplicación es una herramienta de asistencia para turnos en un consultorio médico. Permite a los pacientes programar turnos con sus médicos, mientras que el personal del consultorio puede gestionar la disponibilidad y realizar notificaciones de WhatsApp.

### Características clave:

- Programación de turnos con paciencia
- Gestión de disponibilidad para personal del consultorio
- Notificación de WhatsApp al paciente

**Archivo 2: Configuración**

## Configuración del Entorno

La aplicación requiere las siguientes variables de entorno configuradas:

| VARIABLE     | VALOR                                                |
| ------------ | ---------------------------------------------------- |
| COUNTRY_CODE | Código de país (por ejemplo, 54 para Argentina)      |
| HOST         | Dirección del servidor                               |
| PORTDB       | Puerto del servidor de base de datos                 |
| USER         | Usuario de conexión a la base de datos               |
| PASSWORD     | Contraseña de usuario de conexión a la base de datos |
| DATABASE     | Nombre de la base de datos                           |

**Archivo 3: Archivos y estructura**

## Estructura del Proyecto

### La aplicación se encuentra organizada en los siguientes archivos:

- `controllers:` Contiene las rutas de control para la aplicación.
- `models:` Contiene las definiciones de modelos para la base de datos.
- `utils:` Contiene funciones útiles para la aplicación.
- `index.html:` La página inicial de la aplicación.

**Archivo 4: Funcionalidad del Servidor**

## Creación de un turno

La función crearTurno en el archivo controllers/turnos.js permite crear un nuevo turno con los siguientes parámetros:

| PARÁMETRO      | TIPO                                  | DESCRIPCIÓN |
| -------------- | ------------------------------------- | ----------- |
| id_paciente    | String Identificador del paciente.    |
| fecha          | Date Fecha de la cita.                |
| hora           | Time Hora de la cita.                 |
| id_tratamiento | String Identificador del tratamiento. |
| d_consultorio  | String Identificador del consultorio. |

La función devuelve un mensaje de creación exitosa si el turno se crea correctamente, o un error si no.

**Archivo 5: Funcionalidad del WhatsApp**

## Enviar mensajes

La función sendMessage en el archivo controllers/whatsapp.js permite enviar un mensaje a un paciente mediante WhatsApp. Requiere la conexión con el cliente de WhatsApp y los datos necesarios para personalizar el mensaje.

| PARÁMETRO   | TIPO   | DESCRIPCIÓN                                   |
| ----------- | ------ | --------------------------------------------- |
| mensajeBase | String | Mensaje base para personalizar.               |
| turnoData   | Objeto | Datos del turno para personalizar el mensaje. |

La función envía el mensaje al paciente y devuelve un mensaje de éxito si se envía correctamente, o un error si no.

**Archivo 6: Aplicación Completa**

Uso de la Aplicación
Para utilizar la aplicación, sigue los siguientes pasos:

1. Conecta con el servidor utilizando las credenciales de conexión proporcionadas.
2. Crea un nuevo turno en la base de datos utilizando la función crearTurno.
3. Envia un mensaje al paciente mediante WhatsApp utilizando la función sendMessage.

**Archivo 7: Package.json**

## Proyecto: pevn-be

### Descripción

**pevn-be** es una aplicación backend desarrollada con Node.js que utiliza diversas herramientas para gestionar su funcionamiento y despliegue.

## Información del Proyecto

- **Nombre:** pevn-be
- **Versión:** 1.0.0
- **Autor:** (pendiente de completar)
- **Licencia:** ISC

## Scripts Disponibles

Los siguientes scripts están definidos en el archivo `package.json`:

### Desarrollo

- `dev`: Inicia la aplicación utilizando `nodemon` para recargar automáticamente los cambios.

  ```bash
  npm run dev
  ```

- `babel`: Ejecuta la aplicación con `babel-node` a través de `nodemon`.
  ```bash
  npm run babel
  ```

### Construcción y Producción

- `build`: Compila los archivos del proyecto a JavaScript compatible utilizando Babel, excluyendo `node_modules`.

  ```bash
  npm run build
  ```

- `start`: Inicia la aplicación desde la carpeta `dist` después de la compilación.
  ```bash
  npm start
  ```

### Gestión con PM2

- `pm2:start`: Inicia la aplicación con PM2 y asigna el nombre "mi-backend" al proceso.

  ```bash
  npm run pm2:start
  ```

- `pm2:restart`: Reinicia la aplicación gestionada por PM2.

  ```bash
  npm run pm2:restart
  ```

- `pm2:stop`: Detiene la aplicación gestionada por PM2.

  ```bash
  npm run pm2:stop
  ```

- `pm2:logs`: Muestra los registros de la aplicación gestionada por PM2.

  ```bash
  npm run pm2:logs
  ```

- `pm2:monit`: Muestra información en tiempo real de la aplicación gestionada por PM2.
  ```bash
  npm run pm2:monit
  ```

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **chrome-aws-lambda:** `^10.1.0`
- **connect-history-api-fallback:** `^2.0.0`
- **cors:** `^2.8.5`
- **date-fns:** `^4.1.0`
- **dotenv:** `^16.4.7`
- **express:** `^4.21.0`
- **express-fileupload:** `^1.5.1`
- **fileupload:** `^1.0.0`
- **moment:** `^2.30.1`
- **morgan:** `^1.10.0`
- **pg:** `^8.13.1`
- **puppeteer-core:** `^10.4.0`
- **qrcode:** `^1.5.4`
- **qrcode-terminal:** `^0.12.0`
- **whatsapp-web.js:** `^1.26.0`

## Dependencias de Desarrollo

Estas son las herramientas utilizadas en el entorno de desarrollo:

- **@babel/cli:** `^7.26.4`
- **@babel/core:** `^7.26.0`
- **@babel/node:** `^7.26.0`
- **@babel/preset-env:** `^7.26.0`
- **nodemon:** `^3.1.9`

## Instalación

1. Clona este repositorio.

   ```bash
   git clone <repositorio-url>
   ```

2. Instala las dependencias.

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`.

## Uso

1. Para iniciar en modo desarrollo:

   ```bash
   npm run dev
   ```

2. Para construir y ejecutar en producción:

   ```bash
   npm run build
   npm start
   ```

3. Para gestionar la aplicación con PM2, utiliza los scripts correspondientes.

## Notas

- Asegúrate de tener configurado PM2 si deseas utilizar los scripts relacionados con este gestor de procesos.
- Puedes personalizar el archivo `.env` según las necesidades de tu proyecto.
