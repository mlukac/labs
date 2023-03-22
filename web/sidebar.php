<div id="sidebar">
    <div class="logo"><h2>MLABS</h2></div>
    <div class="wrapper">
        
        <ul>
            <li><a href="/">home</a></li>
        </ul>
        <ul>
            <li><a href="/app/custom-properties">custom-properties</a></li>
            <li>
                <span>card-glow</span>
                <ul>
                    <li><a href="/app/card-glow/card-glow-1">card-glow-1</a></li>
                    <li><a href="/app/card-glow/card-glow-2">card-glow-2</a></li>
                </ul>
            </li>
            <li><a href="/app/details-summary">details-summary</a></li>
            <li><a href="/app/flyout">flyout</a></li>
            <li><a href="/app/grid-hover">grid-hover</a></li>
            <li><a href="/app/hamburger">hamburger</a></li>
            <li>
                <span>scroll-anim-image</span>
                <ul>
                    <li><a href="/app/scroll-anim-image/airpods">airpods</a></li>
                    <li><a href="/app/scroll-anim-image/airpods2">airpods2</a></li>
                    <li><a href="/app/scroll-anim-image/airpods3">airpods3</a></li>
                    <li><a href="/app/scroll-anim-image/airpods4">airpods4</a></li>
                    <li><a href="/app/scroll-anim-image/airpods5">airpods5</a></li>
                    <li><a href="/app/scroll-anim-image/title">title</a></li>
                    <li><a href="/app/scroll-anim-image/title-clip">title-clip</a></li>
                </ul>
            </li>
            <li>
                <span>scroll-anim-video</span>
                <ul>
                    <li><a href="/app/scroll-anim-video/earth">earth</a></li>
                    <li><a href="/app/scroll-anim-video/multiple">multiple</a></li>
                </ul>
            </li>
            <li>
                <a href="/app/scroll-snap/">scroll-snap</a>
                <ul>
                    <li><a href="/app/scroll-snap/demo-bold/demo1.php">demo1</a></li>
                    <li><a href="/app/scroll-snap/demo-bold/demo2.php">demo2</a></li>
                </ul>
            </li>
            <li><a href="/app/sticky-resizable-header">sticky-resizable-header</a></li>
            <li>
                <span>text-gradients</span>
                <ul>
                    <li><a href="/app/text-glow-1">text-glow-1</a></li>
                    <li><a href="/app/text-glow-2">text-glow-2</a></li>
                    <li><a href="/app/text-shine-1">text-shine-1</a></li>
                    <li><a href="/app/gradient-1">gradient-1</a></li>
                </ul>
            </li>
            <li><a href="/app/touchadriatic-test">touchadriatic-test</a></li>
            <li><a href="/app/video-play-pause">video-play-pause</a></li>
            <li>
                <span>vizols</span>
                <ul>
                    <li><a href="/app/visol-blur/">visol-blur</a></li>
                    <li><a href="/app/visol-blur/v2.php">visol-blur v2</a></li>
                    <li><a href="/app/visol-captions">visol-captions</a></li>
                    <li><a href="/app/visol-gradient">visol-gradient</a></li>
                    <li><a href="/app/visol-video">visol-video</a></li>
                    <li><a href="/app/visol-video/eye.php">visol-video eye</a></li>
                </ul>
            </li>
            <li>
                <span>animation2d</span>
                <ul>
                    <li><a href="/app/animation2d-1">animations2d-1</a></li>
                </ul>
            </li>
            <li>
                <span>animation3d</span>
                <ul>
                    <li><a href="/app/animation3d-1">animations3d-1</a> - <a target="_blank" href="https://codepen.io/amit_sheen/pen/NWLXXdp">(cpen)</a></li>
                </ul>
            </li>
            <li><a href="/app/grid3d">grid3d</a></li>
            <li><a href="/app/testpage">testpage</a></li>
        </ul>
    </div>
</div>

<style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      overflow-x: scroll;
    }
    
    .frames-container {
      white-space: nowrap;
      height: 100%;
    }

    .column {
      width: 360px;
      height: 100%;
      display: inline-block;
      box-sizing: border-box;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    #floating-button {
      display: none;
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #007bff;
      color: #fff;
      font-size: 24px;
      text-align: center;
      line-height: 56px;
      cursor: pointer;
      z-index: 1000;
      user-select: none;
    }
    @media screen and (min-width: 361px) {
        #floating-button {
            display: block;
        }
    }

    #sidebar-right {
      position: fixed;
      top: 0;
      right: -300px;
      width: 300px;
      height: 100%;
      background-color: #f2f2f2;
      transition: right 0.5s;
      z-index: 999;
    }

    #sidebar-right.open {
      right: 0;
    }

    #sidebar-right .sidebar-content {
      padding: 20px;
    }

    #sidebar-right button {
      display: block;
      margin-bottom: 10px;
      padding: 10px;
      width: 100%;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    #sidebar-right button.clear {
      background-color: #dc3545;
    }

  </style>


  <div id="floating-button">+</div>
  <div id="sidebar-right">
    <div class="sidebar-content">
      <h2>Add or Clear URLs</h2>
      <button class="add">Add URL to List</button>
      <button class="clear">Clear URLs</button>
      <div id="url-list"></div>
    </div>
  </div>

  <script>
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

  </script>



