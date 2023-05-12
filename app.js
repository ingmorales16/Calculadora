const apiKey = 'aquí va tu clave de API';
const apiUrl = `https://www.dolarsi.com/api/api.php?type=valoresprincipales`;

// Verificamos si hoy es sábado o domingo
const hoy = new Date();
const diaSemana = hoy.getDay(); // 0 representa el día domingo y 6 representa el día sábado en JavaScript

// Obtenemos la cantidad de días a restar según el día de la semana
let diasARestar;
if (diaSemana === 6) {
  diasARestar = 1; // Si hoy es sábado, restamos un día
} else if (diaSemana === 0) {
  diasARestar = 2; // Si hoy es domingo, restamos dos días
} else {
  diasARestar = 0; // Si hoy es otro día, no restamos ningún día
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // En la respuesta de la API, buscamos la información del dólar blue
    const dolarBlue = data.find(item => item.casa.nombre === 'Dolar Blue');
    const precioVenta = dolarBlue.casa.venta;

    // Obtenemos la fecha actual y restamos los días correspondientes
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - diasARestar);
    const fechaActualString = fechaActual.toLocaleDateString();

    // Mostramos el precio y la fecha de actualización del dólar blue en nuestra página web
    const precioElement = document.getElementById('precio-dolar');
    const fechaElement = document.getElementById('fecha-actualizacion');
    precioElement.textContent = `$${precioVenta}`;
    fechaElement.textContent = fechaActualString;
  })
  .catch(error => console.error(error));

  function calcularIngreso() {
    const cotizacionDolar = parseFloat(document.getElementById('precio-dolar').textContent.replace('$',''));
  
    //variables del formulario
    const horaslaborables = parseFloat(document.getElementById('horas-laborables').value);
    const diaslaborables = parseFloat(document.getElementById('dias-laborables').value);
    const semanaslaborables = parseFloat(document.getElementById('semanas-laborables').value);
  
    
    const HorasSemanal = (document.getElementById('dias-laborables').value)*(document.getElementById('horas-laborables').value);
    const MinutosSemanal = HorasSemanal * 60;
    const horas = Math.floor(MinutosSemanal / 60);
    const minutos = MinutosSemanal % 60;
    const HorasSemanalFormato = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + " hs";
    
    const HorasMensual = (document.getElementById('dias-laborables').value)*(document.getElementById('horas-laborables').value)*(document.getElementById('semanas-laborables').value);
    const MinutosMensual = HorasMensual * 60;
    const horas2 = Math.floor(MinutosMensual / 60);
    const minutos2 = MinutosMensual % 60;
    const HorasMensualFormato = horas2.toString().padStart(2, '0') + ':' + minutos2.toString().padStart(2, '0') + " hs";
    
    const HorasDia = document.getElementById('horas-laborables').value;
    const MinutosDia = HorasDia * 60;
    const horas3 = Math.floor(MinutosDia / 60);
    const minutos3 = MinutosDia % 60;
    const HorasDiaFormato = horas3.toString().padStart(2, '0') + ':' + minutos3.toString().padStart(2, '0') + " hs";
  



    //Calculo servicios
       
    const servicioDia = HorasDia/HorasDia;
    const servicioSemanal = servicioDia * diaslaborables;
    const servicioMensual = servicioSemanal*semanaslaborables;
  
    //calculo en dolares

    const ingresoMensual = parseFloat(document.getElementById('ingreso-mensual').value);
    const ingresoSemanal = ingresoMensual / semanaslaborables;
    const ingresoDiario = ingresoSemanal / diaslaborables;
    const ingresoHora = ingresoDiario / horaslaborables;

    const ingresoMensualDolares = ingresoMensual;
    const ingresoSemanalDolares = ingresoSemanal;
    const ingresoDiarioDolares = ingresoDiario;
    const ingresoHoraDolares = ingresoHora;
  
    //Calculo en pesos
    const ingresoSemanalPesos = ingresoSemanal * cotizacionDolar;
    const ingresoDiarioPesos = ingresoDiario * cotizacionDolar;
    const ingresoHoraPesos = ingresoHora * cotizacionDolar;
    const ingresoMensualPesos = ingresoMensual * cotizacionDolar;
  

    //Ingresos en pesos y en dolar
    document.getElementById('ingreso-mensual-dolares').textContent = `$${ingresoMensualDolares.toFixed(0)}`;
    document.getElementById('ingreso-mensual-pesos').textContent = `$${ingresoMensualPesos.toFixed(0)}`;
    document.getElementById('ingreso-semanal-dolares').textContent = `$${ingresoSemanalDolares.toFixed(0)}`;
    document.getElementById('ingreso-semanal-pesos').textContent = `$${ingresoSemanalPesos.toFixed(0)}`;
    document.getElementById('ingreso-diario-dolares').textContent = `$${ingresoDiarioDolares.toFixed(0)}`;
    document.getElementById('ingreso-diario-pesos').textContent = `$${ingresoDiarioPesos.toFixed(0)}`;
    document.getElementById('ingreso-hora-dolares').textContent = `$${ingresoHoraDolares.toFixed(0)}`;
    document.getElementById('ingreso-hora-pesos').textContent = `$${ingresoHoraPesos.toFixed(0)}`;
  
    //Horas de trabajo
    document.getElementById('horas-mensual').textContent = HorasMensualFormato;
    document.getElementById('horas-semanal').textContent = HorasSemanalFormato;
    document.getElementById('horas-dia').textContent = HorasDiaFormato;


    //servicios al mes
    document.getElementById('servicios-mensual').textContent = `${servicioMensual.toFixed(0)}`;
    document.getElementById('servicios-semanal').textContent = `${servicioSemanal.toFixed(0)}`;
    document.getElementById('servicios-dia').textContent = `${servicioDia.toFixed(0)}`;

  }
  