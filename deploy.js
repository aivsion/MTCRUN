import * as ftp from "basic-ftp";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    console.log("Connexion au serveur FTP Hostinger...");
    await client.access({
      host: "92.113.28.71",
      user: "u323560890",
      password: "Mtcrun974@",
      secure: false
    });
    console.log("Connecté ! Préparation du dossier public_html...");
    
    // On s'assure d'être dans le bon répertoire
    await client.ensureDir("domains/mtcrun.re/public_html");
    
    console.log("Nettoyage des anciens fichiers...");
    await client.clearWorkingDir();
    
    console.log("Upload du dossier dist local...");
    await client.uploadFromDir(path.join(__dirname, "dist"));
    
    console.log("Déploiement terminé avec succès ! 🎉");
  } catch (err) {
    console.error("Erreur lors du déploiement :", err);
  } finally {
    client.close();
  }
}

deploy();
