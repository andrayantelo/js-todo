//todo list webapp
// toggleClass possibly
$(document).ready(function() {
    $('form').mouseenter(function() {
        $('form').fadeTo('fast', 1)
    })
    $('form').mouseleave(function() {
        $('form').fadeTo('slow', 0.2)
    })
    
    $('#button').mouseenter(function() {
        $('#button').css('background-color','white');
        $('#button').css('color', '#3d1256');
        $('#button').css('border', 'solid');
        $('#button').css('border', '5px');
        $('#button').css('border', '#3d1256');
    })
    $('#button').mouseleave(function() {
        $('#button').css('background-color','#3d1256');
        $('#button').css('color', 'white');
    })
        
        
    $('#button').click(function(){
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').append('<div class="item">' + toAdd + '</div>');
    })
    
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
        
    
    
