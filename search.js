function search() {
    // Get the input value
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Get all elements in the content area
    var contentElements = document.getElementById('content').getElementsByTagName('*');
    
    // Variables to store search results
    var foundItems = [];
    
    // Loop through all elements in the content area
    for (var i = 0; i < contentElements.length; i++) {
        var elementText = contentElements[i].innerText.toLowerCase();
        
        // Check if the element contains the search term
        if (elementText.includes(searchTerm)) {
            foundItems.push(contentElements[i]);
        }
    }
    
    // Display search results or message
    var searchResult = document.getElementById('searchResult');
    var resultMessage = document.getElementById('resultMessage');
    var resultList = document.getElementById('resultList');

    if (foundItems.length > 0) {
        // Display search results
        resultMessage.textContent = foundItems.length + " items found:";
        resultList.innerHTML = "";

        // Create links to found items
        for (var j = 0; j < foundItems.length; j++) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = '#' + foundItems[j].id;
            link.textContent = foundItems[j].innerText.trim();
            listItem.appendChild(link);
            resultList.appendChild(listItem);
        }

        searchResult.style.display = 'block';
    } else {
        // Display no results message
        resultMessage.textContent = "No items found";
        resultList.innerHTML = "";
        searchResult.style.display = 'block';
    }
}