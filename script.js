const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const links = [
      ["About", "#about"],
      ["Expertise", "#expertise"],
      ["Case Studies", "#case-studies"],
      ["Diagrams", "#diagrams"],
      ["Contact", "#contact"],
    ];

    const choice = prompt(
      "Go to:\n" + links.map((l, i) => `${i + 1}) ${l[0]}`).join("\n")
    );

    const idx = Number(choice) - 1;
    if (!Number.isNaN(idx) && links[idx]) {
      location.hash = links[idx][1];
    }
  });
}
