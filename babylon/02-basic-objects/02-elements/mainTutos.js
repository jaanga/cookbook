window.onload = function(){
    var canvas = document.getElementById("canvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);

        //Creating scene (in "scene_tuto.js")
        scene = createSceneTuto(engine);

        scene.activeCamera.attachControl(canvas);


        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    } 
};