/* first test for addToList */

var item = 'item';
var myList = new List('myList');
var car = 'car';
var book = 'book';
myList.isOk = true;
console.log("BEGINNING STATUS" + " " + myList.isOk)

test("addToList test", function() {
//    expect(9);
    
    myList.addToList(item);
    equal(myList.state.added[0], item);
    equal(myList.state.items["item-0"], "item");
    equal(myList.state.order[0], "item-0");
    
    myList.addToList(car);
    equal(myList.state.added[1], car);
    equal(myList.state.items["item-1"], "car");
    equal(myList.state.order[1], "item-1");

    deepEqual(myList.state.added, ['item', 'car']);
    myList.addToList(book)
    equal(myList.isOk, true);
    deepEqual(myList.state.added, ['item', 'car', 'book']);
    
    localStorage.clear();
    
});


test("removeFromList test", function() {
    myList.state = emptyState();
    console.log(myList.state);
    myList.addToList(item);
    myList.addToList(car);
    myList.addToList(book);
    myList.removeFromList('item-0');
    deepEqual(myList.state.added, ['car', 'book']);
    deepEqual(myList.state.order, ['item-1', 'item-2']);
    equal(myList.state.items['item-1'], 'car');
    myList.removeFromList('dog');
    equal(myList.isOk, false);
    myList.isOk = true;
    
});

/*
 
test("clearList test", function() {
    myList.isOk = true;
    myList.clearList();
    deepEqual(myList.listItems, []);
});

test("updateFlag test", function() {
     myList.isOk = true;
     equal(myList.isOk, true);
     myList.updateFlag();
    
     equal(myList.isOk, false);
     
     myList.updateFlag();
     
     
     equal(myList.isOk, true);

});


 test("generateListDiv test", function() {
    expect(2);
    var divValue = $('#list').val();
    var divId = $('#list');
    
    equal(divValue, "");
    myList.listItems = ['book', 'car'];
    myList.generateListDiv(divId);
    var divChildren = divId.children().length;
    equal(divChildren, 2);
    
});

test("storeList test", function() {
    expect(1);
    localStorage.clear();
    
    myList.storeList();
    equal(localStorage.length, 1);
});

test("retrieveList test", function() {
    localStorage.clear();
    myList.retrieveList();
    equal(myList.isOk, false);
    
});

*/
