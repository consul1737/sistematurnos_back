import pool from "../database/keys";

export async function loadAuthState(sessionId) {
  try {
    const res = await pool.query(
      "SELECT auth_state FROM sessions WHERE session_id = $1",
      [sessionId]
    );
    return res.rows.length ? res.rows[0].auth_state : null;
  } catch (err) {
    console.error("Error cargando auth_state:", err);
    return null;
  }
}

export async function saveAuthState(sessionId, state) {
  try {
    const stateJson = JSON.stringify(state);
    await pool.query(
      `INSERT INTO sessions (session_id, auth_state, last_updated)
       VALUES ($1, $2, NOW())
       ON CONFLICT (session_id)
       DO UPDATE SET auth_state = $2, last_updated = NOW()`,
      [sessionId, stateJson]
    );
  } catch (err) {
    console.error("Error guardando auth_state:", err);
  }
}

export async function deleteAuthState(sessionId) {
  try {
    await pool.query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
  } catch (err) {
    console.error("Error eliminando auth_state:", err);
  }
}
