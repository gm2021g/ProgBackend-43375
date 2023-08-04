import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("chat", {
      style: "style.css",
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

export default router;
