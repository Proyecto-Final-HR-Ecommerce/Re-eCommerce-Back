const { Router } = require("express");

const {
  registerPost,
  authenticate,
  confirmUser,
  changePassword,
  forgotPassword,
  checkToken,
  newPassword,
} = require("../../controllers/login.controller");

const router = Router();

router.post("/register", registerPost);
router.post("/login", authenticate);
router.get("/confirmar/:token", confirmUser);
router.post("/olvide-password", forgotPassword);
router.get("/olvide-password/:token", checkToken);
router.post("/cambiar-password/:id", forgotPassword);
router.put("/newPassword/:token", newPassword);
router.post("/olvide-password/:token", changePassword);

module.exports = router;
