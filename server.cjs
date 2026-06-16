var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  const transporter = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER || "mtcrunconstruction@gmail.com",
      pass: process.env.SMTP_PASS
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const { fullName, email, phone, projectType, message } = req.body;
      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS not set, skipping actual email send (simulated success).");
        return res.status(200).json({ success: true, message: "Email simulated (SMTP not configured)" });
      }
      await transporter.sendMail({
        from: `"Site Web MTC" <${process.env.SMTP_USER || "mtcrunconstruction@gmail.com"}>`,
        replyTo: email,
        to: "mtcrunconstruction@gmail.com",
        subject: `[Site Web] Nouveau contact de ${fullName}`,
        text: `Vous avez re\xE7u un nouveau message depuis le formulaire de contact du site internet.

Nom: ${fullName}
Email: ${email}
T\xE9l\xE9phone: ${phone}
Cat\xE9gorie du projet: ${projectType}

Message:
${message}

--
Site Web MTC RUN CONSTRUCTION`
      });
      res.status(200).json({ success: true });
    } catch (e) {
      console.error("Erreur lors de l'envoi de l'email de contact:", e);
      res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/notify-testimonial", async (req, res) => {
    try {
      const { clientName, projectType, city, comment } = req.body;
      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS not set, skipping testimonial notification send (simulated success).");
        return res.status(200).json({ success: true });
      }
      await transporter.sendMail({
        from: `"Site Web MTC" <${process.env.SMTP_USER || "mtcrunconstruction@gmail.com"}>`,
        to: "mtcrunconstruction@gmail.com",
        subject: `[Site Web] Nouveau t\xE9moignage \xE0 approuver (${clientName})`,
        text: `Bonjour,

Un nouveau t\xE9moignage a \xE9t\xE9 post\xE9 sur votre site internet et est en attente d'approbation.

Client : ${clientName}
Ville : ${city}
Projet : ${projectType}

Commentaire :
"${comment}"

Rendez-vous dans l'espace d'administration (onglet "T\xE9moignages & Mod\xE9ration") pour l'approuver et l'afficher sur le site.

--
Site Web MTC RUN CONSTRUCTION`
      });
      res.status(200).json({ success: true });
    } catch (e) {
      console.error("Erreur lors de l'envoi de la notification de t\xE9moignage:", e);
      res.status(500).json({ error: e.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
