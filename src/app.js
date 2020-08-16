const express=require('express')
const path = require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


const app=express()
const port= process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // this renders our html file on screen 

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Sakshi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Sakshi Choudhary'
    })
    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELP!!!!!',
        msg:'Not gonna help! Huhh..',
        name:'sakshi'
    })
    
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
          error:'YOU MUST PROVIDE an ADDRESS!!'
          })
      }
    
      geocode(req.query.address, (error,{latitude,longitude,location}={})=> {
        if(error){
          return res.send({ error })
        }
       
      forecast(latitude, longitude , (error, forecastdata) => {
        if(error){
          return res.send({ error })
        }
        res.send({
            forecast: forecastdata,
            location,
            address:req.query.address
        })
      })
      })
      

})





    //   res.send({
    //     forecast:'raining',
    //     location:'purnea',
    //     address: req.query.address
    // })
 
   


app.get('/products',(req,res)=>{
  if(!req.query.search){
    return  res.send({
      error:'YOU MUST PROVIDE a SEARCH TERM!!'
      })
  }
  console.log(req.query)
  console.log(req.query.search)
    res.send({
       products:[]
   }) 
})


// app.get('',(req,res)=>{
//     res.send('<h1>Hi Express!!!</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'sakshi',
//         age:19
//     },
//     {
//         name:'michelle',
//         age:34
//     }])

//     })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })

// })

app.get('*',(req,res)=>{
    res.send('MY 404 Page')
 
})

app.listen(port,()=>{
    console.log('server is up on port'+port)
}
)