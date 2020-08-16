const request = require("request")

///// FETCH LAT, LONG

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2Frc2hpY2hvdWRoYXJ5IiwiYSI6ImNrZGFhenVsNTBnOHcycXJ4dHd5c3NpZm8ifQ.sRJHAecYdCtxNVvSQ7NKLg&limit=1'
  //using es6 shorthand property  
    request({ url, json:true},(error,{body})=>{
        if(error){
            callback('Oops.. Unable to connect to location service!',undefined)
        }
         else if (body.features.length === 0) {
             callback('Unable to find location! Try another search.',undefined)
           }
          else {
                callback(undefined,{
                  latitude  : body.features[0].center[1],
                  longitude : body.features[0].center[0],
                  location: body.features[0].place_name
                
    })
    }
    })
    }

    module.exports=geocode