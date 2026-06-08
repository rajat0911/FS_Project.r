import express from "express";

import { supabase } from "../config/supabase";

import {
  sendThankYouEmail,
} from "../services/email.service";

const router = express.Router();

/* -------------------------------- */

router.post("/", async (req, res) => {

  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {

      return res.status(400).json({
        error: "All fields are required.",
      });

    }

    /* SAVE TO SUPABASE */

    const {
      data,
      error,
    } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          subject,
          message,
        },
      ])
      .select()
      .single();

    if (error) {

      console.log(error);

      return res.status(500).json({
        error: error.message,
      });

    }

    /* SEND THANK-YOU EMAIL */

    await sendThankYouEmail(
      name,
      email,
      subject,
      message
    );

    return res.json({
      success: true,
      submission: data,
    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({
      error: "Failed to process contact form.",
    });

  }

});

export default router;