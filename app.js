var dataJadwals = {
  "jadwals": [
    {
      "senin": [],
      "selasa": [],
      "rabu": [],
      "kamis": [],
      "jum'at": [],
      "sabtu": [],
      "minggu": []
    }
  ]
}

const hari = ["minggu", "senin", "selasa", "rabu", "kamis", "jum'at", "sabtu"]
const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const calender = new Date;
const month = calender.getMonth()
const year = calender.getFullYear()
const date = calender.getDate()
const day = calender.getDay()
const now = hari[day]
const addBtn = document.getElementById("tambah")
var jadwals = JSON.parse(localStorage.getItem("jadwals")) || dataJadwals
const days = document.querySelectorAll(".day")
const tanggal = document.getElementById("tanggal")
const addForm = document.getElementById("addForm")
const items = document.getElementById("items")
const secModalInsert = document.querySelector(".section-modal-form")
const modalInsert = document.querySelector(".modal-form")
const secModalEdit = document.querySelector(".section-modal-edit")
const modalEdit = document.querySelector(".modal-edit")
const mapelInput = document.getElementById("mapel")
const waktuInput = document.getElementById("waktu")
const mapelInputEdit = document.getElementById("editmapel")
const waktuInputEdit = document.getElementById("editwaktu")

if(screen.width > 420) {
  alert("Website ini tidak kompatibel untuk resolusi diatas 420");
  window.location.replace("https://google.com")
}

tanggal.innerHTML = `${date < 10 ? "0"+date : date} ${bulan[month]} ${year}`
document.getElementById(now).classList.add("active")

days.forEach(day => {
  day.addEventListener("click", changeActive)
})

function changeActive() {
  days.forEach(day => day.classList.remove("active"))
  this.classList.add("active")
}

function renderJadwal(jadwalHari) {
  let template = ""
  jadwals.jadwals.map(jadwal => {
    jadwal[jadwalHari].map((jd, index) => {
      template += `
        <div class="item">
          <div>
            <h4>${jd.mapel}</h4>
            <p>${jd.jam}</p>
          </div>
          <div>
            <i class="fa fa-ellipsis-v" id="editBtn" data-id="${index}"></i>
            <i class="fa fa-trash" id="removeBtn" data-id="${index}"></i>
          </div>
        </div>`
    })
  })

  items.innerHTML = template
  
  const btnEdits = document.querySelectorAll("#editBtn")
  btnEdits.forEach(edit => {
    edit.addEventListener("click", editData)
  })
  
  const btnDeletes = document.querySelectorAll("#removeBtn")
  btnDeletes.forEach(del => {
    del.addEventListener("click", removeData)
  })
}

renderJadwal(now)

days.forEach(day => {
  day.addEventListener("click", changeJadwal)
})

function changeJadwal() {
  let id = this.dataset.id
  renderJadwal(id)
}

addForm.addEventListener("click", openModalInsert)

/** function openModal() {
  $(".section-modal-form").fadeIn()
  $(".modal-form").fadeIn()
  $("body").css("overflowY", "hidden")
  $(".section-modal-form").on("click", closeModal)
}**/

function openModalInsert() {
  secModalInsert.style.opacity = 1;
  modalInsert.style.opacity = 1;
  setTimeout(function() {
    secModalInsert.style.display = "block"
    modalInsert.style.display = "block"
    document.body.style.overflowY = "hidden"
  }, 200)
  addBtn.addEventListener("click", insertData)
  secModalInsert.addEventListener("click", closeModalInsert)
  
}

/**function closeModal() {
  $(".section-modal-form").fadeOut()
  $(".modal-form").fadeOut()
  $("body").css("overflowY", "scroll")
}**/

function closeModalInsert() {
  secModalInsert.style.opacity = 1;
  modalInsert.style.opacity = 1;
  secModalInsert.style.transition = "opacity 1s";
  modalInsert.style.transition = "opacity 1s";
  secModalInsert.style.opacity = 0;
  modalInsert.style.opacity = 0;
  setTimeout(function() {
    secModalInsert.style.display = "none";
    modalInsert.style.display = "none";
    document.body.style.overflowY = "scroll"
  }, 300);
  
}

function insertData() {
  let dataStore = {
    "mapel": mapelInput.value,
    "jam": waktuInput.value
  }
  
  let active = document.querySelector(".day.active")
  if (active) {
    let pageActive = active.dataset.id
    if (mapelInput.value.length < 3) {
      alert("Mapel minimal 3 karakter")
    } else if (mapelInput.value.length > 27) {
      alert("Mapel maximal 27 karakter")
    } else {
      jadwals.jadwals[0][pageActive].push(dataStore)
      storeData()
      renderJadwal(pageActive)
    }
  }
  
  dataStore = {
    "mapel": mapelInput.value = "",
    "jam": waktuInput.value = ""
  }

  closeModalInsert()

}

function openModalEdit() {
  secModalEdit.style.opacity = 1;
  modalEdit.style.opacity = 1;
  setTimeout(function() {
    secModalEdit.style.display = "block"
    modalEdit.style.display = "block"
    document.body.style.overflowY = "hidden"
  }, 200)
  secModalEdit.addEventListener("click", closeModalEdit)
}

function editData() {
  openModalEdit()
  
  editId = this.dataset.id
  let active = document.querySelector(".day.active")
  
  if (active) {
    let pageActive = active.dataset.id
    let mapelValue = jadwals.jadwals[0][pageActive][editId].mapel
    let jamValue = jadwals.jadwals[0][pageActive][editId].jam
    mapelInputEdit.value = mapelValue
    waktuInputEdit.value = jamValue
    
    document.getElementById("edit").addEventListener("click", function() {
  
      let dataEdit = {
        "mapel": mapelInputEdit.value,
        "jam": waktuInputEdit.value
      }
      
      if (mapelInputEdit.value.length < 3) {
        alert("Mapel minimal 3 karakter")
      } else if (mapelInputEdit.value.length > 27) {
        alert("Mapel maximal 27 karakter")
      } else {
        jadwals.jadwals[0][pageActive][editId] = dataEdit
        storeData()
        closeModalEdit()
        renderJadwal(pageActive)
      }
    })
  }
  
}

function closeModalEdit() {
  secModalEdit.style.opacity = 1;
  modalEdit.style.opacity = 1;
  secModalEdit.style.transition = "opacity 1s";
  modalEdit.style.transition = "opacity 1s";
  secModalEdit.style.opacity = 0;
  modalEdit.style.opacity = 0;
  setTimeout(function() {
    secModalEdit.style.display = "none";
    modalEdit.style.display = "none";
    document.body.style.overflowY = "scroll"
  }, 300);
}

function removeData() {
  let removeId = this.dataset.id
  let active = document.querySelector(".day.active")
  if (active) {
    let pageActive = active.dataset.id
    let deleteConfirm = confirm("Yakin untuk menghapus mapel: "+jadwals.jadwals[0][pageActive][removeId].mapel)
    if(deleteConfirm) {
      jadwals.jadwals[0][pageActive].splice(removeId, 1)
      storeData()
      renderJadwal(pageActive)
    }
  }
}

function storeData()  {
  localStorage.setItem("jadwals", JSON.stringify(jadwals))
}
