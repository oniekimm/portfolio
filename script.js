    import * as THREE from './build/three.module.js';

    import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

    let camera, scene, renderer, raycaster;
    const mouse = new THREE.Vector2();
    var parentWidth;
    var parentHeight;
    var group = new THREE.Group();    

    const pickPosition = {x: 0, y: 0};
    clearPickPosition();

    var x = window.matchMedia("(max-width: 900px)")
    menuStyle(x) 
    x.addListener(menuStyle) 

    init();
    animate(); 
    render();

    function init() {
        const container = document.createElement( 'div' );
        container.setAttribute('id', 'objectIndex');
        document.getElementById("content").appendChild( container );
        
        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer( {alpha: true} );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( parentWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setClearColor( 0x000000, 0 );
        container.appendChild( renderer.domElement );
        renderer.domElement.setAttribute('id', 'canvas');

        camera = new THREE.PerspectiveCamera( 45, parentWidth / window.innerHeight, 1, 2000 );
        camera.position.set( 1000, 1000, 1000 );
        camera.lookAt(0,0,0);

        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene = new THREE.Scene();
        scene.environment = pmremGenerator.fromScene( environment ).texture;
        
        
       /* const grid = new THREE.GridHelper( 1000, 20, 0xff0000, 0xff0000 );
        grid.material.opacity = 1;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        scene.add( grid );*/
        

        //model
        const loader = new GLTFLoader();

        loader.load( 'models/gltf/window.glb', function ( gltf_window ){
            gltf_window.scene.position.set(-350, 200, -200);
            group.add( gltf_window.scene );
            //scene.add( gltf.scene );
            render();
        } );

        loader.load( 'models/gltf/ghost1.glb', function ( gltf_ghost ) {
            gltf_ghost.scene.position.set(200, 0, 150);
            group.add( gltf_ghost.scene );
            render();
        } );

        loader.load( 'models/gltf/illusion.glb', function ( gltf_illusion ){
            gltf_illusion.scene.position.set(-70, 190, -100);
            group.add( gltf_illusion.scene );
            render();
        } );

        loader.load( 'models/gltf/imagebook.glb', function ( gltf_img ){
            gltf_img.scene.position.set(40, 200, 200);
            group.add( gltf_img.scene );
            render();
        } );

        loader.load( 'models/gltf/wave.glb', function ( gltf_wave ){
            gltf_wave.scene.position.set(-85, -30, -250);
            group.add( gltf_wave.scene );
            render();
        } );

        loader.load( 'models/gltf/csz.glb', function ( gltf_csz ) {
            gltf_csz.scene.position.set(230, -130, -100);
            group.add( gltf_csz.scene );
            render();
        } );

        loader.load( 'models/gltf/flanuer.glb', function ( gltf_flanuer ) {
            gltf_flanuer.scene.position.set(300, 170, -150);
            group.add( gltf_flanuer.scene );
            render();
        } );

        loader.load( 'models/gltf/1day1web.glb', function ( gltf_web ) {
            gltf_web.scene.position.set(80, 200, -450);
            group.add( gltf_web.scene );
            render();
        } );

        loader.load( 'models/gltf/hongikpainting.glb', function ( gltf_hongik ){
            gltf_hongik.scene.position.set(-220, -250, -300);
            group.add( gltf_hongik.scene );
            render();
        } );

        loader.load( 'models/gltf/extended.glb', function ( gltf_extended ){
            gltf_extended.scene.position.set(-200, 250, 150);
            group.add( gltf_extended.scene );
            render();
        } );
        
        loader.load( 'models/gltf/kit.glb', function ( gltf_kit ) {
            gltf_kit.scene.position.set(-100, -50, 280);
            group.add( gltf_kit.scene );
            render();
        } );

        loader.load( 'models/gltf/light.glb', function ( gltf_light ) {
            gltf_light.scene.position.set(-450, -30, 100);
            group.add( gltf_light.scene );
            render();
        } );

        scene.add( group );

    


        //line
        const material = new THREE.LineBasicMaterial( { color: 0x000000 } );

        const points = [];
        points.push( new THREE.Vector3( -350, 200, -200 ) );
        points.push( new THREE.Vector3( -70, 190, -100 ) );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        scene.add( line );


        const points1 = [];
        points1.push( new THREE.Vector3( -350, 200, -200 ) );
        points1.push( new THREE.Vector3( 300, 170, -150 ) );
        const geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
        const line1 = new THREE.Line( geometry1, material );
        scene.add( line1 );

        const points2 = [];
        points2.push( new THREE.Vector3( -350, 200, -200 ) );
        points2.push( new THREE.Vector3( 80, 200, -450 ) );
        const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
        const line2 = new THREE.Line( geometry2, material );
        scene.add( line2 );

        const points3 = [];
        points3.push( new THREE.Vector3( 200, 0, 150 ) );
        points3.push( new THREE.Vector3( 40, 200, 200 ) );
        const geometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
        const line3 = new THREE.Line( geometry3, material );
        scene.add( line3 );

        const points4 = [];
        points4.push( new THREE.Vector3( -70, 190, -100 ) );
        points4.push( new THREE.Vector3( -200, 250, 150 ) );
        const geometry4 = new THREE.BufferGeometry().setFromPoints( points4 );
        const line4 = new THREE.Line( geometry4, material );
        scene.add( line4 );

        const points5 = [];
        points5.push( new THREE.Vector3( -85, -30, -250 ) );
        points5.push( new THREE.Vector3( 230, -130, -100 ) );
        const geometry5 = new THREE.BufferGeometry().setFromPoints( points5 );
        const line5 = new THREE.Line( geometry5, material );
        scene.add( line5 );

        const points6 = [];
        points6.push( new THREE.Vector3( -85, -30, -250 ) );
        points6.push( new THREE.Vector3( -220, -250, -300 ) );
        const geometry6 = new THREE.BufferGeometry().setFromPoints( points6 );
        const line6 = new THREE.Line( geometry6, material );
        scene.add( line6 );

        const points7 = [];
        points7.push( new THREE.Vector3( 230, -130, -100 ) );
        points7.push( new THREE.Vector3( -220, -250, -300 ) );
        const geometry7 = new THREE.BufferGeometry().setFromPoints( points7 );
        const line7 = new THREE.Line( geometry7, material );
        scene.add( line7 );

        const points8 = [];
        points8.push( new THREE.Vector3( -70, 190, -100 ) );
        points8.push( new THREE.Vector3( 80, 200, -450 ) );
        const geometry8 = new THREE.BufferGeometry().setFromPoints( points8 );
        const line8 = new THREE.Line( geometry8, material );
        scene.add( line8 );

        const points9 = [];
        points9.push( new THREE.Vector3( -70, 190, -100 ) );
        points9.push( new THREE.Vector3( 300, 170, -150 ) );
        const geometry9 = new THREE.BufferGeometry().setFromPoints( points9 );
        const line9 = new THREE.Line( geometry9, material );
        scene.add( line9 );

        const points10 = [];
        points10.push( new THREE.Vector3( 80, 200, -450  ) );
        points10.push( new THREE.Vector3( 300, 170, -150 ) );
        const geometry10 = new THREE.BufferGeometry().setFromPoints( points10 );
        const line10 = new THREE.Line( geometry10, material );
        scene.add( line10 );

        const points11 = [];
        points11.push( new THREE.Vector3( -200, 250, 150) );
        points11.push( new THREE.Vector3( -100, -50, 280) );
        const geometry11 = new THREE.BufferGeometry().setFromPoints( points11 );
        const line11 = new THREE.Line( geometry11, material );
        scene.add( line11 );

        const points12 = [];
        points12.push( new THREE.Vector3( -450, -30, 150) );
        points12.push( new THREE.Vector3( -100, -50, 280) );
        const geometry12 = new THREE.BufferGeometry().setFromPoints( points12 );
        const line12 = new THREE.Line( geometry12, material );
        scene.add( line12 );

        const points13 = [];
        points13.push( new THREE.Vector3( -200, 250, 150) );
        points13.push( new THREE.Vector3( -450, -30, 150) );
        const geometry13 = new THREE.BufferGeometry().setFromPoints( points13 );
        const line13 = new THREE.Line( geometry13, material );
        scene.add( line13 );






        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); // use if there is no animation loop
        controls.minDistance = 400;
        controls.maxDistance = 1000;
        controls.target.set( 10, 90, - 16 );
        controls.update();


        window.addEventListener( 'resize', onWindowResize, false );
        
        renderer.domElement.addEventListener( 'click', setPickPosition) 
        renderer.domElement.addEventListener('mouseup', clearPickPosition);
        //renderer.domElement.addEventListener('mousemove', clearPickPosition);      
    }





    function onWindowResize() {
        x = window.matchMedia("(max-width: 900px)")
        menuStyle(x);

        parentHeight = window.innerHeight;

        camera.aspect = parentWidth / parentHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( parentWidth , parentHeight );

        render();
    }

    const canvas = document.getElementById("canvas");

    function getCanvasRelativePosition(event){
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * canvas.width  / rect.width,
            y: (event.clientY - rect.top ) * canvas.height / rect.height,
        };
    }

    function setPickPosition(event) {
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
        pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
    }

    function clearPickPosition() {
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }

    document.getElementById("canvas").addEventListener('touchstart', (event) => {
        setPickPosition(event.touches[0]);
    }, {passive: false});
    
    document.getElementById("canvas").addEventListener('touchmove', function (event) {
        clearPickPosition();
    })
    
    document.getElementById("canvas").addEventListener('touchend', function(){
        clearPickPosition();
    });





    function animate() {
        requestAnimationFrame( animate );
        render();
    }





    function render() {
        const timer = Date.now() * 0.00005;
        scene.traverse( function ( object ) {
            if ( object.isMesh === true ) {
                object.rotation.y = timer * 5;
                object.rotation.x = timer * 2.5;
            }
        } );

        raycaster.setFromCamera( pickPosition, camera );
        const intersects = raycaster.intersectObjects( group.children, true );

        if ( intersects.length > 0 ) {

            if (x.matches) {

            } else {
                document.getElementById("sidebar").style.left = "50vw";
                document.getElementById("content").style.width = "50vw";
                document.getElementById("content").style.left = "0vw";

                parentWidth = window.innerWidth/2;
                parentHeight = window.innerHeight;
                camera.aspect = parentWidth / parentHeight;
                camera.updateProjectionMatrix();
        
                renderer.setSize( parentWidth , parentHeight );
            }

            if(intersects[0].object.name == "window-window" || intersects[0].object.name == "window-window_1"  ){                
                $( "#li1" ).trigger( "click" );
            } else if (intersects[0].object.name == "ghost"){
                $( "#li2" ).trigger( "click" );
            } else if (intersects[0].object.name == "illusion"){
                $( "#li3" ).trigger( "click" );
            } else if (intersects[0].object.name == "imagebook-cover" || intersects[0].object.name == "imagebook-cover_1" || intersects[0].object.name == "imagebook-paper" || intersects[0].object.name == "imagebook-paper_1" || intersects[0].object.name == "imagebook-paper_2" || intersects[0].object.name == "imagebook-paper_3"){
                $( "#li4" ).trigger( "click" );
            } else if (intersects[0].object.name == "wave1"){
                $( "#li5" ).trigger( "click" );
            } else if (intersects[0].object.name == "light-Mat2" || intersects[0].object.name == "light-Mat"){
                $( "#li6" ).trigger( "click" );
            } else if (intersects[0].object.name == "csz"){
                $( "#li7" ).trigger( "click" );
            } else if (intersects[0].object.name == "flaneur-cover1" || intersects[0].object.name == "flanuer-cover2" || intersects[0].object.name == "flaneur-cover3" || intersects[0].object.name == "flanuer-paper_1" || intersects[0].object.name == "flanuer-paper_2" || intersects[0].object.name == "flanuer-paper"){
                $( "#li8" ).trigger( "click" );
            } else if (intersects[0].object.name == "hongikpainting"){
                $( "#li10" ).trigger( "click" );
            } else if (intersects[0].object.name == "web-web" || intersects[0].object.name == "web-web_1" || intersects[0].object.name == "web-background" ){
                $( "#li9" ).trigger( "click" );
            } else if (intersects[0].object.name == "extended-1" || intersects[0].object.name == "extended-2"){
                $( "#li11" ).trigger( "click" );
            } else if (intersects[0].object.name == "kitbox1"){
                $( "#li14" ).trigger( "click" );
            }
    
            clearPickPosition();
        }
        renderer.render( scene, camera );
    }


    function menuStyle(x) {
        if (x.matches) {
                parentWidth = window.innerWidth;          

        } else {
            if(document.getElementById("sidebar").style.left === "100vw") {
                parentWidth = window.innerWidth;
            } else {
                parentWidth = window.innerWidth/2;
            }
        }
    }   

    document.getElementById("sidebarButton").addEventListener("click", opencloseNav);
    document.getElementById("sidebarButton").addEventListener("click", onWindowResize);
    document.getElementById("buttonX").addEventListener("click", onWindowResize);


    function opencloseNav() {
        if (x.matches) { // If media query matches
            if(document.getElementById("sidebar").style.left === "100vw"){
                document.getElementById("sidebar").style.left = "0vw";
                document.getElementById("content").style.left = "-100vw";
            } else{
                document.getElementById("sidebar").style.left = "100vw";
                document.getElementById("content").style.left = "0vw";
            }
        } else {
            if(document.getElementById("sidebar").style.left === "100vw"){
                document.getElementById("sidebar").style.left = "50vw";
                document.getElementById("content").style.width = "50vw";
            } else{           
                document.getElementById("sidebar").style.left= "100vw";
                document.getElementById("content").style.width = "100vw";       
            }
        }
    }
