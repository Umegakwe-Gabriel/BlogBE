import express, {Router} from "express"
import { signInUser } from "../controller/authController";


const router: Router = express.Router();

router.route(`/sign-in`).post(signInUser)
router.route(`/sign-in`).post(signInUser)
router.route(`/sign-in`).post(signInUser)
router.route(`/sign-in`).post(signInUser)
router.route(`/sign-in`).post(signInUser)
router.route(`/sign-in`).post(signInUser)

export default router;