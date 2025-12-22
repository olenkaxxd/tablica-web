let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

let drawing = false;
let color = "black";
let size = 5;
let startX, startY;

let pages = [[]];  // lista stron (każda strona = lista linii)
let currentPage = 0;

function redraw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid();
    for(let line of pages[currentPage]){
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        for(let p of line) ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.size;
        ctx.stroke();
    }
}

function drawGrid(){
    let spacing = 25;
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for(let x=0;x<canvas.width;x+=spacing){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }
    for(let y=0;y<canvas.height;y+=spacing){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

canvas.addEventListener("mousedown", e=>{
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    pages[currentPage].push([{x:startX,y:startY, color:color, size:size}]);
});

canvas.addEventListener("mousemove", e=>{
    if(!drawing) return;
    let line = pages[currentPage][pages[currentPage].length-1];
    line.push({x:e.offsetX, y:e.offsetY, color:color, size:size});
    redraw();
});

canvas.addEventListener("mouseup", e=>{
    drawing = false;
});

function setColor(c){ color=c; }
function setSize(s){ size=s; }
function setEraser(){ color="white"; }
function undo(){
    if(pages[currentPage].length>0) pages[currentPage].pop();
    redraw();
}
function newPage(){ pages.push([]); currentPage=pages.length-1; redraw(); }
function prevPage(){ if(currentPage>0){ currentPage--; redraw(); } }
function nextPage(){ if(currentPage<pages.length-1){ currentPage++; redraw(); } }

drawGrid();
