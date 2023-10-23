import pool from "./../config.js";
import bcrypt from "bcrypt";
// import passport from "passport";
// import initialize from "./../passport-config.js";
// import res from "express/lib/response.js";



export const verifyLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await pool.query(
            "SELECT * FROM userapplicant WHERE emailUser = ?",
            [email]
        );
        if (user.length === 0) {
            res.status(401).json({message: "Aucun utilisateur trouvé"});
        }
        const validPassword = await bcrypt.compare(password, user[0].passwordUser);
        if (!validPassword) {
            res.status(401).json({message: "Mot de passe incorrect"});
        }
        res.status(200).json({message: "Utilisateur connecté"});

    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Requête échouée"});

    }
}