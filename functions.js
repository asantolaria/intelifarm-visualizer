// Función que ejecuta el código al cargar la página
function cargarInicial(){
    loadFarm1();
}


// Monta un gráfico con la libreria highcharts con los datos que entran por parámetro
function dibujarGrafico1(datos_grafico){
    Highcharts.chart('grafico_temp', {
        title: {
            text: 'Gráfico de un sensor'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Temperatura'
            }
        },
        legend: {
            enabled: false
        },

        series: [{
            type: 'line',
            name: 'ºC',
            data: datos_grafico
        }]
    });
}


// Reúne la información de la vista para vistualizar la granja 1
function loadFarm1(){
    /* Realizar la carga de datos y guardarla en esta variable */
    datos_grafico_1 = cargarDatos();

    element = document.getElementById('titulo');
    element.textContent = "Monitorización de la Granja 1";

    /* Llamar a las funciones que dibujan los gráficos con los datos de cada uno */
    dibujarGrafico1(datos_grafico_1);
}



/* EJERCICIO:
 * - realizar la conexión con DynamoDB para obtener los datos y posteriormente dibujarlos 
 *   con las funciones proporcionadas en este archivo
 */
function cargarDatos(){
    /* 
    * Buscar información en la documentación:
    * https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/GettingStarted.JavaScript.html
    */

    return DATOS_GRAFICO_PRUEBA;

}


/* Datos de muestra. Formato:
 * Posición 0 : tiempo en formato unix timestamp
 * Posición 1 : valor de la medida (temperatura, humedad o velocidad del viento)
 */ 
DATOS_GRAFICO_PRUEBA = [
    [
        1167609600000,
        0.7537
    ],
    [
        1167696000000,
        0.7537
    ],
    [
        1167782400000,
        0.7559
    ],
    [
        1167868800000,
        0.7631
    ],
    [
        1167955200000,
        0.7644
    ],
    [
        1168214400000,
        0.769
    ],
    [
        1168300800000,
        0.7683
    ],
    [
        1168387200000,
        0.77
    ],
    [
        1168473600000,
        0.7703
    ],
    [
        1168560000000,
        0.7757
    ],
    [
        1168819200000,
        0.7728
    ],
    [
        1168905600000,
        0.7721
    ],
    [
        1168992000000,
        0.7748
    ],
    [
        1169078400000,
        0.774
    ],
    [
        1169164800000,
        0.7718
    ],
    [
        1169424000000,
        0.7731
    ],
    [
        1169510400000,
        0.767
    ],
    [
        1169596800000,
        0.769
    ],
    [
        1169683200000,
        0.7706
    ],
    [
        1169769600000,
        0.7752
    ],
    [
        1170028800000,
        0.774
    ],
    [
        1170115200000,
        0.771
    ],
    [
        1170201600000,
        0.7721
    ],
    [
        1170288000000,
        0.7681
    ]
];