// ==========================
// 🔥 ANTI SPAM 24H
// ==========================
const lastSent = localStorage.getItem("lastSend");

if (lastSent) {
    const diff = Date.now() - Number(lastSent);
    if (diff < 24 * 60 * 60 * 1000) {
        alert("❗ Vous avez déjà envoyé une candidature. Vous devez attendre 24h.");
    }
}

// ==========================
// PAGE 1 → PAGE 2
// ==========================
document.getElementById("nextBtn").addEventListener("click", () => {

    if (
        document.getElementById("pseudo").value.trim() === "" ||
        document.getElementById("age").value.trim() === ""
    ) {
        alert("Veuillez remplir au minimum PSEUDO + ÂGE.");
        return;
    }

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
});

// ==========================
// RETOUR PAGE 1
// ==========================
document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("page1").style.display = "block";
    document.getElementById("page2").style.display = "none";
});

// ==========================
// ENVOI WEBHOOK
// ==========================
document.getElementById("sendBtn").addEventListener("click", () => {

    const data = {
        pseudo: pseudo.value,
        prenom: prenom.value,
        age: age.value,
        dispo: dispo.value,
        poste: document.querySelector("input[name='poste']:checked")?.value || "Non précisé",
        motive: motive.value,
        pourquoi: pourquoi.value,
        qualites: qualites.value,
        definition: definition.value,
        experience: experience.value,
        autre: autre.value
    };

    const webhook = "https://discord.com/api/webhooks/1447005556635209899/tb29lQPMnF47DCR1w2BqQzXujui3qYhEVsY45GhJ9726gvlNfhTQ5cWSuwMXNZGHjgCy";

    fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            embeds: [{
                title: "📩 Nouvelle Candidature Staff",
                color: 0xff0000,
                fields: Object.keys(data).map(k => ({
                    name: k,
                    value: data[k] || "Non rempli"
                }))
            }]
        })
    });

    // Sauvegarde anti-spam 24h
    localStorage.setItem("lastSend", Date.now().toString());

    alert("🎉 Votre candidature a été envoyée !");
});
