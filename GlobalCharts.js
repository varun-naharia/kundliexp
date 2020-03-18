const GLOBAL = require('./Global');
var resp ={};

const getCharts = {

  getChartsDetails : (index)=>{

  	alert('from ex '+index)

        const url = GLOBAL.ASTRO_API_BASE_URL

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
            "user_id":GLOBAL.user_id,
            "lang":"en",
            "date":GLOBAL.gldate,
            "month":GLOBAL.glmonth,
            "year":GLOBAL.glyear,
            "hour":GLOBAL.glhour,
            "minute":GLOBAL.glminute,
            "latitude":GLOBAL.gllat,
            "longitude":GLOBAL.gllong,
            "timezone":GLOBAL.glzone,
            "api-condition":"charts",
            "chart_id":"D1"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//               alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
//                      alert('gdsd'+JSON.stringify(responseJson));
					resp = responseJson
                   //   this.setState({response : responseJson})
                  
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
     	return resp

  }

}

export default getCharts;