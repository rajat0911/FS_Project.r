import express from "express";

import { supabase }
from "../config/supabase";

const router = express.Router();

router.post("/save", async (req, res) => {

  const {
    chat_id,
    role,
    content,
    timestamp,
  } = req.body;

  const { data, error } =
    await supabase
      .from("messages")
      .insert([
        {
          chat_id,
          role,
          content,
          timestamp,
        },
      ])
      .select()
      .single();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.json(data);
});

export default router;
