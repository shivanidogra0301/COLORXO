let img = document.querySelector("#image")
const colorThief = new ColorThief();
let refreshbtn = document.querySelector(".refresh-container")
let genbtn = document.querySelector(".gen")
let palleteContainer = document.querySelector(".pallete-container")
let body = document.querySelector("body")
let uploadbtn = document.querySelector(".upload-container")

var animation = lottie.loadAnimation({
    container: document.querySelector('.btn-icon'), // the dom element that will contain the animation
    renderer: 'svg',
    path: '../icons/icons8-refresh.json' // the path to the animation json
  });
animation.setSpeed(2);
animation.stop();

refreshbtn.addEventListener("click",function(){
    location.reload();
    animation.play();
})

img.addEventListener("load",function(){
        animation.stop();
        let totalclrs = 12;
        let palette = colorThief.getPalette(img, totalclrs);
        //check if pallete is already added , then remove that
        let plts = document.querySelectorAll(".pallete");
        if(plts){
            for(let plt of plts){
                palleteContainer.removeChild(plt);
            }
        }
        palette.forEach(function (color) {
            var r = color[0];
            var g = color[1];
            var b = color[2];
            // console.log(r,g,b);
            let div = document.createElement("div"); 
            div.classList.add("pallete");
            let hexcolor = rgbToHex(r,g,b);
            div.innerHTML = `<div class="pallete-color" style= "background-color:${hexcolor}"></div>
            <div class="color-name">${hexcolor}</div>`
            div.setAttribute("color",hexcolor);
            palleteContainer.appendChild(div);

        });
        copytoClipboard();

})

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function copytoClipboard(){
let palletes = document.querySelectorAll(".pallete")
for(let pallete of palletes){
    pallete.addEventListener('click',function(){

        // let successMsg = document.querySelector(".successMsg")
        // if(successMsg)
        // body.removeChild(successMsg);


        let hexcolor = pallete.getAttribute("color");

        //make dummy input field to copy data into clipboard
        var color = `${hexcolor}`;
        let dummyinput = document.createElement("input");
        dummyinput.value = color;
        body.appendChild(dummyinput);
        dummyinput.select();


        //copies the content
        var successful = document.execCommand('copy')
        body.removeChild(dummyinput);



        var x = document.getElementById("success-msg");
        x.className = "show";

            setTimeout(function(){ 
                x.className = x.className.replace("show", "");
             }, 3000);

        
    })
}
}


uploadbtn.addEventListener("click",function(){
    let dummyinput = document.createElement("input");
    dummyinput.type = "file"
    dummyinput.click();
    dummyinput.addEventListener("change",function(e){
        let imgdata = e.target.files[0];
        let url = URL.createObjectURL(imgdata);
        img.src = url;
        // console.log(img);
    })
    

})


 
