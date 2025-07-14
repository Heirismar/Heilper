import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mysql from "mysql2";

export const app = express();
app.use(cors());
app.use(bodyParser.json());

export let con=mysql.createConnection({
    host:"localhost",
    database:"heilper",
    user:"root",
    password:""
});

con.connect((err)=>{
    if(err) throw err;
    console.log("conexion exitosa");
});

//Rutas

// Ruta de login
app.post('/login', (req, res) => {
  const { correo, password } = req.body;

  const sql = 'SELECT * FROM usuario WHERE correo =? AND password =?';
  con.query(sql, [correo, password], (err, results) => {
    if (err) return res.status(500).send({ success: false, error: err.message });

    if (results.length > 0) {
      res.send({ success: true, correo: results[0].correo });
    } else {
      res.send({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});


//CONTACTO
app.get("/contacto", (req, res) => {
    const { correoUsuario } = req.query;
    const sql =" select * from contacto where usuario = ?";
    con.query(sql, [correoUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// POST nuevo contacto
app.post("/contacto", (req, res) => {
  const { nombre, apellido, tlf, correoUsuario } = req.body;
  const sql = `INSERT INTO contacto (nombre, apellido, tlf, usuario) VALUES (?, ?, ?, ?)`;
  con.query(sql, [nombre, apellido, tlf, correoUsuario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Contacto agregado', result });
  });
});

// PUT editar contacto
app.put("/contacto/:cod", (req, res) => {
  const cod = req.params.cod;
  const { nombre, apellido, tlf } = req.body;

  const sql = `UPDATE contacto SET nombre = ?, apellido = ?, tlf = ? WHERE cod = ?`;
  con.query(sql, [nombre, apellido, tlf, cod], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Contacto actualizado', result });
  });
});

// DELETE contacto
app.delete("/contacto/:cod", (req, res) => {
  const cod = req.params.cod;
  const sql = `DELETE FROM contacto WHERE cod = ?`;
  con.query(sql, [cod], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
    console.log(req.body);
});


//ENFERMEDAD
app.get("/enfermedad", (req, res) => {
    const { correoUsuario } = req.query;
    const sql =" select enfermedad.nombre as  nombre, usuarioenfermedad.cod as codUE from (usuarioenfermedad inner join enfermedad on usuarioenfermedad.enfermedad=enfermedad.cod) where usuario = ?";
    con.query(sql, [correoUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});
// POST nueva enfermedad
app.post("/enfermedad", (req, res) => {
    const { nombre, correoUsuario } = req.body;
    const extraerCod=`select cod from enfermedad where nombre=?`
    con.query(extraerCod, [nombre], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            // Si la enfermedad ya existe, solo se agrega la relación con el usuario
            const sql = `INSERT INTO usuarioenfermedad (enfermedad, usuario) VALUES (?, ?)`;
            con.query(sql, [result[0].cod, correoUsuario], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, message: 'Enfermedad agregada', result });
            });
        } else {
            // Si la enfermedad no existe, se agrega primero y luego se agrega la relación con el usuario
            const sql = `INSERT INTO enfermedad (nombre) VALUES (?)`;
            con.query(sql, [nombre], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                const sql = `INSERT INTO usuarioenfermedad (enfermedad, usuario) VALUES (?, ?)`;
                con.query(sql, [result.insertId, correoUsuario], (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ success: true, message: 'Enfermedad agregada', result });
                });
            });
        }
    });    
});
// PUT editar enfermedad
app.put("/enfermedad/:cod", (req, res) => {
    const codUE = req.params.cod;
    const { nombre } = req.body;
    const extraerCod=`select cod from enfermedad where nombre=?`
    con.query(extraerCod, [nombre], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            const sql = `UPDATE usuarioenfermedad SET enfermedad = ? WHERE cod = ?`;
            con.query(sql, [result[0].cod, codUE], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, message: 'Enfermedad actualizada', result });
            });
        } else {
            const sql = `INSERT INTO enfermedad (nombre) VALUES (?)`;
            con.query(sql, [nombre], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                const sql = `UPDATE usuarioenfermedad SET enfermedad = ? WHERE cod = ?`;
                con.query(sql, [result.insertId, codUE], (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ success: true, message: 'Enfermedad actualizada', result });
                });
            });
        }
    });
});
// DELETE enfermedad
app.delete("/enfermedad/:cod", (req, res) => {
    const codUE = req.params.cod;
    const sql = `DELETE FROM usuarioenfermedad WHERE cod = ?`;
    con.query(sql, [codUE], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// USUARIO
app.get("/usuario", (req, res) => {
    const { correoUsuario } = req.query;
    const sql = "SELECT (nombre, apellido, sangre,tlf, direccion) FROM usuario WHERE correo = ?";
    con.query(sql, [correoUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});
// POST nuevo usuario
app.post("/usuario", (req, res) => {
    const { nombre, apellido, tlf, direccion, sangre, correoUsuario } = req.body;
    const sql = `INSERT INTO usuario (nombre, apellido, tlf, direccion, sangre, correo) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql, [nombre, apellido, tlf, direccion, sangre, correoUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Usuario agregado', result });
    });
});
// PUT editar usuario
app.put("/usuario/:correo", (req, res) => {
    const correoUsuario = req.params.correoUsuario;
    const { nombre, apellido, tlf, direccion, sangre } = req.body;
    const sql = `UPDATE usuario SET nombre = ?, apellido = ?, tlf = ?, direccion = ?, sangre = ? WHERE correo = ?`;
    con.query(sql, [nombre, apellido, tlf, direccion, sangre, correoUsuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Usuario actualizado', result });
    }); 
});
// DELETE usuario
app.delete("/usuario/:correo", (req, res) => {
    const correo = req.params.correo;
    const sql = `DELETE FROM usuario WHERE correo = ?`;
    con.query(sql, [correo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });

});
//Servidor en el puerto 7000
app.listen(7000, () => console.log("Servidor en http://192.168.0.110:7000"));

