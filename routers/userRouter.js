import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/home", userController.home);
router.get("/index", userController.index);
router.post("/createPost", userController.createPost);
router.post("/getUserPosts", userController.getUserPosts);
router.post("/getOnePost", userController.getOnePost);
router.post("/createComment", userController.createComment);
router.post("/likePost", userController.likePost);

export default router;
