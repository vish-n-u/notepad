const container = document.querySelector(".container")
const hamburgerIcon = document.querySelector(".hamburgerIcon")
const toolsContainer = document.querySelector(".toolsContainer")
const pencilSizeContainer = document.querySelector(".pencilSizeContainer")
const pencilColorContainer = document.querySelector(".pencilColorContainer")
const pencilSvg = document.querySelector(".pencilSvg")
const pencilSvgContainer = document.querySelector(".pencilSvgContainer")
const eraserSizeContainer = document.querySelector(".eraserSizeContainer")
const eraserSvg = document.querySelector(".eraserSvg")
const stickySvg = document.querySelector(".stickySvg")
const upload = document.querySelector(".uploadSvg")
let showTools = true;
let showPencilOptions = false;
let showEraserOptions = false;
let showStickyNote = false;
hamburgerIcon.addEventListener("click", ()=>{
    if(showTools) {
    showTools = false
      hideToolsContainer()
    }
    else{
       showToolsContainer()
        showTools = true
    }
})


pencilSvg.addEventListener("dblclick",()=>{
    if(!showPencilOptions){
        showPencilSizeAndColorPickerContainer();
        showPencilOptions = true
    }
    else{
        hidePencilSizeAndColorPickerContainer()
        showPencilOptions=false
    }
})

eraserSvg.addEventListener("dblclick",()=>{

    if(showEraserOptions){
        hideEraserSizePicker()
        showEraserOptions=false
    }
    else{
        showEraserSizePicker()
        showEraserOptions=true
    }
})

document.addEventListener("click",(e)=>{
    if(showEraserOptions){
        if(!eraserSizeContainer.contains(e.target)) {
            hideEraserSizePicker()
            showEraserOptions=false
        }
    }
    if(showPencilOptions){
        console.log("e.target",)
        if(!pencilSizeContainer.contains(e.target)&&!pencilColorContainer.contains(e.target)){
            hidePencilSizeAndColorPickerContainer()
        showPencilOptions=false
        }
    }
})

upload.addEventListener("click",()=>{
    const input = document.createElement("input")
    input.setAttribute("id","input-file")
    input.type ="file"
    input.accept ="image/png, image/gif, image/jpeg"
    input.click()
    console.log("input.value",input.value)
    input.addEventListener("change", () => {
        const selectedFile = input.files[0];
        console.log("selectedFile", selectedFile);
        const imgUrl = URL.createObjectURL(selectedFile);
        createStickyNote(imgUrl)
    })
})



stickySvg.addEventListener("click",()=>{
    createStickyNote()
})
function hideToolsContainer(){
    hamburgerIcon.classList.remove("fa-x")
    hamburgerIcon.classList.add("fa-bars")
    toolsContainer.style.display = "none"
    hidePencilSizeAndColorPickerContainer()
    hideEraserSizePicker()
}

function showToolsContainer(){
    hamburgerIcon.classList.remove("fa-bars")
    hamburgerIcon.classList.add("fa-x")
    toolsContainer.style.display = "flex"
}


function showPencilSizeAndColorPickerContainer(){
    pencilSizeContainer.style.display = "flex"
    pencilColorContainer.style.display = "flex"
}
function hidePencilSizeAndColorPickerContainer(){
    pencilSizeContainer.style.display = "none"
    pencilColorContainer.style.display = "none"
    
}

function hideEraserSizePicker(){
    eraserSizeContainer.style.display = "none"
    showEraserOptions = false
}
function showEraserSizePicker(){
    eraserSizeContainer.style.display = "flex"
    showEraserOptions = true
}



function createStickyNote(imgUrl){
    const para = document.createElement("div");
    para.style.zIndex =100
    let childElemHeader = document.createElement("div")
    let childElemBody
    if(imgUrl){
        childElemBody = document.createElement("img");
        childElemBody.src = imgUrl
    }
    else childElemBody = document.createElement("textarea");
    let childElemHeaderMinimize = document.createElement("button")
    let childElemHeaderCut = document.createElement("button")
    para.classList.add("stickyNote")
   childElemHeader.classList.add("stickyNoteHeader")
   childElemHeaderMinimize.classList.add("stickyNoteHeaderMinimize")
   childElemHeaderCut.classList.add("stickyNoteHeaderCut")
   childElemBody.classList.add("stickyNoteInput")

   childElemHeader.append(childElemHeaderMinimize)
   childElemHeader.append(childElemHeaderCut)
    para.append(childElemHeader)
    para.append(childElemBody)
    container.appendChild(para)
    
    childElemHeaderCut.addEventListener("click",()=>
    {
        
        para.remove()
        // showStickyNote=false
    })
    childElemHeaderMinimize.addEventListener("click",(e)=>{
        console.log("click",)
       
        if(childElemBody.style.display=="none"){
            childElemBody.style.display = "flex"
        }
        else{
            childElemBody.style.display = "none"
        }
    })




    para.onmousedown = function(event) {
console.log("onPointerDown")
        let shiftX = event.clientX - para.getBoundingClientRect().left;
        let shiftY = event.clientY - para.getBoundingClientRect().top;
      
       
        para.style.zIndex = 1000;
        // document.body.append(ball);
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            para.style.left = pageX - shiftX + 'px';
            para.style.top = pageY - shiftY + 'px';
            console.log("called here",pageX,pageY);
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('pointermove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        para.onpointerup = function() {
          document.removeEventListener('pointermove', onMouseMove);
          para.onpointerup = null;
        };
      
      };
      
      
      para.onpointerdown= function(event) {
        // e.p
      container.style.touchAction = 'none';
        const shiftX = event.clientX - para.getBoundingClientRect().left;
        const shiftY = event.clientY - para.getBoundingClientRect().top;
      
        para.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          para.style.left = pageX - shiftX + 'px';
          para.style.top = pageY - shiftY + 'px';
        }
      
        function onTouchMove(event) {
          moveAt(event.touches[0].pageX, event.touches[0].pageY);
        }
      
        // move the ball on touchmove
        document.addEventListener('touchmove', onTouchMove);
      
        // drop the ball, remove unneeded handlers
        para.ontouchend = function() {
          document.removeEventListener('touchmove', onTouchMove);
          para.ontouchend = null;
        };
      };
      
      para.ondragstart = function() {
        return false;
      };
      
    }
