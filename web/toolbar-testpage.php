<!DOCTYPE html>
<html>
    <head>
        <?php include "head.php" ?>
        <link rel="stylesheet" href="page.css" />
        <!-- <script type="module" src="page.js"></script> -->
        <style>
            iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            .frames-container {
                display: flex;
                align-items: flex-start;
                width: 100%;
                height: 100%;
            }
            .frames-container .column {
                border: none;
                transform-origin: left top;
            }
            .frames-container .column { width: 360px; height: 100vh; transform: scale(1); }
            .frames-container iframe {  width: 360px; }

            /* .frames-container .column { width: 180px; height: 200vh; transform: scale(0.5); }
            .frames-container iframe {  width: 360px; } */

            /* .frames-container .column { width: 360px; height: 200vh; transform: scale(0.5); }
            .frames-container iframe {  width: 720px; } */

            /* .frames-container .column { width: 720px; height: 200vh; transform: scale(0.5); }
            .frames-container iframe {  width: 1440px; } */
        </style>
    </head>
    <body>

        <div class="frames-container"></div>

        <?php include "sidebar.php" ?>

        <script>
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
        </script>

    </body>
</html>    

