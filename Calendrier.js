// Calendrier 2026
const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const year = 2026;

  for (let month = 0; month < 12; month++) {
    const monthDiv = document.createElement("div");
    monthDiv.className = `month month-${month}`;

    // Titre du mois
    const titleDiv = document.createElement("div");
    titleDiv.className = "month-title";
    titleDiv.textContent = `${monthNames[month]} ${year}`;
    monthDiv.appendChild(titleDiv);

    // En-têtes des jours
    const headersDiv = document.createElement("div");
    headersDiv.className = "days-header";
    dayNames.forEach((dayName) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "day-name";
      dayHeader.textContent = dayName;
      headersDiv.appendChild(dayHeader);
    });
    monthDiv.appendChild(headersDiv);

    // Grille des jours
    const daysGrid = document.createElement("div");
    daysGrid.className = "days-grid";

    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0);
    // Premier jour du mois précédent pour remplir la première semaine
    const prevLastDay = new Date(year, month, 0);

    // Jours du mois précédent à afficher
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Lundi = 0
    for (let i = startDay - 1; i >= 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day other-month";
      dayDiv.textContent = prevLastDay.getDate() - i;
      daysGrid.appendChild(dayDiv);
    }

    // Jours du mois courant
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";

      // Marquer le jour actuel (14 janvier 2026)
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      dayDiv.textContent = day;
      daysGrid.appendChild(dayDiv);
    }

    // Jours du mois suivant pour compléter la dernière semaine
    const totalCells = daysGrid.children.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day other-month";
      dayDiv.textContent = day;
      daysGrid.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysGrid);
    calendar.appendChild(monthDiv);
  }
}

// Générer le calendrier au chargement de la page
document.addEventListener("DOMContentLoaded", generateCalendar);
