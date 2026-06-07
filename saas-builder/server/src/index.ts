import dotenv from "dotenv";
dotenv.config();
import sessionRoutes
from "./routes/session.routes";
import { supabase } from "./config/supabase";
import express from "express";
import cors from "cors";
import messageRoutes
from "./routes/message.routes";

import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("Backend is running..."); });

app.use("/api/chat", chatRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/message", messageRoutes);

const PORT = 3000;

supabase
  .from("chats")
  .select("*")
  .then(({ data, error }) => {

    if (error) { console.log( "Supabase Error:", error.message );} 

    else { console.log( "Supabase Connected ✅" ); console.log(data); }
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});