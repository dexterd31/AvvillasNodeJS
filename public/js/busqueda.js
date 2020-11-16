const busqueda = document.getElementById('busqueda')

//peticion fetch
const envioData = async (url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
    });
    return response.json(); 
}

busqueda.addEventListener('click', e =>{
    e.preventDefault()
    let valor = document.getElementById('buscar')

    envioData('/busqueda', { dato : valor.value})
    .then(response => {
        if(response.error){
            document.getElementById('error').textContent= response.error
            setTimeout( () => {
                document.getElementById('error').textContent= ''
            },2000)
            
        }else{
            document.getElementById('numeroServicio').textContent= response.numeroServicio
            document.getElementById('tipoServicio').textContent= response.tipoServicio
            document.getElementById('tecnico').textContent= response.tecnico,
            document.getElementById('usuario').textContent= response.usuario
        }

        
    })



})