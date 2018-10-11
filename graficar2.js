for(i=0; i<onis.length; i++){
    oni = onis[i].toString().substr(0,onis[i].toString().indexOf(".")+2);

    if(oni=="-")
        oni=-1;

    if(oni == "-0.0" || oni == "0.0"){
        oni = 0;
    }
    oni *=1;
    onis[i] = oni;
}

var ejex=[];
var n = parseInt(onis.length/12);
for(k=0; k <=n*2;k++){
    ejex[0+(k*10)] = "DJF";
    ejex[1+(k*10)] = "JFM";
    ejex[2+(k*10)] = "FMA";
    ejex[3+(k*10)] = "MAM";
    ejex[4+(k*10)] = "AMJ";
    ejex[5+(k*10)] = "MJJ";
    ejex[6+(k*10)] = "JJA";
    ejex[7+(k*10)] = "JAS";
    ejex[8+(k*10)] = "ASO";
    ejex[9+(k*10)] = "SON";
    ejex[10+(k*10)] = "OND";
    ejex[11+(k*10)] = "NDJ";
}

//alert(n);

//console.log(ejex);

document.getElementById("maxOni").cells[1].innerText = maxOniNinio;
document.getElementById("maxOni").cells[2].innerText = maxOniNinia;

document.getElementById("minOni").cells[1].innerText = minOniNinio;
document.getElementById("minOni").cells[2].innerText = minOniNinia;

$(function () {
    $('#contenedor').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'ENSO'
        },
        xAxis: {
            categories: ejex
        },
        yAxis: {
            title: {
                text: 'Indice Oni'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            showInLegend: false,
            name: 'Oni',
            data: onis,
            zones: [{
                   value: -0.49,
                   color: '#0000ff'
                }, {
                   value: 0.5,
                   color: '#5b5b5b'
                }, {
                   color: '#ff0000'
            }]
        },{
            name: 'Niña',
            color: 'blue',
        },{
            name: 'Neutral',
            color: 'gray',
        },{
            name: 'Niño',
            color: 'red',
        }]
    });
});

$(function () {
    $('#graficaTorta').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Eventos'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Eventos',
            colorByPoint: true,
            data: [{
                name: 'Niños',
                y: numNinios,
                color: 'red',
            }, {
                name: 'Neutrales',
                y: numNeutrales,
                sliced: true,
                selected: true,
                color: 'gray',
            }, {
                name: 'Niñas',
                y: numNinias,
                color: 'blue',
            }]
        }]
    });
});

$(function () {
    $('#graficaEstadisticas').highcharts({
        colors: ['#ff0000', '#0000ff'],
        data: {
            table: 'tablaEstadisticas'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadísticas Generales'
        },
        yAxis: {
            allowDecimals: true,
            title: {
                text: 'Valores'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
    });
});