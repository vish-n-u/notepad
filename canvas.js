let canvas = document.querySelector("canvas")
let pencilSize = document.querySelector("#pencilSize")
let pencilColor = document.querySelector(".pencilColorContainer")
let eraser = document.querySelector(".eraserSvg")
let pencil = document.querySelector(".pencilSvg")
let eraserSize = document.querySelector("#eraserSize")
let download = document.querySelector(".downloadSvg")
let undo = document.querySelector(".undoSvg")
let redo = document.querySelector(".redoSvg")
let canvasImgUrls = []
let currImageLocation = 0
canvas.style.touchAction = "none"

let isEraserSelected = false

canvas.width = screen.availWidth
canvas.height = screen.height - (0.172*screen.height)
canvas.style.position="absolute"
canvas.style.left = "0"
canvas.style.top = "0"


const tools = canvas.getContext("2d")

tools.fillStyle = "white"
tools.fillRect(0, 0, canvas.width, canvas.height);
let pencilStrokeColor = "black"
let eraserStrokeColor = "#ffffff"
let pencilStrokeWidth = "3"
let eraserStrokeWidth = "3"
tools.fillStyle="white"
let firstImgUrl = canvas.toDataURL()
canvasImgUrls.push(firstImgUrl)
let isStrokePainting = false


pencilSize.addEventListener("input",(e)=>{
    pencilStrokeWidth = e.target.value;
})

pencilColor.addEventListener("click",(e)=>{
    pencilStrokeColor = e.target.id
})

eraser.addEventListener("click",(e)=>{
    console.log("eraser clicked")
    if(!isEraserSelected){
        isEraserSelected =true
        eraserStrokeWidth = "3"
        eraserSize.value ="3"
    }
})
pencil.addEventListener("click",(e)=>{
    console.log("pencil clicked",tools.strokeStyle)
    if(tools.strokeStyle=="#ffffff"){
        pencilStrokeColor ="black"
        pencilStrokeWidth = "3"
        pencilSize.value = "3"
    }
    isEraserSelected = false //
})

eraserSize.addEventListener("input",(e)=>{
    console.log("e.value",e.target.value)
    eraserStrokeWidth = e.target.value
})

canvas.addEventListener("pointerdown",(e)=>{
    console.log("pencilStrokeColor",pencilStrokeColor,isEraserSelected,pencilStrokeWidth)
    tools.strokeStyle = isEraserSelected ? eraserStrokeColor:pencilStrokeColor
    tools.lineWidth = isEraserSelected ? eraserStrokeWidth:pencilStrokeWidth
    startStroke(e.pageX,e.pageY)
    isStrokePainting = true
})

canvas.addEventListener("pointermove",(e)=>{
   if(!isStrokePainting)return
   stroking(e.clientX,e.clientY)
   
})

canvas.addEventListener("pointerup",(e)=>{
    isStrokePainting = false
    let image = canvas.toDataURL()
    canvasImgUrls.push(image)
    currImageLocation = canvasImgUrls.length-1
})

 undo.addEventListener("click",(e)=>{
    if(currImageLocation<=0)return
    let img = new Image
    img.onload = function(){
        tools.drawImage(img,0,0,canvas.width,canvas.height); // Or at whatever offset you like
        currImageLocation = currImageLocation-1

      };
      img.src = canvasImgUrls[currImageLocation-1];
})

redo.addEventListener("click",()=>{
    if(currImageLocation>=canvasImgUrls.length-1)return
    let img = new Image
    img.onload = function(){
        tools.drawImage(img,0,0,canvas.width,canvas.height); // Or at whatever offset you like

        currImageLocation = currImageLocation+1

      };
      img.src = canvasImgUrls[currImageLocation+1];
})


download.addEventListener("click",(e)=>{
  
    let image = canvas.toDataURL()
    let a = document.createElement("a")
    a.href = image
    a.download = "board.jpg"
    a.click()
    
})



function startStroke(x,y){
    
    tools.beginPath()
    tools.moveTo(x,y)
}

function stroking(x,y,obj){
    if(obj){
        tools.strokeStyle = obj.toolsColor
    tools.lineWidth = obj.toolsWidth
    }
    tools.lineTo(x,y)
    tools.stroke()
}