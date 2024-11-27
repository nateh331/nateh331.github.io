$.get(url, function (data2) {

    var mydata = data2.datasets;
    var length = mydata.length;
    var mylabels = data2.labels;
    var dataArray = [];
    var colorArray = [];

    for (var i = 0; i < length; i++) {
        var test = mydata[i].data;
        dataArray.push(test);

        //make color match database
        if(mylabels[i].includes("AEMP")){
            //blue color
            colorArray.push('#007bff');
        } else if(mylabels[i].includes("SURFACE")){
            //yellow color
            colorArray.push('#ffc107');
        } else if(mylabels[i].includes("AERIAL")){
            //green color
            colorArray.push('#28a745');
        } else if(mylabels[i].includes("SEABED")){
            //red color
            colorArray.push('#dc3545');
        } else {
            //gray color
            colorArray.push('#c3c3c3');
        }
    }

     var ctx = $("#PersonalPieChart").get(0).getContext("2d");
    new Chart(ctx, {
        type: 'doughnut',
        options: {
            plugins: {
            // Change options for ALL labels of THIS CHART
                datalabels: {
                   color: '#36A2EB'
                }
            }
        },
        data: {
            labels: mylabels,
            datasets: [{
                data: dataArray,
                backgroundColor: colorArray,	
            }],	
        }
    });
});