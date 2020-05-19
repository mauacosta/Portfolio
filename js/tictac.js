function startGame(){
    var board = [];
    var firstRow = ['', '', ''];
    board.push(firstRow);
    var secondRow = ['', '', ''];
    board.push(secondRow);
    var thirdRow = ['', '', ''];
    board.push(thirdRow);
    addPiece('x', 0, board);
}

function drawPiece(row, column, player){
    var divID = '#s' + row + '-' + column; 
    if(player==='o'){
        var content ='<div class="circle"></div>';
        $(divID).append(content);
    }

    if(player==='x'){
        var content ='<div class="tache"><div class="l1"></div><div class="l2"></div></div>';
        $(divID).append(content);
    }
}


async function paintTie(){
    console.log('tie');
    $('.tache').children().css('animation', 'tieCross 3s forwards');
    $('#tictactoe .circle').css( "animation", "tieCircle 3s forwards");
    await new Promise(r => setTimeout(r, 4000));
    $('#tictactoe th').empty();
    startGame();
}

async function paintXWin(){
    await new Promise(r => setTimeout(r, 2000));
    $('#tictactoe .circle').css('animation', 'fadeCircleOut 10s forwards');
    $('.tache').children().css('animation', 'winCross 10s forwards');
    await new Promise(r => setTimeout(r, 4000));
    $('#tictactoe th').empty();
    startGame();
}

async function paintOWin(){
    await new Promise(r => setTimeout(r, 2000));
    $('.tache').children().css('animation', 'fadeCrossOut 10s forwards');
    $('#tictactoe .circle').css('animation', 'winCircle 10s forwards');
    await new Promise(r => setTimeout(r, 4000));
    $('#tictactoe th').empty();
    startGame();
}


async function addPiece(player, turn, board){
    if(turn === 9){
        await new Promise(r => setTimeout(r, 3000));
        paintTie()
    }
    else if(turn === 0){
        var randRow = Math.floor(Math.random() * 3);
        var randCol = Math.floor(Math.random() * 3);
        board[randRow][randCol] = player;
        await new Promise(r => setTimeout(r, 3000));
        drawPiece(randRow, randCol, player);
        addPiece('o', turn + 1, board);
    }
    else if(player==='o'){
        var selected = checkMove(board);
        board[selected[0]][selected[1]] = player;
        await new Promise(r => setTimeout(r, 3000));
        drawPiece(selected[0], selected[1], player);
        if(!checkIfOWinner(board)){
            addPiece('x', turn + 1, board);
        }
        else{
            console.log('o won');
            paintOWin();
        }
    }
    else if(player==='x'){
        var selected = checkMove(board);
        board[selected[0]][selected[1]] = player;
        await new Promise(r => setTimeout(r, 3000));
        drawPiece(selected[0], selected[1], player);
        if(!checkIfXWinner(board)){
            addPiece('o', turn + 1, board);
        }
        else{
            console.log('x won');
            paintXWin();
        }
    }
}



function checkMove(board){
    var found = false;
    if((board[0][0] === 'x' && board[2][2] === 'x' || board[0][2] === 'x' && board[2][0] === 'x' || board[0][0] === 'o' && board[2][2] === 'o' || board[0][2] === 'o' && board[2][0] === 'o' || board[1][0] === 'x' && board[1][2] === 'x' || board[0][1] === 'x' && board[2][1] === 'x' || board[0][1] === 'o' && board[2][1] === 'o' || board[1][0] === 'o' && board[1][2] === 'o') && !board[1][1]){
        found = true;
        return [1, 1];
    }
    else if((board[0][0] === 'x' && board[1][0] === 'x' || board[2][1] === 'x' && board[2][2] === 'x' || board[0][2] === 'x' && board[1][1] === 'x' || board[0][0] === 'o' && board[1][0] === 'o' || board[2][1] === 'o' && board[2][2] === 'o' || board[0][2] === 'o' && board[1][1] === 'o') && !board[2][0]){
        found = true
        return [2, 0];
    }
    else if((board[0][0] === 'x' && board[2][0] === 'x' || board[1][2] === 'x' && board[1][1] === 'x' || board[0][0] === 'o' && board[2][0] === 'o' || board[1][2] === 'o' && board[1][0] === 'o') && !board[1][0]){
        found = true;
        return [1, 0];
    }
    else if((board[0][1] === 'x' && board[0][2] === 'x' || board[1][0] === 'x' && board[2][0] === 'x' || board[2][2] === 'x' && board[1][1] === 'x' || board[2][2] === 'o' && board[1][1] === 'o' || board[0][1] === 'o' && board[0][2] === 'o' || board[1][0] === 'o' && board[2][0] === 'o') && !board[0][0]){
        found = true;
        return [0, 0];
    }
    else if((board[1][1] === 'x' && board[2][1] === 'x' || board[0][0] === 'x' && board[0][2] === 'x' || board[0][0] === 'o' && board[0][2] === 'o' || board[1][1] === 'o' && board[2][1] === 'o') && !board[0][1]){
        found = true;
        return [0, 1];
    }
    else if((board[1][1] === 'x' && board[0][1] === 'x' || board[2][0] === 'x' && board[2][2] === 'x' || board[2][0] === 'o' && board[2][2] === 'o' || board[1][1] === 'o' && board[0][1] === 'o') && !board[2][1]){
        found = true;
        return [2, 1];
    }
    else if((board[0][0] === 'x' && board[0][1] === 'x' || board[1][2] === 'x' && board[2][2] === 'x' || board[2][0] === 'x' && board[1][1] === 'x' || board[2][0] === 'o' && board[1][1] === 'o' || board[0][0] === 'o' && board[0][1] === 'o' || board[1][2] === 'o' && board[2][2] === 'o') && !board[0][2]){
        found = true;
        return [0, 2];
    }
    else if((board[0][2] === 'x' && board[2][2] === 'x' || board[1][0] === 'x' && board[1][2] === 'x' || board[0][2] === 'o' && board[2][2] === 'o' || board[1][0] === 'o' && board[1][1] === 'o') && !board[1][2]){
        found = true;
        return [1, 2];
    }
    else if((board[0][2] === 'x' && board[1][2] === 'x' || board[2][0] === 'x' && board[2][1] === 'x' || board[0][0] === 'x' && board[1][1] === 'x' || board[0][0] === 'o' && board[1][1] === 'o'|| board[0][2] === 'o' && board[1][2] === 'o' || board[2][0] === 'o' && board[2][1] === 'o') && !board[2][2]){
        found = true;
        return [2, 2];
    }
    else{
        while(!found){
            var randRow = Math.floor(Math.random() * 3);
            var randCol = Math.floor(Math.random() * 3);
            if(!board[randRow][randCol]){
                found = true;
                return [randRow, randCol];
            }
        }
    }
    
}

function checkIfXWinner(board){
    if(board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x'){
        return true;
    }
    else if(board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x'){
        return true;
    }
    else if(board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x'){
        return true;
    }
    else if(board[0][0] === 'x' && board[1][0] === 'x' && board[2][0] === 'x'){
        return true;
    }
    else if(board[0][1] === 'x' && board[1][1] === 'x' && board[2][1] === 'x'){
        return true;
    }
    else if(board[0][2] === 'x' && board[1][2] === 'x' && board[2][2] === 'x'){
        return true;
    }
    else if(board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x'){
        return true;
    }
    else if(board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x'){
        return true;
    }
    else{
        return false;
    }
}

function checkIfOWinner(board){
    if(board[0][0] === 'o' && board[0][1] === 'o' && board[0][2] === 'o'){
        return true;
    }
    else if(board[1][0] === 'o' && board[1][1] === 'o' && board[1][2] === 'o'){
        return true;
    }
    else if(board[2][0] === 'o' && board[2][1] === 'o' && board[2][2] === 'o'){
        return true;
    }
    else if(board[0][0] === 'o' && board[1][0] === 'o' && board[2][0] === 'o'){
        return true;
    }
    else if(board[0][1] === 'o' && board[1][1] === 'o' && board[2][1] === 'o'){
        return true;
    }
    else if(board[0][2] === 'o' && board[1][2] === 'o' && board[2][2] === 'o'){
        return true;
    }
    else if(board[0][0] === 'o' && board[1][1] === 'o' && board[2][2] === 'o'){
        return true;
    }
    else if(board[0][2] === 'o' && board[1][1] === 'o' && board[2][0] === 'o'){
        return true;
    }
    else{
        return false;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  


