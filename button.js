var state = 0; //default page is 0. works page is 1.

var x = window.matchMedia("(max-width: 900px)")
menuStyle(x) 
x.addListener(menuStyle) 

function sidebarClosed(){
    document.getElementById("sidebar").style.left = "100vw";
    document.getElementById("content").style.width = "100vw";
    document.getElementById("content").style.left = "0vw";
}

function mobileSidebarOpen(){
    document.getElementById("sidebar").style.left = "0vw";
    document.getElementById("content").style.width = "100vw";
    document.getElementById("content").style.left = "-100vw";
}

function desktopSidebarOpen(){
    document.getElementById("sidebar").style.left = "50vw";
    document.getElementById("content").style.width = "50vw";
    document.getElementById("content").style.left = "0vw";
}

function showMobileWork(){
    document.getElementById("work_wrapper1").style.display = "block";
    document.getElementById("work_wrapper3").style.display = "none";
    document.getElementById("info_wrapper").style.display = "block";
    document.getElementById("canvas").style.opacity = "0";

}

function showDesktopWork(){
    document.getElementById("work_wrapper1").style.display = "none";
    document.getElementById("work_wrapper3").style.display = "block";
    document.getElementById("info_wrapper").style.display = "none";
    document.getElementById("canvas").style.opacity = "1";
}

function menuStyle(x) {
    if (x.matches) {
        // mobile 
        if(document.getElementById("sidebar").style.left === "100vw"){
            // when sidebar is closed
            sidebarClosed();
            if(state === 0) {
                // default page
            } else {
                // work page
                showMobileWork();
            }
        } else {
            // when side bar is open
            if(state === 0) {
                // default page
                mobileSidebarOpen();
            } else {
                // work page
                sidebarClosed();
                showMobileWork();
            }
        }
    } else {
        // desktop
        if(document.getElementById("sidebar").style.left === "100vw") {
            // when side bar is closed
            if(state === 0) {
                // default page
                sidebarClosed();
            } else {
                // work page
                desktopSidebarOpen();
                showDesktopWork();
            }           
        } else {
            // when side bar is open
            desktopSidebarOpen();    
        }
    }
}

/*
document.getElementById("sidebarButton").addEventListener("click", opencloseNav);
function opencloseNav() {
    if (x.matches) { // If media query matches
        if(document.getElementById("sidebar").style.left === "100vw"){
            mobileSidebarOpen();

        } else{
            sidebarClosed();
        }
    } else {
        if(document.getElementById("sidebar").style.left === "100vw"){
            desktopSidebarOpen();
            
        } else{           
            sidebarClosed();      
        }
    }
}
*/

$('#workUl').on( 'click', '.workLi', function () { 
    state = 1;

    document.getElementById("work_wrapper2").style.display = "block";
    document.getElementById("buttonX").style.display = "inline";

    if (x.matches) {
        sidebarClosed();
        showMobileWork();
        document.getElementById("canvas").style.transform = "scale(0)";
        document.getElementById("canvas").style.transformOrigin = "center";
    } else {
        showDesktopWork();
        document.getElementById("canvas").style.transform = "scale(0)";
        document.getElementById("canvas").style.transformOrigin = "bottom left";
    }    
});

document.getElementById("buttonX").addEventListener("click", function() {
    state = 0; 

    document.getElementById("work_wrapper1").style.display = "none";
    document.getElementById("work_wrapper2").style.display = "none";
    document.getElementById("buttonX").style.display = "none";
    document.getElementById("canvas").style.transform = "scale(1)";
    
    $("#work_wrapper1").empty();
    $("#work_wrapper2").empty();
    $("#work_wrapper3").empty();
      
    if (x.matches) {
        document.getElementById("canvas").style.display= "block"
        document.getElementById("canvas").style.opacity = "1";
        document.getElementById("canvas").style.transformOrigin = "center";

        sidebarClosed();
    } else {
        document.getElementById("info_wrapper").style.display = "block";
        document.getElementById("work_wrapper3").style.display = "none";
        document.getElementById("canvas").style.transformOrigin = "bottom left";

    } 
});


