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

console.log(myList.listItems);
/*test("removeFromList test", function() {
    myList.removeFromList(item);
    deepEqual(myList.listItems, ['car', 'book']);
});*/


