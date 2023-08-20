const requireUser = require("../middlewares/requireUsers");
const UserController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow", requireUser, UserController.followOrUnfollowController);
router.get(
  "/getFeedData",
  requireUser,
  UserController.getFeedData 
);
router.get("/getMyPost", requireUser, UserController.getMyPost);
router.get("/getUserPost", requireUser, UserController.getUserPost);
router.delete("/", requireUser, UserController.deleteMyProfile);
router.get("/getMyInfo", requireUser, UserController.getMyInfo);
router.put("/", requireUser, UserController.updateUserProfile);
router.post('/getUserProfile',requireUser, UserController.getUserProfile)

module.exports = router;
