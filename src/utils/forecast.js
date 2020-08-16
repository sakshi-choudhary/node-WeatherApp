const request = require("request")

///// FETCH WEATHER

const forecast= (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=10cde02477a08a7fad5456cff10b164a&query='+ latitude+','+ longitude
    //useing es6 shorthand property
    request({ url, json:true},(error,{body})=>{
        if(error){
            callback('Oops.. Unable to connect to waether service!',undefined)
        }
         else if (body.error) {
             callback('Unable to find location! Try another search.',undefined)
           }
           else{
       
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out`);
        }
    })
    }

    module.exports= forecast