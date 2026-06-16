async function run() {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/notify-testimonial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: "Alice Doe",
        city: "Saint-Denis",
        projectType: "Rénovation",
        comment: "Excellent travail de la part de l'équipe."
      })
    });
    console.log(res.status, await res.text());
  } catch (err) {
    console.error(err);
  }
}
run();
