/* first test for addToList */

var item = 'item';
var myList = new List('myList');
var car = 'car';
var book = 'book';
myList.isOk = true;
console.log("BEGINNING STATUS" + " " + myList.isOk)

test("addToList test", function() {
//    expect(5);
    
    myList.addToList(item);
    equal(myList.itemsAdded[0], item);
    equal(myList.listItems["item-0"], "item");
    equal(myList.listOrder[0], "item-0");
    
    myList.addToList(car);
    equal(myList.itemsAdded[1], car);
    equal(myList.listItems["item-1"], "car");
    equal(myList.listOrder[1], "item-1");

    deepEqual(myList.itemsAdded, ['item', 'car']);
    myList.addToList(book)
    equal(myList.isOk, true);
    
    localStorage.clear();
    
});


/*test("removeFromList test", function() {
    myList.listItems = [item, car, book];
    
    console.log(typeof(myList));
    myList.removeFromList('item');
    
    deepEqual(myList.listItems, ['car', 'book']);
    myList.removeFromList('dog');
    equal(myList.isOk, false);
    
    
});

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
