let totalpalletes = 4;
let palleteContainer = document.querySelector(".pallete-container")
let body = document.querySelector("body");
let addbtn = document.querySelector(".add")


createpallete([-1]);

function createpallete(lockedids){
    let pallete = document.querySelectorAll(".pallete");
    if(pallete.length > 0){
        // now just change the hexcolors
        for(let i= 0; i < totalpalletes; i++){
            if(!lockedids.includes(i))
            changeHex(i);
        }
    }
    else{
        //for first time create pallete
        for(let i= 0; i < totalpalletes; i++){
            palletegenerate(i);
        }

    }
    
  
}

//toa adjust width of the pallete div

    window.addEventListener("resize",function(){
        let pallete = document.querySelectorAll(".pallete");
        if(pallete.length > 0){
            for(let i= 0; i < totalpalletes; i++){
                let width = Math.floor(window.innerWidth/totalpalletes);
                pallete[i].style.width = `${width}px`;
            }
        }
    })





// create pallete
function palletegenerate(i) {
        var myDiv = createPalletediv(i);
        addbtnmotion(myDiv,i)
        palleteContainer.appendChild(myDiv);
        copytoClipboard();
        lockanimation(i);
        deletePallete(i);
}


function createPalletediv(i){
    let hexcolor = randomHex();
        var myDiv = document.createElement('div');
        myDiv.className = "pallete";

        myDiv.style.backgroundColor = `#${hexcolor}`;
        
        let width = Math.floor(window.innerWidth/totalpalletes);
        myDiv.style.width = `${width}px`;
        myDiv.innerHTML = `<div class="left"></div>
        <div class= "icons">
        <div class="hexname">#${hexcolor}</div>
            <div  class="material-icons pallete-icons lock">lock_open</div>
            <div class="material-icons pallete-icons copy" color = "#${hexcolor}">content_copy</div>
            <div  class="material-icons pallete-icons delete">close</div>

        </div>
        <div class = "right"></div>`
        myDiv.setAttribute("color",hexcolor);
        myDiv.setAttribute("no",i);
        return myDiv;
}

// to change the hexcolor
function changeHex(i){
    let hexcolor = randomHex();
    let div = document.querySelectorAll(".pallete")[i];
    div.style.backgroundColor = `#${hexcolor}`
    let hexnamediv = div.querySelector(".hexname")
    hexnamediv = `#${hexcolor}`
}

// to generate random color
function randomHex(){
    myColors = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    cutIn= 0;
    var myRandone = myColors[Math.floor(Math.random() * myColors.length)];
        var myRandtwo = myColors[Math.floor(Math.random() * myColors.length)];
        var myRandthree = myColors[Math.floor(Math.random() * myColors.length)];
        var myRandfour = myColors[Math.floor(Math.random() * myColors.length)];
        var myRandfive = myColors[Math.floor(Math.random() * myColors.length)];
        var myRandsix = myColors[Math.floor(Math.random() * myColors.length)];
        var sixDigitRandom =  myRandone + myRandtwo + myRandthree + myRandfour + myRandfive + myRandsix;
        return sixDigitRandom;
}
function addbtnmotion(myDiv,i){
    if(i == 0 || i == totalpalletes - 1){
        return;
    }
    let left = myDiv.querySelector(".left")
        let right = myDiv.querySelector(".right")

        left.addEventListener("mouseover",function(e){
            addbtn.classList.remove("hidden")
            let leftpointer =  i * Math.ceil(window.innerWidth/totalpalletes);
            addbtn.style.left=`${leftpointer}px`;
        })  
        left.addEventListener("mouseleave",function(){
            addbtn.classList.add("hidden")
        })  

        right.addEventListener("mouseenter",function(e){
            addbtn.classList.remove("hidden")
            let leftpointer = Math.ceil(window.innerWidth/totalpalletes) + (i) * Math.ceil(window.innerWidth/totalpalletes);
            addbtn.style.left=`${leftpointer}px`;
        })  
        right.addEventListener("mouseleave",function(){
            addbtn.classList.add("hidden")
        })  
}

document.addEventListener("keydown",function(e){
    let icons = document.querySelectorAll(".lock");
    let lockediconsid = []
    for(let icon of icons){
        if(icon.innerText === "lock"){
            let parent = icon.parentNode.parentNode;
            let id = Number(parent.getAttribute("no"));
            lockediconsid.push(id);
        }
    }
    if(e.code === "Space"){
        createpallete(lockediconsid);
    }
})


function copytoClipboard(){
    let copybtns = document.querySelectorAll(".copy")
    for(let copybtn of copybtns){
        copybtn.addEventListener('click',function(){
    
            // let successMsg = document.querySelector(".successMsg")
            // if(successMsg)
            // body.removeChild(successMsg);
    
    
            let hexcolor = copybtn.getAttribute("color");
            // console.log(hexcolor)
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

function lockanimation(i){
    let lockicon = document.querySelectorAll(".lock")[i];

    lockicon.addEventListener("click",function(){
        if(lockicon.innerText === "lock"){
            lockicon.innerText ="lock_open";
        }
        else{
            lockicon.innerText ="lock";

        }
    })
} 


addbtn.addEventListener("mouseover",function(e){
    this.classList.remove("hidden")
})

addbtn.addEventListener("click",function(e){
    this.classList.add('hidden')
    if(totalpalletes == 8){
        return;
    }

    // find the palleteno before which you want to add the new pallete
    let palleteno = this.style.left.split("px")[0]/Math.ceil(window.innerWidth/totalpalletes);
    // console.log(palleteno);
    
    let palletes = document.querySelectorAll(".pallete");
    let pallete = palletes[palleteno-1]
    //change the attribute no of after elements by increment of 1
    for(let i = palleteno; i < totalpalletes; i++){
        let p = palletes[i];
        if(p){
            // console.log(i);
        p.setAttribute("no",i+1);
        }
    }

    // create the new div
    let newdiv = createPalletediv(palleteno);

    totalpalletes++;
    var tmp = document.createElement("div");
    tmp.appendChild(newdiv);
    if(pallete){
        pallete.insertAdjacentHTML('afterend',tmp.innerHTML);
    }
   
    palletes = document.querySelectorAll(".pallete");
    for(let i = 0; i < totalpalletes; i++){
        palletes[i].style.width = `${Math.ceil(window.innerWidth/totalpalletes)}px`;
        addbtnmotion(palletes[i],i);
    }
    copytoClipboard();
    lockanimation(palleteno);
    deletePallete(palleteno);

})

function deletePallete(i){
    let palletes = palleteContainer.querySelectorAll(".pallete");
    let ptd = palletes[i];
    let removebtn = palletes[i].querySelector(".delete");
    removebtn.addEventListener("click",function(){
        console.log("clicked")
        if(totalpalletes == 4){
            return;
        }
        let palleteno = this.parentNode.parentNode.getAttribute("no");
        console.log(palleteno,totalpalletes);
        palletes = palleteContainer.querySelectorAll(".pallete");
        for(let j = Number(palleteno)+1; j < totalpalletes; j++){

            let pallete = palletes[j];
            console.log(pallete,j);
            if(pallete){
                console.log(j);

                pallete.setAttribute("no",j-1);
            }
        }
        totalpalletes--;
        ptd.remove();
        palletes = palleteContainer.querySelectorAll(".pallete");

        for(let j = 0; j < totalpalletes; j++){
            palletes[j].style.width = `${Math.ceil(window.innerWidth/totalpalletes)}px`;
            addbtnmotion(palletes[j],j);
        }
        



    })
}

