import { Router } from "express";
import authentication from "@auth/authController";

const router = Router();

router.post("/signup", authentication.signUp);
router.post("/signin", authentication.signIn);
module.exports = router;
