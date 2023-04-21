import { Router } from "express";
import { cadastro, login } from "../controllers/auth.controller.js";
import { transacao } from "../controllers/transation.controller.js";

const router = Router()

router.post("/cadastro", cadastro)
router.post("/login", login)
router.post("/nova-transacao/:tipo", transacao)

export default router