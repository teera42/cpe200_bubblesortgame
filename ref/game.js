const Gamedifficulty = [1000];
let minute = 00;
let seconds = 00;
let tens = 00;
let lapitem = 0;
let OutputMinute = document.getElementById('minute');
let OutputSeconds = document.getElementById('second');
let OutputTens =document.getElementById('tens');
let buttonStart = document.getElementsByClassName('play_button active');
const laps = document.getElementsByClassName("laps")[0];
var Interval , n ,m=00 ,x , s;
var t1 = [];
var t2;
var min , sec , te;



class Game
{
    difficulty; //difficulty based on Gamedifficulty array
    cols=4; //how many columns
    rows=4; //how many rows
    count; //cols * rows
    blocks; //the html elements with className = "puzzle_block"
    emptyBlock=[3,3]; //the coordinates of the empty block
    index=[]; //keeps track of the order of the blocks
    
    constructor(difficultyLevel =1)
    {
        this.difficulty = Gamedifficulty[difficultyLevel-1];
        this.count = this.cols*this.rows;
        this.blocks = document.getElementsByClassName("puzzle_block"); //grab the blocks
        this.init();
    }

    init() //position each block in its proper position
    {
        for(let y=0;y<this.rows;y++)        
        {
            for (let x=0;x<this.cols;x++) 
            {
                let blockIdx = x+y*this.cols;
                if (blockIdx+1>=this.count) 
                {
                    break;
                }
                let block = this.blocks[blockIdx];
                this.positionBlockAtBoard(blockIdx,x,y);
                block.addEventListener('click', (e)=>this.onClickonBlock(blockIdx));
                this.index.push(blockIdx);
            }
        }
        this.index.push(this.count-1);
    }

    randomize(iterationCount) //move a random block
    {
        for (let i=0;i<iterationCount;i++)  
        {
            let randomBlockIdx = Math.floor(Math.random() * (this.count-1));
            let move = this.moveBlock(randomBlockIdx);
            if(!move)
            {
                i--
            }        
        }
    }

    moveBlock(blockIdx) //move a block and return true if the block has move
    {
        let block = this.blocks[blockIdx];
        let blockBoard = this.canMoveBlock(block);
        if (blockBoard != null)
        {
            this.positionBlockAtBoard(blockIdx, this.emptyBlock[0], this.emptyBlock[1]);
            this.index[this.emptyBlock[0] + this.emptyBlock[1] * this.cols] = this.index[blockBoard[0] + blockBoard[1] * this.cols];
            this.emptyBlock[0] = blockBoard[0];
            this.emptyBlock[1] = blockBoard[1];
            return true;
        }
        return false;
    }

    canMoveBlock(block) //return the block coordinates if he can move else return null
    {
        let blockPos = [parseInt(block.style.left), parseInt(block.style.top)];
        let blockWidth = block.clientWidth;
        let blockBoard = [blockPos[0] / blockWidth, blockPos[1] / blockWidth];
        let diff = [Math.abs(blockBoard[0] - this.emptyBlock[0]), Math.abs(blockBoard[1] - this.emptyBlock[1])];
        let canmove = (diff[0] == 1 && diff[1] == 0) || (diff[0] == 0 && diff[1] == 1);
        if (canmove) 
        {
            return blockBoard;    
        }
        else
        {
            return null;
        }
    }

    positionBlockAtBoard(blockIdx,x,y) //position the block at a certain coordinates
    {
        let block = this.blocks[blockIdx];
        block.style.left = (x * block.clientWidth) + "px";
        block.style.top = (y * block.clientWidth) + "px";
    }

    onClickonBlock(blockIdx) //move blocks
    {
        if(this.moveBlock(blockIdx)){
            if (this.checkPuzzleSolved()) 
            {
                m++;
                var s  = [];
                s =(minute*6000+seconds*100+tens);
                addItemToExistingList(s); 
                setTimeout(()=>alert(`${minute} : ${seconds} : ${tens}`),600);
                clearInterval(Interval);
                lap();
            }
        }
        
    }
    

    checkPuzzleSolved() //return if puzzle was solved
    {
        for(let i=0; i<this.index.length; i++)
        {
            if(i==this.emptyBlock[0] + this.emptyBlock[1] * this.cols)
            {
                continue;
            }
            if(this.index[i] != i)
            {
                return false;
            }
        }
        return true;
        
    }

    setDifficulty(difficultyLevel) //set difficulty
    {
        this.difficulty = Gamedifficulty[difficultyLevel - 1];
        this.randomize(this.difficulty);
    }

    gettime()
    {
        return this;
    }
    
}
let game = new Game(1); //instantiate a new game

//talking care of the difficulty buttons
let play_buttons = Array.from(document.getElementsByClassName("play_button"));
play_buttons.forEach((elem,idx) =>{
    elem.addEventListener('click',(e) =>{
        play_buttons[Gamedifficulty.indexOf(game.difficulty)];
        game.setDifficulty(idx+1);
        clearInterval(Interval);
        Interval = setInterval(startTime, 10);    
        minute = "00";
        tens = "00";
        seconds = "00";
        OutputMinute.innerHTML = minute;
        OutputSeconds.innerHTML = seconds;
        OutputTens.innerHTML = tens;
        
    });
    
    function startTime(){
        
        tens++;
        if(tens <= 9){
            OutputTens.innerHTML = "0" + tens;
        }
        if(tens > 9){
            OutputTens.innerHTML = tens;
        }
        if(tens > 99){
            seconds++;
            OutputSeconds.innerHTML = "0" + seconds;
            tens = 0;
            OutputTens.innerHTML = "0" + tens;
        }
        if(seconds > 9){
            OutputSeconds.innerHTML = seconds;
        }
        if(seconds > 59){
            minute++;
            OutputMinute.innerHTML = "0" + minute;
            seconds = 0;
            OutputSeconds.innerHTML = "0" + seconds;
        }
        if(minute > 9){
            OutputMinute.innerHTML = minute;
        }
        
    } 
});

function lap()  {
    let t2 = "<ul>";
    for(let i = 0; i<m;i++){
        t2 += "<li>"+t1[i]+"</li>";
    }
    t2 += "</ul>";
    document.getElementById("time_stamp").innerHTML =t2;
}


function bubblesort(list)
{
    var isSwapped = false;
    for(var i = 0; i < list.length; i++)
    {
        isSwapped = false;
        for(var j = 0; j < ( list.length - i -1 ); j++)
        {
            if(list[j] > list[j+1])
            {
                var temp = list[j]
                list[j] = list[j + 1]
                list[j+1] = temp
                isSwapped = true;
            }
        }
        if(!isSwapped)
        {
            break;
        }
    }
}

let list = []
function addItemToExistingList(s){
    let noOfItems = list.length
    list[noOfItems] = s;
    
    bubblesort(list);
    
    for(i=0;i<m;i++){
        min= Math.floor(list[i] / 6000) ;
        sec = Math.floor((list[i]%6000 / 100));
        te = Math.floor((list[i]%6000)%100);
        if(te <= 9){
            te = "0" + te;
        }
        if(sec <= 9){
            sec = "0" + sec;
        }
        if(min <= 9){
            min = "0" + min;
        }
         t1[i] = ( `${min} : ${sec} : ${te} `);
    }
    console.log(t1);
}