document.addEventListener("DOMContentLoaded", () => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardContainer = document.getElementById("leaderboardContainer");

    leaderboardContainer.innerHTML = `
        <h1>Leaderboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                ${leaderboard.map((entry, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.score}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <button onclick="window.location.href='index1.html'">Back to Menu</button>
    `;
});
