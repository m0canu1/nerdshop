/*
Stefano Martinelli - 812155
Realizzazione del gioco del sito
Il gioco si ispira all'esercizio svolto: se si indovinano 4 smartphone su 5 si vince uno sconto da
poter utilizzare per il prossimo acquisto.
*/

jQuery(document).ready(function (){
  var productsList,
    product,
    nodes,
    item,
    n,
    interval,
    numq = 0,
    right = 0;
  NUMQUEST = 5;

  jQuery.ajax({
    type: 'GET',
    url: '../model/users/getDiscount.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      if(result > 0) {
        jQuery('#alreadygame').show();
        jQuery('#game').hide();
      } else {
        jQuery('#alreadygame').hide();
        jQuery('#game').show();
      }
    },
    error: function(result){
      console.log(result.msg);
    }
  });

  jQuery.ajax({
    type: 'GET',
    url: '../model/product/getProducts.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      productsList = JSON.parse(JSON.stringify(result));
    },
    error: function(error) {
      console.log('Errore: impossibile ottenere le informazioni dei prodotti.');
    }
  });

  jQuery('#startbutton').click(function() {
    jQuery('.gamedesc').hide();
    jQuery('.gameres').show();
    jQuery('#startbutton').hide();
    jQuery('.gameresult').hide();
    jQuery('.left').text(5);
    jQuery('.guessed').text(0);
    var seconds_left = 45;
    interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --seconds_left + ' secondi';
      if (seconds_left <= 0 ) {
         document.getElementById('timer_div').innerHTML = "Finito!";
         clearInterval(interval);
      }
    }, 1000);
    setTimeout(exitGame, 45000);

    jQuery('#timer_div').show();
    numq++;
    nodes = document.getElementById('gamearea').childNodes;
    item = productsList[Math.floor(Math.random()*productsList.length)].replace(' ', '');
    product = item;
    for(var i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'div') {
        nodes[i].style.backgroundImage = "url('../img/product/"+item.replace(' ', '')+".png')";
      }
    }
    for(var j=1; j<5; j++){
      jQuery('#solbtn'+j).toggle();
    }

    newSolutions(nodes, item);
    shuffle();
  });

  jQuery('#solbtn1').click(function() {
    newQuestion(1);
    newSolutions(nodes, item);
    shuffle();
  });

  jQuery('#solbtn2').click(function() {
    newQuestion(2);
    newSolutions(nodes, item);
    shuffle();
  });

  jQuery('#solbtn3').click(function() {
    newQuestion(3);
    newSolutions(nodes, item);
    shuffle();
  });

  jQuery('#solbtn4').click(function() {
    newQuestion(4);
    newSolutions(nodes, item);
    shuffle();
  });

  function newSolutions(nodes, item) {
    var tmplist = [];
    var rndm = Math.floor(Math.random()*4) + 1;
    jQuery('span', '#solbtn'+rndm).text(item);
    tmplist.push(item);
    var count = 1;
    var found;
    while(count != 5) {
      found = false;
      if(count != rndm) {
        var prod = productsList[Math.floor(Math.random()*productsList.length)].replace(' ', '');
        for(var i=0; i < tmplist.length; i++) {
          if(prod == tmplist[i])
            found = true;
        }
        if((item.localeCompare(prod) != 0) && !found) {
          jQuery('span', '#solbtn'+count).text(prod);
          tmplist.push(prod);
          count++;
        }
      } else count++;
    }
  } // soluzioni alla domanda del gioco

  function newQuestion(n) {
    jQuery('.left').text(NUMQUEST-numq);
    numq++;
    if(product.localeCompare(jQuery('#solbtn'+n).text()) == 0)
      jQuery('.guessed').text(++right);
    if(numq > NUMQUEST) exitGame();
    nodes = document.getElementById('gamearea').childNodes;
    item = productsList[Math.floor(Math.random()*productsList.length)].replace(' ', '');
    product = item;
    for(var i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'div') {
        nodes[i].style.backgroundImage = "url('../img/product/"+item.replace(' ', '')+".png')";
      }
    }

  } // nuova domanda del gioco

  function exitGame() {
    jQuery('.left').text(0);
    clearInterval(interval);
    jQuery('#timer_div').hide();
    for(var j=1; j<5; j++){
      jQuery('#solbtn'+j).hide();
    }
    for(var i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'div') {
        nodes[i].style.backgroundImage = "url('../img/question-mark.png')";
      }
    }
    if(right >= 4) {
      jQuery('.gameresult').text('Congratulazioni! Hai vinto un coupon da 20€!');
      jQuery('.gameresult').show();

      jQuery.ajax({
        type: 'POST',
        url: '../model/game/discount.php',
        data: {
          user: jQuery("#user").val(),
        },
        dataType: 'JSON',
        success: function(result){
          var json = result;
          console.log(json.msg);
        },
        error: function(result){
          var json = result;
          console.log(json.msg);
        },
      });
    } else {
      jQuery('.gameresult').text('Peccato! Hai perso..');
      jQuery('.gameresult').show();
      jQuery('#startbutton').show();
      numq = 0;
      right = 0;
    }
  } // terminazione del gioco


  // Creazione del gioco
  SIDECELL = $('gamearea').getWidth() / 4;  // a cell has got 4 sides
  NUM_LINES_COLUMNS = $('gamearea').getWidth() / SIDECELL; // (400/100) = 4

  var cell = $('gamearea').firstDescendant(); //first child that's an element
  var cells = $('#gamearea > div');
  var i, j; //iterators

  //every cell get a id, a position and a piece of the background
  for(i = 0; cell; i++) {
    for(j = 0; cell && j < NUM_LINES_COLUMNS; j++){
      cell['line'] = i;
      cell['column'] = j;
      setID(cell);
      setPosition(cell['line'], cell['column']);
      setBackground(cell['line'], cell['column']);
      cell = cell.next(); //first following sibling
    }
  }
});

function getCell(line, col) {
  return $('cell_' + line + '_' + col);
} //get the cell (x;y)

function setPosition(line, col) {
  getCell(line, col).style.top = (SIDECELL * line) + 'px';
  getCell(line, col).style.left = (SIDECELL * col) + 'px';
} //sets the position of each cell

function setID(cell) {
  if (cell.hasOwnProperty('line') && cell.hasOwnProperty('column')) {
    //true if the cell has the specified property as own property
    cell.id = 'cell_' + cell['line'] + '_' + cell['column'];
  }
} //sets the ID of each cell

function setBackground(line, col){
  getCell(line, col).style.backgroundPosition = (-col * SIDECELL) + 'px ' + (-line * SIDECELL) + 'px';
} //sets the puzzles' background

function shuffle() {
  for(var i = 0; i < (Math.random() * (NUM_LINES_COLUMNS * 100)); i++) {
    var randomLine = parseInt(Math.random() * 4);
    var randomColumn = parseInt(Math.random() * 4);
    var randomLine2 = parseInt(Math.random() * 4);
    var randomColumn2 = parseInt(Math.random() * 4);
    move(randomLine, randomColumn, randomLine2, randomColumn2);
  }

} //shuffle of the puzzle

function move(line, column, line2, column2) {
  var c = getCell(line, column);
  if (c) {
    var c2 = getCell(line2, column2);
    var tmpl = line;
    var tmpc = column;
    c2.style.top = line * SIDECELL + 'px';
    c2.style.left = column * SIDECELL + 'px';
    c2['line'] = line;
    c2['column'] = column;
    c2.id = 'cell_' + line + '_' + column;
    var templine = c['line'];
    var tempcolumn = c['column'];
    c.style.top = line2 * SIDECELL + 'px';
    c.style.left = column2 * SIDECELL + 'px';
    c['line'] = line2;
    c['column'] = column2;
    c.id = 'cell_' + line2 + '_' + column2;
  }
} //it moves two cell (they're adjacent if the function isn't called by 'shuffle')
