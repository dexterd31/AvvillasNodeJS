const equipos = document.getElementById('cambioEquipos')
const formateos = document.getElementById('formateos')
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Cambio de equipos', 'Formateos', 'Asignaciones'],
        datasets: [{
            label: 'Numero de equipos',
            data: [Number(equipos.textContent), Number(formateos.textContent),0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})
