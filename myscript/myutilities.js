function turnShift (setBoard) {
  let nowPlay = (setBoard.turn === true) ? 0 : 1;
  $('.player').text(setBoard.players[nowPlay].name);
  $('.player').attr('id', setBoard.players[nowPlay].now)
  setBoard.colorChange = setBoard.players[nowPlay].color;
  setBoard.players[nowPlay].move.push(setBoard.theMove);
  sortedMove = setBoard.players[nowPlay].move.sort((a, b) => a - b);
  return[setBoard, sortedMove]
}

function winCheck (setBoard, sortedMove) {
  setBoard.winningArrays.forEach(winning => {
     let winner = (setBoard.turn === true) ? 1 : 0;
     let winnerMove = setBoard.players[winner].move.filter(onemove => $(`#${onemove}`).attr('class') != undefined);
     setBoard.players[winner].move = winnerMove;
     let winChecker = (arr, target) => target.every(v => arr.includes(v));

     if (winChecker(sortedMove, winning) === true) {
        theWinner(setBoard.players[winner])
        setBoard.players.forEach(player => player.move = []);
     }

  })
  return setBoard;
}

function boardFull (setBoard) {
  let boardFull = checkingEmpty($('td'));
  if (boardFull === true) {
    theTie();
    setBoard.players.forEach(player => player.move = []);
  }
  return setBoard;
}

function hoverColumn (indexColumn, setBoard, hoverOn) {
  let nowPlay = (setBoard.turn === false) ? 0 : 1;
  setBoard.hoverColor = setBoard.players[nowPlay].hover;

  if (hoverOn === true) {$(`td:nth-child(${indexColumn})`).css(setBoard.hoverColor);}

  $(`table tr > td:nth-child(${indexColumn})`)
  .mouseover(function () {
  $(`td:nth-child(${indexColumn})`).css(setBoard.hoverColor)
  })
  .mouseout(function () {
  $(`td:nth-child(${indexColumn})`).css({'background-color': '', 'border': '2px solid #ccc'})
  })
}

function clickColumn (indexColumn, colorChange) {
    const columnElements = $(`td:nth-child(${indexColumn})`);
    const theUndefineds = []
    for (let element of columnElements) {
      if (element.attributes.class === undefined) {
        theUndefineds.push(element.attributes.id.value)
      }
    }
    const lastUndefined = theUndefineds[theUndefineds.length - 1]
    $(`#${lastUndefined}`).addClass(colorChange)
    return(parseInt(lastUndefined))
}

function checkingEmpty (groupNode) {
  const isNotEmpty = (theNode) => theNode.attributes.class !== undefined;
  const allCells = Array.from(groupNode)
  return(allCells.every(isNotEmpty))
}

function winningCondition () {
  let winCond = []
  // Checking Horizontale win
  for ( let row = 0; row < 42; row += 7) {
      for (let line = (1 + row); line <= (4 + row); line++) {
          winCond.push([line, line + 1, line + 2, line + 3])
      }
  }
  // Checking Verticale
  for (let row = 0; row < 7; row++) {
    for (let line = (1 + row); line <= (15 + row); line += 7) {
        winCond.push([line, line + 7, line + 14, line + 21])
    }
  }
  // Checking diagonals left - down win
  for (let row = 0; row <= 15; row += 7) {
    for (let line = (1 + row); line <= (4 + row); line++) {
        winCond.push([line, line + 8, line + 16, line + 24])
      }
  }
  // Checking diagonals right - down win
  for (let row = 0; row <= 18; row += 7) {
    for (let line = (4 + row); line <= (7 + row); line++) {
        winCond.push([line, line + 6, line + 12, line + 18])
      }
  }
  // return winCond, which we will use to reassign the winningArrays
  return(winCond)
}

function theWinner(player) {
  let winContent = "\
  <h1 class='text-success' style='font-size: 1.6rem;'><span id='winner'>Nothing</span> you won</h1>\
  <div class='row'>\
    <div class='col-12 my-4'>\
      <img class='img-fluid win' src='image/reward.png'>\
    </div>\
    <div class='col-12'>\
      <button class='btn btn-secondary' type='button' name='button' onclick='location.reload()'>Restart</button>\
      <button class='replay btn btn-success' type='button' name='button' onclick='replay()'>Replay</button>\
    </div>\
  </div>\
  ";
  $("#myContent").html(winContent);
  $("#winner").text(player.name);
  $("#popit").addClass("active");
}

function theTie () {
  let tieContent = "\
  <h1 class='text-success' style='font-size: 1.6rem;'>Seems we have a tie!</h1>\
  <div class='row'>\
    <div class='col-12 mt-3 mb-4'>\
      <img class='img-fluid win' src='image/white-flag.png'>\
    </div>\
    <div class='col-12'>\
      <button class='btn btn-secondary' type='button' name='button' onclick='location.reload()'>Restart</button>\
      <button class='replay btn btn-success' type='button' name='button' onclick='replay()'>Replay</button>\
    </div>\
  </div>\
  ";
  $("#myContent").html(tieContent);
  $("#popit").addClass("active");
  // replay();
}

function replay () {
  $('#popit').removeClass("active");
  const boardCell = Array.from($('td'));
  boardCell.forEach(cell => $(cell.tagName).removeAttr('class'));
}
