const table = document.getElementById('table')

table.addEventListener('click', e => {
    if(e.target.tagName === 'A'){
        const cedula = e.target.parentElement.parentElement.childNodes[0].textContent
        
    }
})