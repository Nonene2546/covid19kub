const APIURL = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
const APIURL2 = "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all"
var xValues = []
var yValues = []

async function getAPI(){
    const resp = await fetch(APIURL)
    const respData = await resp.json()

    const resp2 = await fetch(APIURL2)
    const respData2 = await resp2.json()

    // console.log(respData)
    // console.log(respData2)
    // console.log(respData.length)
    if(respData.length != 0){
        $(".newdate").text(respData[0].txn_date)
        $(".newcase").text(respData[0].new_case)
        $(".newtotalcase").text(respData[0].total_case)
    }
    const start = respData2.length-31
    const end = respData2.length
    for(let i=start;i<end;i+=1){
        xValues.push(i)
        yValues.push(respData2[i].total_case)
    }
    // console.log(xValues)
    // console.log(yValues)
    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{ticks: {min: Math.floor((respData2[start].total_case - 10000)/1000), max: Math.floor((respData2[end-1].total_case+10000)/1000)}}]
            },
            title:{
                display: true,
                text: "total case covid-19 in Thailand (x1000)",
                fontSize: 15
            },
        },
      });
      
}

getAPI()