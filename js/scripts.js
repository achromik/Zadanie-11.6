$(function() {
    
    function Column(name) {
        var self = this;  //useful for nested function

        this.id = randomString();
        this.name = name;
        this.$element = this.createColumn();
        
    }

    Column.prototype = {
        
        createColumn : function() {
            var self = this,
                $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('column-delete btn btn-danger').append('<i>').addClass('fa fa-times'),
                $columnAddCard = $('<button>').addClass('add-card btn btn-success').text('Add card');
            
            var $columnForeTitle = $('<small>').text('Column name: ');
            
            $columnDelete.on('click', function() {
                self.removeColumn();
            });

            $columnAddCard.on('click', function() {
                self.addCard(new Card(getName('card')));
            });
            
            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList)
                    .children('h2').prepend($columnForeTitle);
            
            return $column;
        },

        addCard : function(card) {
            this.$element.children('ul').append(card.$element);        
        },

        removeColumn: function() {
            this.$element.remove();
        }
    };


    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = this.createCard();

    }

    Card.prototype = {

        createCard : function() {
            var self = this,
                $card = $('<li>').addClass('card'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('card-delete btn btn-danger').append('<i>').addClass('fa fa-times');
            
            $cardDelete.on('click', function () {
                self.removeCard();
            });   

            $card.append($cardDelete)
                .append($cardDescription);
                
            return $card;
        },

        removeCard : function () {
            this.$element.remove();
        }
    };


    function Board(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = this.createBoard();
    }

    Board.prototype = {

        createBoard : function() {
            var self = this,
                $board = $('<div>').addClass('board'),
                $boardTitle = $('<h2>').addClass('board-title').text(self.name),
                $boardAddColumn = $('<button>').addClass('btn btn-success create-column').text('Add column'),
                $boardDelete = $('<button>').addClass('btn btn-danger board-delete').append('<i>').addClass('fa fa-times'),
                $boardColumnContainer = $('<div>').addClass('column-container');

            $boardAddColumn.on('click', function () {
                self.addColumn(new Column(getName('column')));
            });

            $boardDelete.on('click', function () {
                self.removeBoard();
            });

            $board.append($boardTitle)
                .append($boardDelete)
                .append($boardAddColumn)
                .append($boardColumnContainer);

            return $board;
        },

        addColumn: function(column) {
            this.$element.children('.column-container').append(column.$element);
            initSortable();
        },

        removeBoard : function () {
            this.$element.remove();
        }
    };


    function initSortable() {
        $('.column-card-list').sortable({
            start: function (event, ui) {
                ui.placeholder.height(ui.helper.outerHeight());
            },
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            forcePlaceholderSize: true
        }).disableSelection();
    }

    
    $('.create-kanban').on('click', function(){
        var $boardContainer = $('.board-container'),
            boardName = getName('Kanban board'),
            board = new Board(boardName);

        $boardContainer.append(board.$element);
    });

    function getName(elementsName) {
        var name = prompt('Enter a ' + elementsName + '\'s name');
        while (name.isEmpty()) {
            name = prompt('Please, enter not blank a ' + elementsName + '\'s name');
       }

       return name;
    }

    function randomString() {
        var chars = '01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            str = '';
        for(i = 0 ; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    //checking if string is blank or contians only white-spaces
    String.prototype.isEmpty = function() {
        return (this.length === 0 || !this.trim());
    };

/*****************************************************/

    //default initialization

    // make board
    var board = new Board('KANBAN Example Board'),
        $boardContainer = $('.board-container');
        $boardContainer.append(board.$element);

    // make colums
    var todoColumn = new Column('To do'),
        doingColumn = new Column('Doing'),
        doneColumn = new Column('Done');

    // Add columns to board
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // make new cards
    var card1 = new Card('New task'),
        card2 = new Card('Create kanban boards');

    // add cards to columns
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);




});