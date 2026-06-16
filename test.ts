import { db } from "./src/firebaseSetup";
import { collection, doc, setDoc } from 'firebase/firestore';

async function run() {
  try {
    const id = `testimonial-${Date.now()}`;
    const docRef = doc(db, 'testimonials', id);
    const newTestimonial = {
       clientName: "Test Name",
      projectType: "Test",
      city: "Test",
      region: "La Réunion",
      country: "France",
      comment: "Test",
      rating: 5,
      period: 'Récent',
      projectPhotos: ["https://example.com/test.jpg"]
    }
    await setDoc(docRef, { ...newTestimonial, approved: false, createdAt: Date.now() });
    console.log("Success");
  } catch (err) {
    console.error(err);
  }
}
run();
