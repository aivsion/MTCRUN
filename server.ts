import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import nodemailer from "nodemailer";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'mtcrunconstruction@gmail.com',
      pass: process.env.SMTP_PASS,
    },
  });

  // API Route for sending contact email
  app.post("/api/contact", async (req, res) => {
    try {
      const { fullName, email, phone, projectType, message } = req.body;
      
      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS not set, skipping actual email send (simulated success).");
        return res.status(200).json({ success: true, message: "Email simulated (SMTP not configured)" });
      }

      await transporter.sendMail({
        from: `"${fullName}" <${process.env.SMTP_USER || 'mtcrunconstruction@gmail.com'}>`, // Gmail often rewrites 'from' to authenticated user anyway, so we just format it nicely. We can add replyTo.
        replyTo: email,
        to: 'mtcrunconstruction@gmail.com',
        subject: `Nouveau contact MTC RUN : ${projectType} - ${fullName}`,
        text: `Nom: ${fullName}\nEmail: ${email}\nTéléphone: ${phone}\nProjet: ${projectType}\n\nMessage:\n${message}`,
      });
      res.status(200).json({ success: true });
    } catch (e: any) {
      console.error("Erreur lors de l'envoi de l'email de contact:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // API Route for notifying admin of a new testimonial
  app.post("/api/notify-testimonial", async (req, res) => {
    try {
      const { clientName, projectType, city, comment } = req.body;

      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS not set, skipping testimonial notification send (simulated success).");
        return res.status(200).json({ success: true });
      }

      await transporter.sendMail({
        from: `"MTC RUN Website" <${process.env.SMTP_USER || 'mtcrunconstruction@gmail.com'}>`,
        to: 'mtcrunconstruction@gmail.com',
        subject: `[A APPROUVER] Nouveau témoignage de ${clientName}`,
        text: `Bonjour,\n\nUn nouveau témoignage a été posté sur votre site internet et est en attente d'approbation.\n\nClient : ${clientName}\nVille : ${city}\nProjet : ${projectType}\n\nCommentaire :\n"${comment}"\n\nRendez-vous dans l'espace administration (onglet Témoignages) pour l'approuver ou le refuser.\n\nCordialement,\nVotre site web MTC RUN`,
      });
      res.status(200).json({ success: true });
    } catch (e: any) {
      console.error("Erreur lors de l'envoi de la notification de témoignage:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // API Route for AI analysis of photos
  app.post("/api/analyze-photos", async (req, res) => {
    try {
      const { images } = req.body;
      if (!images || images.length === 0) {
        return res.status(400).json({ error: "No images provided" });
      }

      const parts = images.map((base64: string) => ({
        inlineData: {
          mimeType: base64.split(';')[0].replace('data:', ''),
          data: base64.split(',')[1],
        }
      }));

      parts.push({
        text: "Analyse the provided construction photos and automatically extract/generate structured information for the building project form in French. Categorize appropriately."
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts },
        config: {
          systemInstruction: "Tu es un expert en bâtiment et conception de structures (spécialiste de La Réunion si caractéristique). Ton but est d'analyser des photos de chantier pour pré-remplir un formulaire avec: titre, catégorie, nom du chantier, localisation (probablement La Réunion, tu peux être vague ou spécifique si tu reconnais l'endroit), et description de l'ouvrage.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Titre court et descriptif de la réalisation technique (ex: Charpente apparente en bois exotique).",
              },
              category: {
                type: Type.STRING,
                description: "Catégorie parmi: 'CHARPENTE BOIS', 'AMÉNAGEMENTS BOIS', 'GROS ŒUVRE', 'MENUISERIE BOIS' ou 'AUTRES PROJETS'."
              },
              chantierName: {
                type: Type.STRING,
                description: "Nom suggéré pour le chantier (ex: Rénovation Villa Saint-Paul).",
              },
              location: {
                type: Type.STRING,
                description: "Lieu estimé ou général, souvent La Réunion (ex: La Réunion, ou Saint-Denis si identifiable).",
              },
              description: {
                type: Type.STRING,
                description: "Description technique et qualitative détaillée de l'ouvrage, en valorisant le savoir-faire de construction. 2 à 3 phrases max.",
              }
            },
            required: ["title", "category", "chantierName", "location", "description"]
          }
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("No text returned by AI");
      
      const cleanText = text.replace(/^```(json)?|```$/gm, '').trim();
      const parsed = JSON.parse(cleanText);
      res.json(parsed);
      
    } catch (e: any) {
      console.error("AI Generation Error:", e);
      res.status(500).json({ error: e.message || "Something went wrong analyzing photos", stack: e.stack });
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
    // For React Router or SPAs
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
