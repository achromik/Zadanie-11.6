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
                $columnDelete = $('<button>').addClass('column-delete btn-delete').text('x'),
                $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            
            $columnDelete.on('click', function() {
                self.removeColumn();
            });

            $columnAddCard.on('click', function() {
                self.addCard(new Card(prompt('Enter the name of card')));
            });
            
            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);
            
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
                $cardDelete = $('<button>').addClass('card-delete btn-delete').text('x');
            
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
                $boardAddColumn = $('<button>').addClass('create-column').text('Add column'),
                $boardDelete = $('<button>').addClass('board-delete btn-delete').text('x'),
                $boardColumnContainer = $('<div>').addClass('column-container');

            $boardAddColumn.on('click', function () {
                self.addColumn(new Column(prompt('Enter a column name')));
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
            this.$element.append(column.$element);
            initSortable();
        },

        removeBoard : function () {
            this.$element.remove();
        }
    };


    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-kanban').on('click', function(){
        var name = prompt('Enter a column name'),
            $kanbanContainer = $('.kanban'),
            board = new Board(name);
        // board.addColumn(column);
        $kanbanContainer.append(board.$element);
    });

    function randomString() {
        var chars = '01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            str = '';
        for(i = 0 ; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
});