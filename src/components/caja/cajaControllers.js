import pool from "../database/keys";

export const getVistaCaja = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vw_turnos_pendientes");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener turnos pendientes",
      error: error.message
    });
  }
};
