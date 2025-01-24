import pool from '../database/keys';

const authentication = {}; // Corrección de nombre

// Función para registrar un cliente
authentication.signUp = async (req, res) => {
  const { nombre, email, telefono, direccion, ciudad, pais,password, rol_id } = req.body;

    try {
    // Consulta para insertar un nuevo cliente en la base de datos
    await pool.query(
      'INSERT INTO usuarios(nombre, email, telefono, direccion, ciudad, pais, password, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)',
      [nombre, email, telefono, direccion, ciudad, pais, password, rol_id]
    );

    // Respuesta exitosa
    res.status(200).json({
      message: 'Ingreso bien',
    });
  } catch (error) {
    console.log("Error al insertar", error);
    res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};



// Función para iniciar sesión
authentication.signIn = async (req, res) => {
  const { email, password } = req.body; // Corrección de nombres
  try {
    const usuario = await (await pool.query(
      'SELECT * FROM usuarios WHERE email=$1 AND password=$2', // Corrección en la consulta SQL
      [email,password])).rows
    ;
    if (usuario.length > 0) {
      res.status(200).json({
      id:usuario[0].id,
      nombre:usuario[0].nombre,
      email:usuario[0].email
    });}
   else {
    res.status(200).json({
      message: "the user does not exist",
      NotFound: true,
    });

   }
  } catch (error) {
    console.log("Error en signIn", error);
    res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};

module.exports = authentication; // Exportación con el nombre corregido
