// public/script.js

// --- Helpers ---
function safeNumber(val) {
  const n = Number(val);
  return (Number.isNaN(n) || n < 0) ? 0 : n;
}

// Attempt auto theme based on hour (optional extension)
function autoTheme() {
  try {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      // night
      document.body.style.backgroundColor = '#0b1220';
      document.body.style.color = 'white';
      console.log('Auto theme set to night based on hour:', hour);
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      console.log('Auto theme set to day based on hour:', hour);
    }
  } catch (e) {
    console.log('Auto theme failed:', e);
  }
}

// --- On page load: greeting prompt ---
window.addEventListener('DOMContentLoaded', () => {
  let studentName = prompt("Welcome to USIU! What's your first name?");
  if (!studentName) studentName = 'Friend';
  alert("Karibu, " + studentName + "!");
  console.log("Student entered name:", studentName);
  document.getElementById("greeting").textContent = "Hello, " + studentName + " 👋";

  // Set initial theme automatically (optional extra)
  autoTheme();
});

// --- Estimator function (global so index.html inline wiring works) ---
function runEstimator() {
  const daysRaw = prompt("How many days per week do you come to campus? (e.g., 3)");
  const costPerTripRaw = prompt("Average transport cost per trip in KSh? (e.g., 120)");
  const snacksPerDayRaw = prompt("Snacks per day? (e.g., 2)");
  const snackPriceRaw = prompt("Average price per snack in KSh? (e.g., 80)");

  // Validate and coerce
  const days = safeNumber(daysRaw);
  const costPerTrip = safeNumber(costPerTripRaw);
  const snacksPerDay = safeNumber(snacksPerDayRaw);
  const snackPrice = safeNumber(snackPriceRaw);

  // Calculations
  const transportWeekly = days * costPerTrip * 2; // to & from
  const snacksWeekly = days * snacksPerDay * snackPrice;
  const totalWeekly = transportWeekly + snacksWeekly;
  const save10 = totalWeekly * 0.10;
  const totalWithSavings = totalWeekly - save10;

  console.log({
    days, costPerTrip, snacksPerDay, snackPrice,
    transportWeekly, snacksWeekly, totalWeekly, totalWithSavings
  });

  // Build neat summary
  const summary = 
`Weekly Transport: KSh ${Math.round(transportWeekly)}
Weekly Snacks:    KSh ${Math.round(snacksWeekly)}
-------------------------------
Weekly Total:     KSh ${Math.round(totalWeekly)}
If you cut 10%:   KSh ${Math.round(totalWithSavings)}

Tip: Save 10% by reducing snack runs or carpooling on 1–2 days.
Generated for: [Your Student ID]`;

  document.getElementById("summary").innerText = summary;
  alert("Check your summary on the page. All details logged to console for debugging.");
}

// --- Theme toggle (uses document.body.style as required) ---
function toggleTheme() {
  const current = document.body.style.backgroundColor;
  // treat empty or 'white' as day
  if (current === '' || current === 'white') {
    document.body.style.backgroundColor = '#0b1220';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
  console.log("Theme toggled. Background now:", document.body.style.backgroundColor);
}

// --- Reset summary ---
function resetSummary() {
  document.getElementById("summary").innerText = "Run the estimator to see your weekly plan…";
  console.log("Summary reset to default.");
}
