import React, { useEffect, useState } from 'react';
import axios from 'Axios'
import "../App.css"






const Cards = () => {


const [busqueda, setBusqueda] = useState("")

const [data, setData] = useState(false)
const [timezone, setTimezone] = useState("")

let urlClima = "https://api.openweathermap.org/data/2.5/weather?appid=f36d795afe998a384de409be5e42f2bd&lang=es"
let cityUrl = "&q="
let date = new Date()


let hora = date.getHours()
let minuto = date.getMinutes()
let dia = date.getDate()
let mes = date.getMonth()
let año = date.getFullYear()

console.log(dia)
console.log(mes + 1)
console.log(año)


    
    const obtenerClima = async(busqueda)=>{
        const respuesta= await axios.get (urlClima+cityUrl+busqueda)
        setTimezone((e)=>((respuesta.data.timezone / 3600)+ hora + 3 - 24)<0?
                    e=`${((respuesta.data.timezone/3600)+ hora + 3)<10?`0${(respuesta.data.timezone/3600)+ hora + 3}`:(respuesta.data.timezone/3600)+ hora + 3}:${minuto<10?`0${minuto}`:minuto}`:
                    e=`${((respuesta.data.timezone/3600)+ hora - 20)<10?`0${(respuesta.data.timezone/3600)+ hora - 20}`:(respuesta.data.timezone/3600)+ hora - 20}:${minuto<10?`0${minuto}`:minuto}`)
        setBusqueda(respuesta.data)
        setData (true)
    }
    console.log(timezone)

     

const onSubmit = (e) =>{
    e.preventDefault()
    setCity(e.target.value)
    // filtrar(e.target.value)
    console.log (e.target.value)
    obtenerClima(city)
  }

    const [city, setCity] = useState ("");

    let urlIcono ="http://openweathermap.org/img/w/"
    let iconoImagen =""

    if (data){
           
    iconoImagen = urlIcono + busqueda.weather[0].icon + ".png"
    
}

 
    return (
        

        <div className='mt-5'>

        


            
            <div>
         <form onSubmit={onSubmit}>
            <div className="input-group mb-3 mx-auto">
                <input type="text" className="form-control" placeholder="Ciudad" onChange={(e)=>setCity(e.target.value)} />
                <button className="btn btn-primary input-group-text" type="submit">Buscar</button>
                
            </div>



         </form>


        </div>

        
        <div className='contenedor-general bg-dark'>



            {
                data === true ?(
                    
            
                    <div  className='  row  card bg-dark text-light'>
                 <div >
                
                
                <div id="algo" className=' col-md-6 col-sm-6 '>
                <h1 className='card-titulo'>{busqueda.name} - {busqueda.sys.country}</h1>
                <h2 className='card-icono'><img src={iconoImagen} alt="icon" />{busqueda.weather[0].description}</h2>
            <h1 className='card-temperatura text-ligth'> {(busqueda.main.temp - 273.15).toFixed(1)} °C</h1> 
                <p className='card-fecha text-ligth'> {dia} / {mes + 1} / {año}</p>
                <p className='card-hora text-light'> {timezone} Hs</p>


                <img src="https://images.pexels.com/photos/1660603/pexels-photo-1660603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='imag-fluid rounded-star' alt="imagen ciudad" />
                
                

                </div>

            </div>
            
            
             
           
            <p style={{marginTop:"15px"}}>Temperatura Maxima: {(busqueda.main.temp_max - 273.15).toFixed(1)} °C</p>
            <p>Temperatura Minima: {(busqueda.main.temp_min - 273.15).toFixed(1)} °C</p>
            <p>Humedad: {busqueda.main.humidity} %</p>
            <p>Presión Atmosférica: {busqueda.main.pressure} hPa</p>
            <p>Viento: {busqueda.wind.speed} km/h</p>
            
            
            
            
            
            </div>
            
            
            
            ):(
                <h2 className='text-light'>Ingrese datos</h2>
            )
            }
          
        

         </div>
        </div>
        
    )
    
 }
export default Cards