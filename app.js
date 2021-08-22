let form1 = document.getElementById( 'form' );
let table = document.getElementById( 'table' );
let select = document.getElementById( 'image' );

let arrImage = ['alstroemerias.jpeg', 'gardenias.jpeg', 'orchids.jpeg', 'peonies.jpeg', 'roses.jpeg', 'sunflowers.jpeg', 'tulips.jpeg'];
function fillSelect() {
  for ( let index = 0; index < arrImage.length; index++ ) {
    let obt = document.createElement( 'option' );
    obt.value = arrImage[index].split( '.' )[0];
    obt.textContent = arrImage[index].split( '.' )[0];
    select.appendChild( obt );
  }
}
fillSelect();
headerRender();

function Garden( name, imagPath, season ) {
  this.name = name;
  this.imagPath = imagPath;
  this.season = season;
  Garden.all.push( this );
}
Garden.all = [];
getDate();
function getDate() {
  if ( localStorage.garden ) {
    let data = JSON.parse( localStorage.garden );
    for ( let index = 0; index < data.length; index++ ) {
      let newGarden = new Garden( data[index].name, data[index].imagPath, data[index].season );
      render( newGarden );

    }
  }
}
function setData() {
  localStorage.garden = JSON.stringify( Garden.all );
}
form1.addEventListener( 'submit', show );
function show( e ) {
  e.preventDefault();
  let name = e.target.name.value;
  let image = e.target.image.value;
  let season = e.target.season.value;

  let newObj = new Garden( name, image, season );
  setData();
  render( newObj );

}

function render( obj ) {
  console.log( obj );
  let tr = document.createElement( 'tr' );
  table.appendChild( tr );

  let td = document.createElement( 'td' );
  td.textContent = 'X';
  tr.appendChild( td );

  let td2 = document.createElement( 'td' );
  let img = document.createElement( 'img' );
  img.style.width = '100px';
  img.style.height = '100px';
  img.src = 'img/' + obj.imagPath + '.jpeg';
  td2.appendChild( img );
  tr.appendChild( td2 );

  td = document.createElement( 'td' );
  td.textContent = obj.name;
  tr.appendChild( td );

  td = document.createElement( 'td' );
  td.textContent = obj.season;
  tr.appendChild( td );
}
function headerRender() {
  let tr = document.createElement( 'tr' );
  table.appendChild( tr );

  let td = document.createElement( 'th' );
  td.textContent = '#';
  tr.appendChild( td );

  let td2 = document.createElement( 'th' );
  td2.textContent = ' image ';
  tr.appendChild( td2 );

  td = document.createElement( 'th' );
  td.textContent = 'name';
  tr.appendChild( td );

  td = document.createElement( 'th' );
  td.textContent = 'season';
  tr.appendChild( td );
}
table.addEventListener( 'click', removeRow );
function removeRow( e ) {
  if ( e.target.textContent === 'X' ) {
    e.target.parentElement.remove();
    Garden.all.splice( e.target.parentElement.rowIndex-1 , 1 );
    setData();
  }
}
