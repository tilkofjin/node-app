const express = require("express");
const passport = require("passport");
const router = express.Router();

/**
 * @description: Auth with Google
 * @method：GET /auth/google
 */
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/**
 * @description: Google auth callback
 * @method：GET /auth/google/callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

/**
 * @description: Logout user
 * @method：GET /auth/logout
 */
router.get("/logout",(req,res)=>{
  req.logOut()
  res.redirect('/')
})

module.exports = router;
