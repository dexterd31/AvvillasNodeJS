const btn = document.getElementById('createPdf')

function crearPdf(){
    const element = document.getElementById('document');
    const idServices = document.getElementById('numeroServicio')
    const opt = {
    margin:       [.20,.1,.1,.1],
    filename:     `${idServices.textContent}.pdf`,
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    image:        { type: 'jpeg', quality: 100 },
    html2canvas:  { scale: 1 },
    jsPDF: {
        orientation: 'l',
        unit: 'in',
        format: 'a4',
        putOnlyUsedFonts:true,
        floatPrecision: 16 // or "smart", default is 16
       }
    // jsPDF:        { unit: 'in', format: 'letter', orientation: 'l' }
    };

// New Promise-based usage:
    html2pdf(element,opt)
}

btn.addEventListener('click', crearPdf)

