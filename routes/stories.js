const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

/**
 * @description: Show add page
 * @method：GET /stories/add
 */
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

/**
 * @description: Process add form
 * @method：POST /stories
 */
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log("error", error);
    res.render("error/500");
  }
});

/**
 * @description: Show all stories
 * @method：GET /stories
 */
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.log("error", error);
    res.render("error/500");
  }
});

/**
 * @description: Show single stories
 * @method：GET /stories/:id
 */
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await (await Story.findById(req.params.id))
      .populated("user")
      .lean();
    if (!story) {
      return res.render("error/404");
    }
    res.render("stories/show", {
      story,
    });
  } catch (error) {
    console.log("error", error);
  }
});

/**
 * @description: Show edit page
 * @method：GET /stories/edit/:id
 */
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();
    if (!story) {
      return res.render("error/404");
    }
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.render("error/500");
  }
});

/**
 * @description: Update sotry
 * @method：PUT /stories/:id
 */
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("error/404");
    }
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("error", error);
    return res.render("error/500");
  }
});

/**
 * @description: Delete story
 * @method：DELECT /stories/:id
 */
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log("error", error);
    return res.render("error/500");
  }
});

/**
 * @description: User stories
 * @method：GET /stories/user/:usreId
 */
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.log("error", error);
    res.render("error/500");
  }
});

module.exports = router;
