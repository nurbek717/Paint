//GLOBAL VEREBLES
const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll (".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slaider"),
colorBtn = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector('#color-picker'),
crearCanves = document.querySelector('.crear-canves'),
saveImgBtn = document.querySelector('.save-img')

//VARIBLE WITH DEFULT VALUE
let ctx = canvas.getContext('2d'),
isDrawing = false,  //odiy holati
brushWidh = 5,
selectedToll = 'brush',
selectedColor = '#000',
prevMouseX,
prevMouseY,
snapShot


//SET CANVAS Widht AND Heigt
window.addEventListener('load', () => {
   canvas.width =canvas.offsetWidth
   canvas.height = canvas.offsetHeight
   cannvasBackround()
})



const startDraw = e => {
   isDrawing = true //meshka bosilgandagi holati
   prevMouseX = e.offsetX
   prevMouseY = e.offsetY
   ctx.beginPath()
   ctx.lineWidth = brushWidh
   ctx.strokeStyle = selectedColor
   ctx.fillStyle = selectedColor
   snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
   console.log(snapShot);
   
}
const  drowRectangle =  e => {
    fillColor.checked
       ?  ctx.fillRect(e.offsetX, e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY )
       :  ctx.strokeRect(e.offsetX, e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY )
}
const drawCircle = e => {
   ctx.beginPath();
   const radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow(prevMouseY - e.offsetY, 2));
   ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
   fillColor.checked ? ctx.fill() : ctx.stroke();
}
const drawTriangle = e => {
   ctx.beginPath()
   ctx.moveTo(prevMouseX, prevMouseY)
   ctx.lineTo(e.offsetX, e.offsetY)
   ctx.lineTo(prevMouseX * 2 - e.offsetX , e.offsetY)
   ctx.closePath() //conteksni o'lab beradi.
   fillColor.checked ? ctx.fill() : ctx.stroke();
   
}
const drawing = e => {
   if (!isDrawing) return
   ctx.putImageData(snapShot, 0,0)
   
   switch (selectedToll) {
      case 'brush':
      ctx.lineTo(e.offsetX, e.offsetY) //chiziladigan yo‘lni belgilaydi, 
      ctx.stroke() // ko‘rinadigan qilib chizadi
      break;
      case 'rectangle':
        drowRectangle(e)
        break;
      case 'circle':
         drawCircle(e)
        break;
      case 'triangle':
         drawTriangle(e)
        break;
      case 'eraser':
        ctx.strokeStyle = "#fff"
        ctx.lineTo(e.offsetX, e.offsetY) 
        ctx.stroke() 
        break;
      default:
      break;
   }
   
}

toolBtns.forEach(btn => {
   btn.addEventListener("click", () => {
      document.querySelector(".options .active").classList.remove("active")
      btn.classList.add("active")
      selectedToll = btn.id
      console.log(selectedToll);
   })
})

//CHANGE BRUSH With
sizeSlider.addEventListener('change', () => (brushWidh = sizeSlider.value))

// SET COLOR TO SHAPES
colorBtn.forEach(btn => {
   btn.addEventListener("click" , evt => {
      document.querySelector(".options .selected").classList.remove("selected")
      btn.classList.add("selected")
      const bgColor = window.getComputedStyle(btn).getPropertyValue("background-color")
      selectedColor = bgColor
      console.log(selectedColor);
   })
})

//Color PICKER
colorPicker.addEventListener("change" , e => {
   colorPicker.parentElement.style.background = colorPicker.value
   colorPicker.parentElement.click()
})

//crearCanvesbtb
crearCanves.addEventListener('click', ()=> {
   ctx.clearRect(0, 0,  canvas.width,canvas.height )
   cannvasBackround()
})
//SAVE LIKE IMAGE OUR PAINT
saveImgBtn.addEventListener('click', () => {
   const link = document.createElement('a')
   link.download = `nurbek-paint${Date.now()}.jpg`
   link.href = canvas.toDataURL()
   link.click()
} )
// CANVES BACKROUND
const cannvasBackround = () => {
   ctx.fillStyle = '#fff'
   ctx.fillRect(0,0, canvas.width, canvas.height)
   ctx.fillStyle = selectedColor
}
const stopDraw = () => {
   isDrawing = false //meshka olgandagi holati
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)