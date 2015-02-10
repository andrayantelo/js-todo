//todo list webapp

var List = function () {
    
    this.listItems = [];

    this.addToList = function(item) {
        if (listItems.length === 0) {
            listItems[0] = item;
        } else {
            listItems[listItems.length - 1] = item;
            
        }
        return listItems;
    };
    
};
        
    
    
