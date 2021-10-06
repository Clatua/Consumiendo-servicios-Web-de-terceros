let request=new XMLHttpRequest();
let request2=new XMLHttpRequest();
let btnAdd=document.getElementById('btnAdd');
    btnAdd.addEventListener('click',()=>{
        let CorX=document.getElementById('corX').value;
        let CorY=document.getElementById('corY').value;
        let dia=" ";
        request.open('get','https://us1.locationiq.com/v1/reverse.php?key=pk.3e0679bd56cc92f2106d1f0a3403498c&lat='+CorX+'&lon='+CorY+'&format=json');
        request.onload=function(){
            console.log(this.response);
            let data=JSON.parse(this.response);
            let ciudad=data.address.city;
            console.log(data);
            console.log(data.display_name);
            console.log(data.address.city);
            request2.open('get','http://api.weatherstack.com/current?access_key=fd35038f82bd67d33ca61feae2e17f6e&query='+ciudad);
            request2.onload=function(){
                let data2=JSON.parse(this.response);
                console.log(data2.current.temperature);
                console.log(data2.current.weather_descriptions);
                let clima=document.getElementById("clima");
                if(data2.current.is_day=="no"){
                    dia="Noche";
                }else{
                    dia="Dia"
                }
                clima.innerHTML=`
                <img src="${data2.current.weather_icons}" width="100" height="100">
                <label style="font-size: 1.5cm;">${data2.current.temperature} C°</label><br>
                <label>${data.display_name}</label><br>
                <label >Fecha y hora ${data2.location.localtime}</label><br>
                <label>${dia}</label><br>
                <label>Descripcion del clima : ${data2.current.weather_descriptions}</label>          
                `
            }
            request2.send();
        }
        console.log(dia);
        request.send();
    });
    let btnciudad=document.getElementById('btnCiudad');
    btnciudad.addEventListener('click',()=>{
        ciudad=document.getElementById('Ciudad').value;
        let dia=" ";
        request.open('get','http://api.weatherstack.com/current?access_key=fd35038f82bd67d33ca61feae2e17f6e&query='+ciudad);
        request.onload=function(){
            console.log(this.response);
            let dia=" ";
            let data=JSON.parse(this.response);
            console.log(data);
            console.log(data.current.temperature);
            console.log(data.current.weather_descriptions);
            let clima=document.getElementById("clima");
            if(data.current.is_day=="no"){
                dia="Noche";
            }else{
                dia="Dia"
            }
            clima.innerHTML=`
            <img src="${data.current.weather_icons}" width="100" height="100">
            <label style="font-size: 1.5cm;">${data.current.temperature} C°</label><br>
            <label>${data.location.name},${data.location.region},${data.location.country}</label><br>
            <label >Fecha y hora ${data.location.localtime}</label><br>
            <label>${dia}</label><br>
            <label>Descripcion del clima : ${data.current.weather_descriptions}</label>
            `
        }
        console.log(dia);
        request.send();
    })

