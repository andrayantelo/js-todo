//todo list webapp
// toggleClass possibly
$(document).ready(function() {
    $('.outer').mouseenter(function() {
        $('.outer').fadeTo('fast', 1)
        });
    $('.outer').mouseleave(function() {
        $('.outer').fadeTo('slow', 0.5)
        
    $('#button').click(function(){
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').append('<div class="item">' + toAdd + '</div>');
    })
    
    });
});


var List = function () {
    var self = this
    
    self.listItems = [];

    self.addToList = function(item) {
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
        } else {
            self.listItems[self.listItems.length] = item;
            
        }
        return this.listItems;
    };
    
};
        
    
    
