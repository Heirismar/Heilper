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

//CONTACTO
app.get("/contacto", (req, res) => {
    const sql =" select * from contacto";
    con.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.post("/contacto", (req, res) => {
   const sql =`insert into contacto (id,nombre,apellido,telefono, email,direccion,fecha_ingreso, img) values ("${req.body.cedula_contacto}","${req.body.name_contacto}","${req.body.apellido_contacto}","${req.body.tlf_contacto}","${req.body.email_contacto}","${req.body.direccion_contacto}","${req.body.fecha_ingreso_contacto}", "${req.body.img_contacto}")`;
    con.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
    console.log(req.body);
});

app.put("/contacto", (req, res) => {
    const sql = `update contacto set ${req.body.propiedad_contacto} = ? where id = ?`;
    con.query(sql, [req.body.contacto_nuevo_valor, req.body.cedula_contacto_modificar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.delete("/contacto", (req, res) => {
   const sql =`delete from contacto where (id) = ("${req.body.delete_cedula_contacto}")`;
    con.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
    console.log(req.body);
});

//Servidor en el puerto 7000
app.listen(7000, () => console.log("Servidor en http://192.168.0.110:7000"));

