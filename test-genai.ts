import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  try {
    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    console.log("Testing gemini-2.5-flash...");
    let response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "hello",
    });
    console.log("Response:", response.text);
  } catch (e: any) {
    console.error("Error with gemini-2.5-flash:", e.message);
  }

  try {
    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    console.log("Testing gemini-3-flash-preview...");
    let response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "hello",
    });
    console.log("Response:", response.text);
  } catch (e: any) {
    console.error("Error with gemini-3-flash-preview:", e.message);
  }
}

test();
