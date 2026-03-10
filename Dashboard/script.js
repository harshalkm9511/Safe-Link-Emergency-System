async function fetchAlerts() {
    try {
        const response = await fetch("http://localhost:5000/alerts");
        const alerts = await response.json();

        const table = document.getElementById("alertsTable");
        table.innerHTML = "";

        alerts.forEach(alert => {
            const row = `
        <tr>
          <td>${alert.id}</td>
          <td>${alert.name}</td>
          <td>${alert.message}</td>
          <td>${alert.location || "N/A"}</td>
          <td><span class="status ${alert.status}">${alert.status}</span></td>
          <td>${alert.createdAt ? new Date(alert.createdAt._seconds * 1000).toLocaleString() : "N/A"}</td>
        </tr>
      `;

            table.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
}

fetchAlerts();
setInterval(fetchAlerts, 5000);
