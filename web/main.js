// sidebar left -----------------------------

document.querySelector("#sidebar").addEventListener('scroll', () => {
    document.querySelector(":root").style.setProperty('--sidebarScrollTop', `${document.querySelector("#sidebar").scrollTop / 2}deg`);
});




// sidebar right -----------------------------

var addButton = document.getElementById('floating-button');
addButton.addEventListener('click', function() {
    document.getElementById('sidebar-right').classList.toggle('open');
});

var addUrlButton = document.querySelector('#sidebar-right .add');
addUrlButton.addEventListener('click', function() {
    var currentUrl = window.location.href;
    if (!localStorage.getItem('urls')) {
        localStorage.setItem('urls', JSON.stringify([]));
    }
    var urls = JSON.parse(localStorage.getItem('urls'));
    if (urls.indexOf(currentUrl) === -1) {
        urls.push(currentUrl);
        localStorage.setItem('urls', JSON.stringify(urls));
        updateUrlList();
    }
});

var clearUrlsButton = document.querySelector('#sidebar-right .clear');
clearUrlsButton.addEventListener('click', function() {
    localStorage.removeItem('urls');
    updateUrlList();
});

function updateUrlList() {
    var urlList = document.getElementById('url-list');
    urlList.innerHTML = '';
    if (!localStorage.getItem('urls')) {
        return;
    }
    var urls = JSON.parse(localStorage.getItem('urls'));
    for (var i = 0; i < urls.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = urls[i] + '<button class="remove-button" data-index="' + i + '">Remove</button>';
        urlList.appendChild(listItem);
    }
    var removeButtons = document.querySelectorAll('#sidebar-right .remove-button');
    for (var j = 0; j < removeButtons.length; j++) {
        removeButtons[j].addEventListener('click', function() {
        var index = parseInt(this.getAttribute('data-index'));
        var urls = JSON.parse(localStorage.getItem('urls'));
        urls.splice(index, 1);
        localStorage.setItem('urls', JSON.stringify(urls));
        updateUrlList();
        });
    }
}

function addColumn(url) {
    var container = document.querySelector('.frames-container');
    var column = document.createElement('div');
    column.classList.add('column');
    var iframe = document.createElement('iframe');
    iframe.classList.add('iframe');
    iframe.src = url;
    column.appendChild(iframe);
    container.appendChild(column);
}

if (document.querySelector('.frames-container')) {
    var urlsx = JSON.parse(localStorage.getItem('urls')) || [];
    urlsx.forEach(function(url) {
        addColumn(url);
    });
}

updateUrlList();



// dragable floating button
const toggleButton = document.getElementById('floating-button');
let isDragging = false;
toggleButton.addEventListener('mousedown', (event) => {
    isDragging = true;
});
document.addEventListener('mouseup', (event) => {
    isDragging = false;
});
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        toggleButton.style.top = `${event.clientY}px`;
        toggleButton.style.left = `${event.clientX}px`;
    }
});





// read and write to project testing
function readData() {
    const data = JSON.parse(localStorage.getItem('urls'));
    console.log(data);
    return data;
}
function writeData() {
    const data = { name: "John Wickerest", email: "john@example.com" };
    // const data = readData();

    fetch('/toolbar-data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data written to file');
    })
    .catch((error) => {
        // console.error('Error:', error);
    });
}
// function writeData() {
//     const data = ['url1', 'url2', 'url3'];
//     localStorage.setItem('data', JSON.stringify(data));
//     console.log('Data written to localStorage');
// }


// sync scroll on all iframes
const iframes = document.querySelectorAll('.iframe');
iframes.forEach(iframe => {  
    iframe.contentWindow.addEventListener('scroll', () => {
        const scrollPosition = iframe.contentWindow.pageYOffset; 
        
        // Update the scroll position of the other iframes
        iframes.forEach(otherIframe => {
            if (otherIframe !== iframe) {
                otherIframe.contentWindow.scrollTo(0, scrollPosition);
            }
        });
    });
});
