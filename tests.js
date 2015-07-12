/* first test for addToList */

var item = 'item';
var myList = new List('myList');
var car = 'car';
var itemList = ['item', 'car'];
var book = 'book';


test("addToList test", function() {
    expect(4);
    
    myList.addToList(item);
    equal(myList.listItems[0], item);
    
    myList.addToList(car);
    equal(myList.listItems[1], car);

    deepEqual(myList.listItems, ['item', 'car']);
    
    equal(myList.addToList(book), false);
    
});


test("removeFromList test", function() {
    myList.itemList = [item, car, book];
    console.log(myList.itemList);
    myList.removeFromList(item);
    console.log(myList.itemList);
    deepEqual(myList.listItems, ['car', 'book']);
});


