import express from "express";
import {sessionChecker} from "../sessionChecker.js";

import { deleteUser, getAllUser } from "./../Controlers/User.js";

const router = express.Router();

router.get("/", getAllUser);

router.delete("/user/:id", deleteUser);

export default router;
