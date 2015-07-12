/* first test for addToList */

var item = 'item';
var myList = new List('myList');
var car = 'car';
var book = 'book';


test("addToList test", function() {
    expect(4);
    
    myList.addToList(item);
    console.log(myList.listItems);
    equal(myList.listItems[0], item);
    
    myList.addToList(car);
    equal(myList.listItems[1], car);

    deepEqual(myList.listItems, ['item', 'car']);
    myList.addToList(book)
    equal(myList.isOk, true);
    
});


test("removeFromList test", function() {
    myList.listItems = [item, car, book];
    
    myList.removeFromList('item');
    
    deepEqual(myList.listItems, ['car', 'book']);
    myList.removeFromList('dog');
    equal(myList.isOk, false);
});


