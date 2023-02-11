(() => {
  window.addEventListener("load", () => {
   const map = new navitime.geo.Map(
  "map",new navitime.geo.LatLng("35.667399", "139.691634"), 15
  );



const baseUrl = 'https://api-service.instruction.cld.dev.navitime.co.jp/beginner/v1';
let search = $('#search-word');
const $searchButton = $('#spot-search-button');

const $spotContainer = $('#spot-container');


function successHandler_spot(response) {

  const json = response.data;
  const spots = json.items;

  for(let i =0 ; i<10 ; i++){
  const spot = spots[i];
  const coord = spot.coord;
  const name = spot.name;
  const address_name = spot.address_name;

  let geo = new navitime.geo.LatLng(coord.lat, coord.lon);
  /*ピンの生成*/
  Pin = new navitime.geo.overlay.Pin({
    icon:'./assets/img/b-2.png',
    position:geo,
    draggable:false,
    map:map,
    title:name
  });

  /*写真の有無判定*/
  let imagepath  ="./assets/img/no-image.png"
  console.log(imagepath)
  if(spot.details && spot.details[0].images){
   imagepath = spot.details[0].images[0].path;  
  
   console.log(imagepath)
  }

  // 確認用
  /*console.log(spot.name);
  console.log(spot.address_name);
  console.log(coord.lat);
  console.log(coord.lon);
  console.log(json); */

  //元々の表記
 /*  $spotContainer
 .append('<div></div>')
 .append(`<p> ${spot.name}</p><p>${address_name}</p>`)
 .append(`<img src= ${imagepath} width="250" height="250">`)*/

  const spot_container = document.getElementById("spot-container");
  const spot_block = document.createElement('div');
  spot_container.appendChild(spot_block);

  const	spot_name = document.createElement('p');
  const	spot_address = document.createElement('p');
  const spot_image = document.createElement('img');
  
  spot_block.style.background = "white";
  spot_block.style.border = "solid 1px black";
  spot_block.style.margin = "15px";

  spot_name.innerHTML = spot.name;
  spot_address.innerHTML = address_name;
  spot_image.src = imagepath;
  spot_image.width = 250;
  spot_image.height = 250;

  spot_block.appendChild(spot_name);
  spot_block.appendChild(spot_address);
  spot_block.appendChild(spot_image);

 /* 要素を押したら6-01の機能を動かす(未完成のまま動かすとにmapが消えるのでコメントアウト)
 spot_block.addEventListener('click', function{　　　})*/

}



}

$searchButton.on('click', function () {
  const word = search.val();
  search.val('');

  console.log(`${baseUrl}/spot?word=${word}&options=detail`);

  axios.get(`${baseUrl}/spot?word=${word}&options=detail`)
      .then(successHandler_spot)
      .catch(function (error) {
          console.log(error);
      });
});

});
})();




