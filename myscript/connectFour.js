const connect4Game = new ConnectFour()

function ConnectFour () {
  const colorTurn = {
    blueTurn: ['blueClick', {'border': '2px solid #457b9d' }, 'blueNow'],
    redTurn: ['redClick', {'border': '2px solid #e63946' }, 'redNow']
  };
  const playerOne = new Player(colorTurn.blueTurn);
  const playerTwo = new Player(colorTurn.redTurn);
  this.gameConnect = new GameConnected(playerOne, playerTwo);
}

function GameConnected (playerOne, playerTwo) {
  $('#popit').addClass("active");

  $('#inplay').click(() => {
    $('#popit').removeClass("active");
    let nameOne = $("#player_1").val();
    let nameTwo = $("#player_2").val();
    let players = [nameOne, nameTwo];
    playerOne.name = players[Math.floor(Math.random() * players.length)];
    playerTwo.name = (playerOne.name === players[0]) ? players[1] : players[0];
    $('.player').text(playerOne.name);
    $('.player').attr('id', playerOne.now)

    boardConnect(playerOne, playerTwo);
  })
}

function boardConnect (playerOne, playerTwo) {

  let setBoard = new function() {
    this.winningArrays = winningCondition();
    this.players = [playerOne, playerTwo];
    this.hoverColor = this.players[0].hover;
    this.colorChange = this.players[0].color;
    this.turn = false;
    this.theMove;
  }

  for (let indexColumn = 0; indexColumn <= 7; indexColumn++) {

    $(`table tr > td:nth-child(${indexColumn})`)
    .click(() => {
      let columnFull = checkingEmpty($(`td:nth-child(${indexColumn})`))
      // console.log(columnFull);
      if (columnFull === false) {
        setBoard.theMove = clickColumn(indexColumn, setBoard.colorChange);
        [setBoard, sortedMove] = turnShift(setBoard);
        setBoard = winCheck(setBoard, sortedMove);
        setBoard = boardFull(setBoard)
        setBoard.turn = !setBoard.turn
        hoverColumn(indexColumn, setBoard, true);
      }

    })

    hoverColumn(indexColumn, setBoard, false);

  }
}

function Player (color) {
  this.name;
  this.color = color[0];
  this.hover = color[1];
  this.now = color[2];
  this.move = [];
}
