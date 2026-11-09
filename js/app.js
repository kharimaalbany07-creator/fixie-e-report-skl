const KUNCI_STORAGE = 'E_REPORT_DATA';

let daftarLaporan = [];

// READ => memanggil data dari data.js
function muatData() {

    const navigasi = performance.getEntriesByType('navigation')[0];
    if (navigasi && navigasi.type === 'reload') {
        localStorage.removeItem(KUNCI_STORAGE);
    }

    const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
    if (dataTersimpan) {
        daftarLaporan = JSON.parse(dataTersimpan);
    }
    else {
        daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
        simpanData();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    muatData();
    tampikanDataTabel();
})

function tampikanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');

    if (!tabelBody) return;

    tabelBody.innerHTML = '';

    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    })
}

function buatBarisLaporan(laporan) {
    const baris = document.createElement('tr');

    baris.dataset.status = laporan.status.toLowerCase();

    baris.innerHTML = `
        <td>${laporan.pelapor}</td>
        <td>${laporan.kategori}</td>
        <td>${laporan.deskripsi}</td>
        <td><span class="badge">${laporan.status}</span></td>
        <td></td>
    `;

    return baris;
}

// CREATE
function handelFormSubmit(event) {

    event.preventDefault();

    const form = event.target
    const nama = form.reporter.value.trim();
    const kategori = form.category.value;
    const description = form.deskripsi.value.trim();

    if (!nama || !kategori || !description) {
        return console.log("Mohon lengkapi semua data!");
    }

    const laporanBaru = {
        id: `rep-${Date.now()}`,
        pelapor: nama,
        kategori: kategori,
        deskripsi: description,
        status: 'Menunggu',
    };

    //menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);

    simpanData();
    tampikanDataTabel();

    form.reset();
    Swal.fire({
        title: "Good job!",
        text: "Thank you!",
        icon: "success"
    });
}

function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan));
}