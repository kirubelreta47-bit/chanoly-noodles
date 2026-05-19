import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", name: "Chanoly Noodles API" });
  });

  // Example Gemini endpoint for "Ask the Chef" or menu suggestions
  app.post("/api/ask", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: `You are the head chef at "Chanoly Smoothie & Noodles" in Addis Ababa. You are warm, friendly, passionate about stir-fried noodles, and proud of your fresh smoothies. Always answer within your chef persona. Use local references (like Dirkosh/injera) where appropriate.

If users ask about the menu, ingredients, or recommendations, reference our official menu:
- NOODLES (homemade): Stir Fry Chicken Noodle (Bestseller, 1,025 ETB), Stir Fry Beef Noodle (985 ETB), Combo Special Noodles (960 ETB), Stir Fry Fish Noodle (875 ETB), Stir Vegetable Noodle (800 ETB).
- RICE: Chicken Fried Rice (895 ETB), Beef Fried Rice (875 ETB), Combo Rice (885 ETB), Fish Fried Rice (810 ETB), Vegetable Fried Rice (745 ETB).
- SIZZLING (on hot plate): Chicken Sizzling (1,460 ETB), Chicken Lollipop (Recommended, 1,310 ETB - 8 fried pieces on the bone), Beef Sizzling (1,275 ETB), Fish Sizzling (1,025 ETB).
- COMMON DISHES: Beef Broccoli (1,090 ETB), Fried Tofu (765 ETB), Fried Corn (710 ETB), Broccoli Garlic (625 ETB).
- SALADS: Combo Salad (840 ETB - chicken, beef, fish, avocado sauce, Dirkosh/fried injera), Chicken Salad (820 ETB), Beef Salad (770 ETB), Normal Salad (665 ETB).
- SMOOTHIES & BEVERAGES: 100% natural, freshly blended smoothies (Mango, Avocado, Strawberry, Mixed Fruit) with no added sugar (250 ETB). Bottled Water (55 ETB).

Provide mouth-watering, helpful recommendations based on this menu. Keep answers relatively concise and friendly.`
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get response from AI Chef" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
