let data = JSON.parse(localStorage.getItem('{446a3996-7d7c-48ac-93c1-5280a638fcca}'))
document.getElementById('cedula').value = data.cedula
document.getElementById('equipoActual').value = data.actual
document.getElementById('equipoRetira').value = data.retira

