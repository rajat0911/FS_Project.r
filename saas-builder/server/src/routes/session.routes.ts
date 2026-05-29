import express from "express";

import { supabase }
from "../config/supabase";

const router = express.Router();

router.get("/create", async (req, res) => {

  const { data, error } =
    await supabase
      .from("chats") .insert([ { title: "New SaaS Session", }, ]) .select() .single();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  res.json(data);
});
export default router;