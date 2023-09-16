class Pendaftar {
    constructor(nama, umur, uangSaku) {
        this.nama = nama;
        this.umur = umur;
        this.uangSaku = uangSaku;
    }
}

class Pendaftaran {
    constructor() {
        this.pendaftar = [];
    }

    tambahPendaftar(nama, umur, uangSaku) {
        this.pendaftar.push(new Pendaftar(nama, umur, uangSaku));
    }

    hitungRataRata() {
        if (this.pendaftar.length === 0) {
            return { rataUangSaku: 0, rataUmur: 0 };
        }

        const totalUmur = this.pendaftar.reduce((sum, p) => sum + p.umur, 0);
        const totalUangSaku = this.pendaftar.reduce((sum, p) => sum + p.uangSaku, 0);
        const rataUangSaku = totalUangSaku / this.pendaftar.length;
        const rataUmur = totalUmur / this.pendaftar.length;

        return { rataUangSaku, rataUmur };
    }
}

const pendaftaran = new Pendaftaran();

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const umurInput = document.getElementById('umur').value;
    const uangSakuInput = document.getElementById('uang-saku').value;

    // Validasi input umur
    if (!umurInput.match(/^\d+$/) || umurInput < 25) {
        alert('Umur tidak valid. Silakan periksa kembali.');
        return;
    }
    const umur = parseInt(umurInput);

    // Validasi input uang saku
    if (!uangSakuInput.match(/^\d+$/) || uangSakuInput < 100000 || uangSakuInput > 1000000) {
        alert('Uang saku tidak valid. Silakan periksa kembali.');
        return;
    }
    const uangSaku = parseInt(uangSakuInput);

    // Validasi nama
    if (nama.length < 10) {
        alert('Nama terlalu pendek. Nama harus minimal 10 karakter.');
        return;
    }

    pendaftaran.tambahPendaftar(nama, umur, uangSaku);

    document.getElementById('nama').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('uang-saku').value = '';

    updateListPendaftar();
});

function updateListPendaftar() {
    const table = document.getElementById('tabel-list-pendaftar');
    table.innerHTML = '';

    const { rataUangSaku, rataUmur } = pendaftaran.hitungRataRata();

    document.getElementById('rata-rata-uang-saku').textContent = rataUangSaku.toFixed(2);
    document.getElementById('rata-rata-umur').textContent = rataUmur.toFixed(2);

    pendaftaran.pendaftar.forEach((p) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = p.nama;
        cell2.textContent = p.umur;
        cell3.textContent = p.uangSaku;
    });
}
document.addEventListener("DOMContentLoaded", function () {
  // Menambahkan event listener ke tab List Pendaftar
  document
    .getElementById("list-pendaftar-tab")
    .addEventListener("click", function () {
      // Sembunyikan form registrasi
      document.getElementById("registrasi").style.display = "none";
      // Tampilkan tabel List Pendaftar
      document.getElementById("list-pendaftar").style.display = "block";
    });

  // Menambahkan event listener ke tab Registrasi
  document
    .getElementById("registrasi-tab")
    .addEventListener("click", function () {
      // Sembunyikan tabel List Pendaftar
      document.getElementById("list-pendaftar").style.display = "none";
      // Tampilkan form registrasi
      document.getElementById("registrasi").style.display = "block";
    });
});

