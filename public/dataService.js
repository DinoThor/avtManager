const sqlite3 = require('sqlite3').verbose();


function getAllPromise(filename, query, params) {
  const db = new sqlite3.Database(filename);
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) reject(err);
      resolve(rows);
    })
  })
}

async function valueUsers(filename) {
  
  try {
    let av_query = 'SELECT * from AV';
    let session_query = 'SELECT * from sesion';

    const AV_raw = await getAllPromise(filename, av_query, []);
    const session = await getAllPromise(filename, session_query, []);

    return {
      AV: AV_raw.map((a) => { return [a.arousal, a.valence] }),
      sesiones: session
    };

  } catch (error) { throw error; }
}

module.exports = { valueUsers };
