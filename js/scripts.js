$(function() {
    
    function Column(name) {
        var self = this;  //useful for nested function

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        
        
        function createColumn () {
            var $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete').text('x'),
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
        }


        
    }

    Column.prototype = {
        
        // createColumn : function() {
        //     var self = this;
        //     var $column = $('<div>').addClass('column'),
        //         $columnTitle = $('<h2>').addClass('column-title').text(self.name),
        //         $columnCardList = $('<ul>').addClass('column-card-list'),
        //         $columnDelete = $('<button>').addClass('btn-delete').text('x'),
        //         $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            
        //     $columnDelete.on('click', function() {
        //         self.removeColumn();
        //     });

        //     $columnAddCard.on('click', function() {
        //         self.addCard(new Card(prompt('Enter the name of card')));
        //     });
            
        //     $column.append($columnTitle)
        //             .append($columnDelete)
        //             .append($columnAddCard)
        //             .append($columnCardList);
            
        //     return $column;
        // },

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
        this.$element = createCard();


        function createCard() {
            var $card = $('<li>').addClass('card'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('card-delete').text('x');
            
            $cardDelete.on('click', function () {
                self.removeCard();
            });   

            $card.append($cardDelete)
                .append($cardDescription);
                
            return $card;
        }
    }

    Card.prototype = {
        // createCard :function() {
        //     var $card = $('<li>').addClass('card'),
        //         $cardDescription = $('<p>').addClass('card-description').text(self.description),
        //         $cardDelete = $('<button>').addClass('card-delete').text('x');
            
        //     $cardDelete.on('click', function () {
        //         self.removeCard();
        //     });   

        //     $card.append($cardDelete)
        //         .append($cardDescription);
                
        //     return $card;
        // },

        removeCard : function () {
            this.$element.remove();
        }
    };

    var board = {
        name : 'Kanban board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column').on('click', function(){
        var name = prompt('Enter a column name'),
            column = new Column(name);
        board.addColumn(column);
    });

    function randomString() {
        var chars = '01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            str = '';
        for(i = 0 ; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length ) ];
        }
        return str;
    }
});