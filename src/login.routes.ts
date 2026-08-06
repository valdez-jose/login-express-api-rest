
import { Router } from "express";
import { pool } from "./database.js";

const router = Router();


// POST - Guardar usuario
router.post("/login", async (req, res) => {

    try {

        const { nombre, correo, password, mensaje } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                error: "Faltan datos"
            });
        }

        const resultado = await pool.query(
            `
            INSERT INTO usuarios(nombre, correo, password, mensaje)
            VALUES($1,$2,$3,$4)
            RETURNING *
            `,
            [
                nombre,
                correo,
                password,
                mensaje
            ]
        );

        res.json({
            mensaje: "Usuario guardado correctamente",
            usuario: resultado.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar usuario"
        });
    }

});


// GET - Obtener usuarios
router.get("/usuarios", async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM usuarios"
        );

        res.json(resultado.rows);

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener usuarios"
        });
    }

});

// POST - Login usuario
router.post("/login", async (req, res) => {

    try {

        const { correo, password } = req.body;


        if (!correo || !password) {

            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });

        }


        const resultado = await pool.query(
            `
            SELECT *
            FROM usuarios
            WHERE correo = $1
            AND password = $2
            `,
            [
                correo,
                password
            ]
        );


        if (resultado.rows.length === 0) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }


        res.json({

            mensaje: "Login correcto",

            usuario: resultado.rows[0]

        });


    } catch (error) {


        console.error(error);


        res.status(500).json({

            mensaje: "Error del servidor"

        });


    }

});

// DELETE - Eliminar usuario
router.delete("/usuarios/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `
            DELETE FROM usuarios
            WHERE id=$1
            RETURNING *
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario eliminado correctamente",
            usuario: resultado.rows[0]
        });

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar usuario"
        });
    }

});


export default router;
