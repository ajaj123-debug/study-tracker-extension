chrome.runtime.sendMessage({ action: "getStudyData" }, (data) => {
  const div = document.getElementById("data");

  if (!data || Object.keys(data).length === 0) {
    div.innerText = "No data tracked yet.";
    return;
  }

  let html = "";

  for (const date in data) {
    html += `<strong>${date}:</strong><ul>`;

    const dayData = data[date];
    for (const site in dayData) {
      const mins = Math.round(dayData[site] / 60) || 1; // show at least 1 min
      html += `<li>${mins} min on ${site}</li>`;
    }

    html += `</ul>`;
  }

  div.innerHTML = html;
});
