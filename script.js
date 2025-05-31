const grid = document.getElementById('grid');
const modeBar = document.getElementById('settingsBar');
const changeButton = document.getElementById('changeButton');
const gridSizeInput = document.getElementById('gridSize');
const defaultGrid = 32;
createGrid(defaultGrid);

let mode = 'draw';

modeBar.addEventListener('click', (e)=>{
    if (e.target.id == 'random'){
        mode = 'random';
    }else if(e.target.id == 'draw'){
        mode = 'draw';
    }else if(e.target.id == 'erase'){
        mode = 'erase';
    }else if(e.target.id == 'clear'){
        clearGrid();
    }
    updateActiveButton();
});

changeButton.addEventListener('click', changeGrid);
gridSizeInput.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter'){
        console.log("hello!");
        changeGrid();
    }
});

grid.addEventListener('mouseover', draw);
grid.addEventListener('click', draw);

function updateActiveButton() {
    // Remove active class from all mode buttons
    const modeButtons = ['draw', 'erase', 'random'];
    modeButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('active');
        }
    });
    
    // Add active class to current mode button
    const activeButton = document.getElementById(mode);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function changeGrid(){
    size = gridSizeInput.value
    if (size > 100 || size < 1){
        alert("Please enter a number between 1-100!");
        size = '16';
        createGrid(16);
        return;
    }
    createGrid(size);
}

function createGrid(num) {
    grid.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `row${i}`;

        for(let j = 0; j < num; j++){
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.id = `row ${i}, pixel ${j}`;
            row.appendChild(pixel);
        }

        grid.appendChild(row);
    }
}

function clearGrid(){
    const boxes = document.querySelectorAll('.pixel');
    boxes.forEach(element => {
        element.style.backgroundColor = 'white';
    });
    console.log('CLEARED!');
}
 
function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function draw(e){
    const pixel = e.target;
    selectedColor = 'black'
    switch(mode){
        case 'draw':
            selectedColor = 'black';
            break;
        case 'erase':
            selectedColor = 'white';
            break;
        case 'random':
            selectedColor = randomColor();
            break;
        }
    if (e.type === 'mouseover' && e.buttons === 1) {
        if (e.shiftKey) {
            pixel.style.backgroundColor = 'white';
        } else {
            pixel.style.backgroundColor = selectedColor;
        }
    }
    //just when you want to click
    else if (e.type === 'click') {
        if (e.shiftKey) {
            pixel.style.backgroundColor = 'white';
        } else {
            pixel.style.backgroundColor = selectedColor;
        }
    }
}

//make the header rainbow
const header = document.querySelector('#info a span');
setInterval(() => {
    header.style.color = randomColor();
}, 800);