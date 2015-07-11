/* first test for addToList */


test("addToList test", function() {
    var item = 'item';
    var myList = new List('myList');
    myList.addToList(item);
    equal(myList.listItems[0], item);
});
