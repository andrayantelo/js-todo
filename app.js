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
     //   $('#button').css('border', '5px');
     //   $('#button').css('border', '#3d1256');
    })
    $('#button').mouseleave(function() {
        $('#button').css('background-color','#3d1256');
        $('#button').css('color', 'white');
        $('#button').css('border', 'none');
    })
        
        
    $('#button').click(function(){
    var toAdd = $('textarea[name=checkListItem]').val();
    $('.list').prepend('<div class="item">' + toAdd + '</div>');
    })
    
    $(document).on('click', '.item', function() {
        $(this).remove();
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
        
    
    
