$(document).ready(function() {
    //$('#myTextArea').mouseenter(function() {
    //    $('#myTextArea).fadeTo('fast', 1)
    //})
    //$('#myTextArea').mouseleave(function() {
    //    $('#MyTextArea').fadeTo('slow', 0.2)
    //})
    
    $('#button').mouseenter(function() {
        $('#button').css('background-color','white');
        $('#button').css('color', '#3d1256');
        $('#button').css('border', 'solid');
        $('#button').css('borderWidth', '1px');
    })
    $('#button').mouseleave(function() {
        $('#button').css('background-color','#3d1256');
        $('#button').css('color', 'white');
        $('#button').css('border', 'none');
    })
        
        
    $('#button').click(function(){
    var toAdd = $('input[name=checkListItem]').val();
    $('.list').prepend('<div class="item">' + toAdd + '</div>');
    })
    
    $(document).on('click', '.item', function() {
        $(this).remove();
    })
    
    $('input').focus( funtion() {
        $('input').css('outline-color', '#3d1256');
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
        
    
    
