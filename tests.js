/* first test for addToList */


test("addToList test", function() {
    var item = 'item';
    var myList = new List('myList');
    myList.addToList(item);
    equal(myList.listItems[0], item);
    
    var car = 'car';
    myList.addToList(car);
    equal(myList.listItems[1], car);
    
 /* don't think you can do this for lists */
    var itemList = ['item', 'car'];
    deepEqual(myList.listItems, ['item', 'car']);
    
});
