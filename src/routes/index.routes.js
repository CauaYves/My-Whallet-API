import { Router } from "express";
import { cadastro, login } from "../controllers/auth.controller.js";
import { transacao } from "../controllers/transation.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { loginSchema, registerSchema } from "../schema/user.schema.js";

const router = Router()

router.post("/cadastro", validateSchema(registerSchema) ,cadastro)
router.post("/login", login)
router.post("/nova-transacao/:tipo", transacao)

export default router