


const userinput= document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#msg1')
const msgtwo=document.querySelector('#msg2')

userinput.addEventListener('submit',(e)=>{
  e.preventDefault()
const location=search.value
msgone.textContent= ''
msgtwo.textContent='Loading...'

fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            msgone.textContent=' '
           msgtwo.textContent=data.error
        } else {
            console.log(data.location)
            console.log(data.forecast)
           msgone.textContent= data.location
           msgtwo.textContent=data.forecast
        }
    })
})

})