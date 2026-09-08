// สร้างแผนที่
const map = L.map('map').setView([13.7563, 100.5018], 10);

// OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const branchList = document.getElementById("branchList");
const searchInput = document.getElementById("searchInput");

let markers = [];

// แสดงข้อมูลสาขา
function renderBranches(keyword = "") {

    branchList.innerHTML = "";

    // ลบ Marker เก่า
    markers.forEach(m => map.removeLayer(m));
    markers = [];

const displayNumbers = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17];

branches
    .filter(branch =>
        branch.name.toLowerCase().includes(keyword.toLowerCase())
    )
    .forEach((branch,index) => {

            // Marker
            const marker = L.marker([branch.lat, branch.lng])
                .addTo(map)
                .bindPopup(`
                    <b>${branch.name}</b><br><br>
                    <a href="${branch.map}" target="_blank">
                        🚗 นำทาง
                    </a>
                `);

            markers.push(marker);

            // Card
            branchList.innerHTML += `
                <div class="card">
                    <h2>${displayNumbers[index]}. ${branch.name}</h2>

                    <p>🕘 เปิดทุกวัน</p>

                    <p>09:00 - 20:00</p>

                    <a href="${branch.map}" target="_blank">
                        เปิด Google Maps
                    </a>
                </div>
            `;
        });
}

// ค้นหา
searchInput.addEventListener("keyup", function () {
    renderBranches(this.value);
});

// โหลดครั้งแรก
renderBranches();
