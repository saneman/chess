"use strict";

var

colours = {
  white: 'white',
  black: 'black'
},

gWhoIsInCheck = {
  white: false,
  black: false,
  attackers: {
    white: [],
    black: []
  },
  clearCheck: function () {
    this.white = false;
    this.black = false;
    this.attackers.white = [];
    this.attackers.black = [];
  }
},

players = {
  a: {
    name: 'Guy',
    colour: colours.white,
    side: 'bottom',
    inCheck: false
  },
  b: {
    name: 'Melissa',
    colour: colours.black,
    side: 'top',
    inCheck: false
  }
},

sides = {
  top: {
    y: 0
  },
  bottom:{
    y: 7
  }
},

blockColours = {
  attack: 'red',
  move: 'blue',
  check: 'yellow',
  castle: 'purple'
},

turn = {
  player: (players.a.colour === 'white') ? players.a : players.b,
  turnCount: 0
},

board = {
  xAxisBlocks : 8,
  yAxisBlocks : 8
},

moveReg = [],

gMovesList = {},


templates = {
  'playingBlock': Handlebars.compile($('#playingBlock').html()),
  // 'playingBlock': {},
  'gamePiece': Handlebars.compile($('#gamePiece').html())
},
//get comeplete html with data from templates
// html = templates(aData);

gPieces = {
  white : {
    k  : {name: 'King', x: 4, y: 7, moveCount: 0},
    // q  : {name: 'Queen', x: 3, y: 7, moveCount: 0},
    r1 : {name: 'Rook', x: 0, y: 7, moveCount: 0},
    r2 : {name: 'Rook', x: 7, y: 7, moveCount: 0},
    // b1 : {name: 'Bishop', x: 1, y: 6, moveCount: 0},
    // b2 : {name: 'Bishop', x: 6, y: 6, moveCount: 0},
    // k1 : {name: 'Knight', x: 0, y: 5, moveCount: 0},
    // k2 : {name: 'Knight', x: 7, y: 5, moveCount: 0},
    // p1 : {name: 'Pawn', x: 0, y: 6, moveCount: 0},
    // p2 : {name: 'Pawn', x: 1, y: 6, moveCount: 0},
    // p3 : {name: 'Pawn', x: 2, y: 6, moveCount: 0},
    // p4 : {name: 'Pawn', x: 3, y: 6, moveCount: 0},
    // p5 : {name: 'Pawn', x: 4, y: 6, moveCount: 0},
    // p6 : {name: 'Pawn', x: 5, y: 6, moveCount: 0},
    // p7 : {name: 'Pawn', x: 6, y: 6, moveCount: 0},
    // p8 : {name: 'Pawn', x: 7, y: 6, moveCount: 0}


    // original
    // k  : {name: 'King', x: 4, y: 7, moveCount: 0},
    // q  : {name: 'Queen', x: 3, y: 7, moveCount: 0},
    // r1 : {name: 'Rook', x: 0, y: 7, moveCount: 0},
    // r2 : {name: 'Rook', x: 7, y: 7, moveCount: 0},
    // b1 : {name: 'Bishop', x: 2, y: 7, moveCount: 0},
    // b2 : {name: 'Bishop', x: 5, y: 7, moveCount: 0},
    // k1 : {name: 'Knight', x: 1, y: 7, moveCount: 0},
    // k2 : {name: 'Knight', x: 6, y: 7, moveCount: 0},
    // p1 : {name: 'Pawn', x: 0, y: 6, moveCount: 0},
    // p2 : {name: 'Pawn', x: 1, y: 6, moveCount: 0},
    // p3 : {name: 'Pawn', x: 2, y: 6, moveCount: 0},
    // p4 : {name: 'Pawn', x: 3, y: 6, moveCount: 0},
    // p5 : {name: 'Pawn', x: 4, y: 6, moveCount: 0},
    // p6 : {name: 'Pawn', x: 5, y: 6, moveCount: 0},
    // p7 : {name: 'Pawn', x: 6, y: 6, moveCount: 0},
    // p8 : {name: 'Pawn', x: 7, y: 6, moveCount: 0}
  },
  black : {
    k  : {name: 'King', x: 4, y: 0, moveCount: 0},
    // q  : {name: 'Queen', x: 3, y: 0, moveCount: 0},
    r1 : {name: 'Rook', x: 0, y: 0, moveCount: 0},
    r2 : {name: 'Rook', x: 7, y: 0, moveCount: 0},
    // b1 : {name: 'Bishop', x: 2, y: 2, moveCount: 0},
    // b2 : {name: 'Bishop', x: 5, y: 2, moveCount: 0},
    // k1 : {name: 'Knight', x: 1, y: 1, moveCount: 0},
    // k2 : {name: 'Knight', x: 6, y: 1, moveCount: 0}

    // p1 : {name: 'Pawn', x: 0, y: 1, moveCount: 0},
    // p2 : {name: 'Pawn', x: 1, y: 1, moveCount: 0},
    // p3 : {name: 'Pawn', x: 2, y: 1, moveCount: 0},
    // p4 : {name: 'Pawn', x: 3, y: 1, moveCount: 0},
    // p5 : {name: 'Pawn', x: 4, y: 1, moveCount: 0},
    // p6 : {name: 'Pawn', x: 5, y: 1, moveCount: 0},
    // p7 : {name: 'Pawn', x: 6, y: 1, moveCount: 0},
    // p8 : {name: 'Pawn', x: 7, y: 1, moveCount: 0}

    /*
    k  : {name: 'King', x: 4, y: 0, moveCount: 0},
    q  : {name: 'Queen', x: 3, y: 0, moveCount: 0},
    r1 : {name: 'Rook', x: 0, y: 0, moveCount: 0},
    r2 : {name: 'Rook', x: 7, y: 0, moveCount: 0},
    b1 : {name: 'Bishop', x: 2, y: 0, moveCount: 0},
    b2 : {name: 'Bishop', x: 5, y: 0, moveCount: 0},
    k1 : {name: 'Knight', x: 1, y: 0, moveCount: 0},
    k2 : {name: 'Knight', x: 6, y: 0, moveCount: 0},
    p1 : {name: 'Pawn', x: 0, y: 1, moveCount: 0},
    p2 : {name: 'Pawn', x: 1, y: 1, moveCount: 0},
    p3 : {name: 'Pawn', x: 2, y: 1, moveCount: 0},
    p4 : {name: 'Pawn', x: 3, y: 1, moveCount: 0},
    p5 : {name: 'Pawn', x: 4, y: 1, moveCount: 0},
    p6 : {name: 'Pawn', x: 5, y: 1, moveCount: 0},
    p7 : {name: 'Pawn', x: 6, y: 1, moveCount: 0},
    p8 : {name: 'Pawn', x: 7, y: 1, moveCount: 0}
    */
  }
},

gPiecesReset = {},

gBlockArr = {},
gBlockIndex = [],
gIndex = 0;


