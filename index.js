Chart.plugins.unregister(ChartDataLabels);
Chart.defaults.global.defaultFontFamily = 'Gotham-Book';

// code for center text
Chart.pluginService.register({
  beforeDraw: function(chart) {
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx,
        type = chart.config.type;

    if (type == 'doughnut')
    {
      var fontSize = ((height - chart.chartArea.top) / 300).toFixed(2);

      ctx.restore();

      ctx.font = fontSize + "em Gotham-Book";
      ctx.textBaseline = "middle";

      if (chart.id == 0) {
        // international student
        centerText = "17,552";
        subText = "+174% since 9/2007";
      } else {
        // international scholar
        centerText = "1,247";
        subText = "+80% since 9/2007";
      }
      var text = centerText,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = (height + chart.chartArea.top) / 2.04;

          var subtext = subText,
              subtextX = Math.round((width - ctx.measureText(subtext).width*0.7) / 2),
              subtextY = (height + chart.chartArea.top) / 2.04;


      ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[1];
      ctx.fillText(text, textX, textY);
      ctx.font = fontSize*0.7 + "em Gotham-Medium";
      ctx.fillText(subtext, subtextX, subtextY*1.1);
      ctx.save();
    }
  }
});

function legendClickCallback(event) {
  event = event || window.event;

  var target = event.target || event.srcElement;
  while (target.nodeName !== 'LI') {
    target = target.parentElement;
  }
  var parent = target.parentElement;
  var chartId = parseInt(parent.classList[0].split("-")[0], 10);
  var chart = Chart.instances[chartId];
  var index = Array.prototype.slice.call(parent.children).indexOf(target);
  var meta = chart.getDatasetMeta(index);

  if (meta.hidden === null) {
    meta.hidden = !chart.data.datasets[index].hidden;
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
    meta.hidden = null;
  }

  // avoid hiding all datasets
    if (chart.getDatasetMeta(0).hidden === true && chart.getDatasetMeta(1).hidden === true && chart.getDatasetMeta(2).hidden === true) {
      target.classList.remove('hidden');
      meta.hidden = null;
    }
  chart.update();
}

var ctx = document.getElementById("StudentCanvas");
var myLegendContainer = document.getElementById("StudentLegend");
var myChart = new Chart(ctx, {
  type: "doughnut",
  // plugins: [ChartDataLabels],
  data: {
    labels: ["Gender*", "Academic Lv", "Visa Type"],
    datasets: [{
        // gender
        // percentage(%) from total 17552
        data: [8448 / 17552 * 100, 9109 / 17552 * 100],
        datalabels: {
          anchor: 'end'
        },
        backgroundColor: [
          "#57068c", "#8900e1"
        ],
        labels: ["Male", "Female"]
      },
      {
        // academic level
        data: [417, 3929, 4952, 8254],
        datalabels: {
          anchor: 'start'
        },
        backgroundColor: [
          "#6d6d6d", "#007c70", "#3dbbdb", "#28619e"
        ],
        labels: ["Others", "Post-graduation training", "Undergraduate", "Graduate"]
      },
      {
        // visa types
        data: [189, 321, 17042],
        datalabels: {
          anchor: 'start'
        },
        backgroundColor: [
          "#b8b8b8", "#ffc107", "#e86c00"
        ],
        labels: ["Others", "J-1", "F-1"]
      }
    ]
  },
  options: {
    legendCallback: function(chart) {
      var text = [];
      text.push('<ul class="' + chart.id + '-legend">');
      for (var i = 0; i < chart.data.datasets.length; i++) {
        text.push('<li>');
        for (var j = 0; j < chart.data.datasets[i].data.length; j++) {
          text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor[j] + '"></span>');
        }
        text.push('<span style="background-color:' + 'transparent' + '"></span>');
        if (chart.data.labels[i]) {
          text.push(chart.data.labels[i]);
        }
        text.push('</li>');
      }
      text.push('</ul>');
      return text.join('');
    },

    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var index = tooltipItem.index;
          // only apply % for gender value
          if (dataset.labels[index] == "Female" || dataset.labels[index] == "Male") {
            return dataset.labels[index] + ': ' + Math.round(dataset.data[index]) + "%";
          } else {
            return dataset.labels[index] + ': ' + Math.round(dataset.data[index]);
          }
        }
      }
    },
    plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderColor: 'white',
        borderRadius: 8,
        borderWidth: 2,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: function(value, ctx) {
          // only apply % for gender value
          if (ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex] == "Female" ||
            ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex] == "Male") {
            return Math.round(value) + '%';
          }
        }
      }
    }
  }
});

var ctx2 = document.getElementById("ScholarCanvas");
var myLegendContainer2 = document.getElementById("ScholarLegend");
var myChart2 = new Chart(ctx2, {
  type: "doughnut",
  // plugins: [ChartDataLabels],
  data: {
    labels: ["Gender*", "Scholar Function", "Visa Type"],
    datasets: [{
        // gender
        // percentage(%) from total 1247
        data: [765/1247*100, 482/1247*100],
        datalabels: {
          anchor: 'end'
        },
        backgroundColor: [
          "#57068c", "#8900e1"
        ],
        labels: ["Male", "Female"]
      },
      {
        // scholar functions
        data: [16, 35, 239, 957],
        datalabels: {
          anchor: 'center',
          backgroundColor: null,
          borderWidth: 0
        },
        backgroundColor: [
          "#6d6d6d", "#007c70", "#3dbbdb", "#28619e"
        ],
        labels: ["Other", "Teaching and Research", "Teaching", "Research"]
      },
      {
        // visa types
        data: [(7 + 14 + 20), 207, 999],
        datalabels: {
          anchor: 'start'
        },
        backgroundColor: [
          "#b8b8b8", "#ffc107", "#e86c00"
        ],
        labels: ["Others", "H-1B", "J-1"]
      }
    ]
  },
  options: {
    legendCallback: function(chart) {
      var text = [];
      text.push('<ul class="' + chart.id + '-legend">');
      for (var i = 0; i < chart.data.datasets.length; i++) {
        text.push('<li>');
        for (var j = 0; j < chart.data.datasets[i].data.length; j++) {
          text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor[j] + '"></span>');
        }
        text.push('<span style="background-color:' + 'transparent' + '"></span>');
        if (chart.data.labels[i]) {
          text.push(chart.data.labels[i]);
        }
        text.push('</li>');
      }
      text.push('</ul>');
      return text.join('');
    },
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var index = tooltipItem.index;
          // only apply % for gender value
          if (dataset.labels[index] == "Female" || dataset.labels[index] == "Male") {
            return dataset.labels[index] + ': ' + Math.round(dataset.data[index]) + "%";
          } else {
            return dataset.labels[index] + ': ' + Math.round(dataset.data[index]);
          }
        }
      }
    },
    plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderColor: 'white',
        borderRadius: 8,
        borderWidth: 2,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: function(value, ctx) {
          // only apply % for gender value
          if (ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex] == "Female" ||
            ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex] == "Male") {
            return Math.round(value) + '%';
          }
        }
      }
    }
  }
});

myLegendContainer.innerHTML = myChart.generateLegend();
var legendItems = myLegendContainer.getElementsByTagName('li');
// console.log(legendItems);
for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
}

myLegendContainer2.innerHTML = myChart2.generateLegend();
var legendItems2 = myLegendContainer2.getElementsByTagName('li');
// console.log(legendItems2);
for (var i = 0; i < legendItems2.length; i += 1) {
  legendItems2[i].addEventListener("click", legendClickCallback, false);
}
