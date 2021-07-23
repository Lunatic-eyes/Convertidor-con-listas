
let inputs = document.querySelectorAll(".valor");

let url = 'https://s3.amazonaws.com/dolartoday/data.json';
fetch(url)
  .then(r => r.json())
  .then(data => {
    document.querySelector('#USD')
      .dataset.cambio = data.USD.promedio;

     promedio = document.getElementById('promedio').innerHTML = (data.USD.promedio);

       console.log(data.USD.promedio);

     


    inputs.forEach(input => {
      input.value = input.dataset.cambio;
    });
  })
  .catch(error => console.error(error))


function valorCambiado(input) {
  let factor = input.value / input.dataset.cambio;
  inputs.forEach(campo => {
    campo.value = (campo.dataset.cambio * factor).toFixed(2);
  })
}


document.getElementById('form_articulos').addEventListener('submit', guardar_articulo);


function guardar_articulo(e){


  let art_n = document.getElementById('art').value

  let precio1 = (document.getElementById('precio1').value)

  let equival = (precio1 * promedio).toFixed(2)
 
const art_list = {

art_n,
precio1,
equival


};
if (localStorage.getItem('arts') == null){
let arts = []
arts.push(art_list);
localStorage.setItem('arts', JSON.stringify(arts));
}
else{

  let arts = JSON.parse(localStorage.getItem('arts'));
  arts.push(art_list);
  localStorage.setItem('arts', JSON.stringify(arts));
  mostar_articulos()

}

mostar_articulos()
document.getElementById('form_articulos').reset();

  e.preventDefault()
}

  function mostar_articulos() {

    let arts = JSON.parse(localStorage.getItem('arts'));
    let vista_art = document.getElementById('lista');

    
    
    
    vista_art.innerHTML = '';

    for(let i = 0; i < arts.length; i++) {
      let nombre_art = arts[i].art_n
      let precio = arts[i].precio1
      let equival = arts[i].equival
    


      vista_art.innerHTML += `<div class="section"> 
      <div class="col s7 push-s5">  
      <p>  <b>Nombre del articulo:</b>  ${nombre_art} - <b> Precio en dolares:</b> ${precio}

</p> <p>    <b>Equivalencia en Bolivares:</b>   ${equival} BS</p>


     
      <a class="waves-effect waves-light btn-small" onclick = "eliminar('${nombre_art}')">Borrar</a>  
      </div>
      </div>`

    }


  }


  function eliminar(nombre_art){
    let arts = JSON.parse( localStorage.getItem('arts'));
    for(let i = 0; i < arts.length; i++ ){
      if (arts[i].art_n == nombre_art ){
        arts.splice(i, 1);



      }

    }
    localStorage.setItem('arts', JSON.stringify(arts));
    mostar_articulos()


  }
  mostar_articulos()