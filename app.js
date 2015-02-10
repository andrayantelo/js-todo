//todo list webapp

var List = function () {
    var self = this
    
    self.listItems = [];

    self.addToList = function(item) {
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
        } else {
            self.listItems[self.listItems.length - 1] = item;
            
        }
        return this.listItems;
    };
    
};
        
    
    
