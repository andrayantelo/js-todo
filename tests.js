/* first test for addToList */


test("addToList test", function() {
    var myList = new List('myList');
    myList.addToList('item');
    equal(myList[0], 'item');
});
