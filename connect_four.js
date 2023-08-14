
//////////////////////////////////////
var dropSound = document.getElementById("dropSound");
var winSound = document.getElementById("winSound");
var startSound = document.getElementById("startSound");
var p1nameSound = document.getElementById("p1nameSound");
var p2nameSound = document.getElementById("p2nameSound");
var player1, player2;



Swal.fire({
  title: 'Welcome to Connect Four Game!',
  text: 'Press "Start Game" to begin.',
  showCancelButton: false,
  confirmButtonText: 'Start Game'
}).then((result) => {
  if (result.isConfirmed) {

p1nameSound.play()
Swal.fire({
  title: 'Enter Player One Name',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: false,
  confirmButtonText: 'Submit',
  preConfirm: (name) => {
    if (!name) {
      Swal.showValidationMessage('Name is required');
    }

    return name;
  },
  allowOutsideClick: false
}).then((result) => {
  if (result.isConfirmed) {
    player1 = result.value;
p2nameSound.play()
    Swal.fire({
      title: 'Enter Player Two Name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Submit',
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage('Name is required');
        }
        return name;
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        player2 = result.value;

        startSound.play()

// var player1 = prompt("Player One: Enter Your Name , you will be Blue");
// var player2 = prompt("Player Two: Enter Your Name, you will be Red");
}
    });
  }
});
}
    });

var player1Color = 'rgb(86, 151, 255)';
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');


// video element
var backgroundVideo = document.getElementById("backgroundVideo");

// Play
backgroundVideo.addEventListener("canplay", function() {
  backgroundVideo.play();
});

// Loop the video
backgroundVideo.addEventListener("ended", function() {
  backgroundVideo.currentTime = 0; // Restart the video
  backgroundVideo.play();
});




// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// Change the color of a button
function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// Report Back to current color of a button
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgba(208, 244, 222, 0.5)') {
      return row
    }
  }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgba(208, 244, 222, 0.5)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Game End
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      if (winningPlayer === player1) {
        $('h1').text(player2 + " has won! Refresh your browser to play again!").css("fontSize", "50px");
      } else {
        $('h1').text(player1 + " has won! Refresh your browser to play again!").css("fontSize", "50px");
      }
      winSound.play();


Swal.fire({
  title: 'Game Over',
  html: '<img src="winning.gif" style="max-width: 100%; height: auto;">' +
        '<p>' + winningPlayer + ' has won!</p>',
  text: winningPlayer + ' has won!',
  icon: 'success',
  confirmButtonText: 'Play Again',
  allowOutsideClick: false
}).then((result) => {
  if (result.isConfirmed) {
    // Reload the page to play again
    location.reload();
  }
});
}
}
}
// Start with Player One
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// Start with Player One
$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click',function() {
    dropSound.play();

  $(this).addClass('clicked');
  setTimeout(() => $(this).removeClass('clicked'), 300);

  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }

})



// Helper function to help you understand Rows and Columns From A Table
// http://stackoverflow.com/questions/788225/table-row-and-column-number-in-jquery
//
// $('.board button').on('click',function(){
//   // This is the Column Number (starts at zero):
//   console.log('This is the Column:');
//   console.log($(this).closest("td").index());
//   // This is the Row Number:
//   console.log("This is the Row:");
//   console.log($(this).closest("tr").index());
//   console.log('\n');
//   // This is a way to grab a particular cell (replace):
//   // $('table').eq(rowIndex).find('td').eq(colIndex)
// });

// // Change color on click
// $('.board button').on('click',function() {
//   if($(this).css('background-color') === 'rgb(51, 51, 51)'){
//     $(this).css('background-color','rgb(86, 151, 255)');
//   }else if ($(this).css('background-color') === 'rgb(86, 151, 255)'){
//     $(this).css('background-color','rgb(237, 45, 73)');
//   }else{
//     $(this).css('background-color','rgb(51, 51, 51)');
//   }
// });
