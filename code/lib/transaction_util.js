  var textLib = require('textLib')

exports.findItem = findItem
exports.findItemIndex = findItemIndex
exports.findItems = findItems
exports.timeToMili = timeToMili

function findItem(order, item) {
   var index = findItemIndex(order, item)
   if (index >= 0) {
     return order.items[index]
   }
   return null
}

function findItemIndex(order, item) {
   for (var i=0; i<order.items.length; i++) {
      if (order.items[i].$id === item.$id) {
        return i
      }
   }
   return -1
}

function findItems(items, searchTerm) {
  //first try to match searchTerm as the ID
  for (var i=0; i<items.length; i++) {
   if (String(items[i].beca.id) == String(searchTerm)) {
       return [items[i]]
     }
  }
  //next try to match the
  //a lot can be done here to improve matching the items
  var matches = []
  for (var i=0; i<items.length; i++) {
   if (textLib.fuzzyMatch(items[i].beca.becaName, searchTerm)) {
       matches.push(items[i])
     }
  }
  return matches
} 
