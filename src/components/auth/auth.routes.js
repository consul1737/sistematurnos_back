import { Router } from "express";
import authentication from "@auth/authController";
import { attachUserId } from "@auth/auth.middleware";

const router = Router();

router.post("/signup", authentication.signUp);
router.post("/signin", authentication.signIn);
module.exports = router;
