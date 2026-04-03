import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDNc5ff34417DwC5M1h28JzdBo4aWyRNsc");

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(message);
  const response = await result.response;

  res.json({ reply: response.text() });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});