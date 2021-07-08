/**************************************************************************************************
 * IMPORTANTE: Cada vez que inicies sesión o caduque sesión debes actualizar esta información
 * Esta información se encuentra en "Account Detauls" , justo depsués de entrar en tu sesión de AWS
 * en la web "vocareum".
 **************************************************************************************************/
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIA2FUDXTIFEJDH4C4H",
  secretAccessKey: "BG6Q7+wu/h2hV6zQJ4U0zG6P5EhTL9aU7RDVH2fR",
  sessionToken:"FwoGZXIvYXdzEKb//////////wEaDDght8rBB2HRu438IyLLAcEHg8NRJLfmISWclcPVFNSiFOd7g5MAxSwHqd7WohQv/qsJNhlBM57+qsOqiM3UvihXbXCCNhBQVFCQ3MvR4ylZ8ScC+6ppET5OwTbOtI8opFPgK8pw7zK18b5sj4RbZf3nJvm6b1YfQ8d3+9AvmYZbP9UA1sCtrgOQrC6AlNYVWUaTfBlZcfCAhQ1/AMfTwRhdCDVQ+aq4Bv2iwIoJwYwEMQpPr1rO9JGW8abElLNePoiCdDfj/dlJbiIazZQHl9b3hiInlokLdVfkKO24nYcGMi0GUFKLDWu1X46vnUqz2e51ardznjdGtRplnxw1R0X9biraLOApr/f6eh2av3w="

});

var rojo = "#A93226";
var azul = "#2E86C1";
var lila = "#5B2C6F";
var naranja = "#FF5733";
var amarillo = "#F1C40F";
var negro = "#17202A";

var docClient = new AWS.DynamoDB.DocumentClient();

// Función que ejecuta el código al cargar la página
function cargarInicial(){
    cargarDatos('farm1');
}


// Monta un gráfico con la libreria highcharts con los datos que entran por parámetro
function dibujarGrafico(sensor, tipo, datos, color){
    identificador_html = sensor + "_" + tipo; //Ejemplo: farm1_temperatura
    magnitud = "";

    if(tipo == "temperatura"){
        magnitud = "ºC";
    }

    // TAREA: Añadir las condiciones que faltan para tener en cuenta los tipos humedad (%) y viento (m/s)

    Highcharts.chart(identificador_html, {
        title: {
            text: tipo
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: tipo
            }
        },
        plotOptions: {
            series: {
                color: color
            }
        },
        legend: {
            enabled: false
        },

        series: [{
            type: 'line',
            name: magnitud,
            data: datos
        }]
    });
}

function cargarDatos(sensor){
    dibujarGrafico(sensor, 'temperatura', DATOS_GRAFICO_PRUEBA, rojo);
}

/* TAREA:
 * - realizar la conexión con DynamoDB para obtener los datos y posteriormente dibujarlos
 *   con las funciones proporcionadas en este archivo
 */
function cargarDatosDynamoDB(sensor){
    /* 
    * Si es necesario, busca información en la documentación:
    * https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/GettingStarted.JavaScript.html
    */

    var minutos = 15; // minutos
    var fiveMin = 60 * minutos * 1000; // 15 minutos * 60 segundos * 1000 (milisegundos)
    var d=new Date();  // Devuelve el tiempo actual
    var nowTs = Math.floor(d.getTime()); // getTime() devuelve los milisegundos
    var seconds = nowTs-fiveMin; // Al tiempo actual le restamos los 15 minutos

    // TAREA: Trabaja con los datos de la última hora
    params = {
        TableName: "intelifarm",
        KeyConditionExpression: "#dev_eui = :device and #timestamp > :start_date",
        ExpressionAttributeNames: {
            "#timestamp": "timestamp",
            "#dev_eui": "device_id"
        },
        ExpressionAttributeValues: {
             ":start_date": seconds, //fecha en unixtimestamp.
             ":device": sensor
        }
    };


    // función que ejecuta la consulta en DynamoDB utilizando la configuración realizada sobre la variable "params"
    docClient.query(params, function(err, data) {

        // Variable donde acumular los datos de la respuesta
        tempData = []

        if (err){
            mensaje = "ERROR " + JSON.stringify(err, undefined, 2);
            alert(mensaje);
        } else {
            
            data.Items.forEach(function(result) {
                // El primer campo es el timestamp
                // El segundo campo es la temperatura. Usar el nombre con el que se registra en la base de datos: "temperature"
                tempData.push([result['timestamp'], result['temperature']]);
            });
            dibujarGrafico(sensor, 'temperatura', tempData, rojo);
        }
    });
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
