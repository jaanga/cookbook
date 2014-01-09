function createSceneTuto(engine) {
    //Creation of the scene 
    var scene = new BABYLON.Scene(engine);

    //Adding of the light on the scene
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 10, -30), scene);

    //Adding of the Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);



    // MESHES
    //------------

    //Creation of a box
    //(name of the box, size, scene)
    var box = BABYLON.Mesh.CreateBox("Box", 6.0, scene);

    //Creation of a sphere 
    //(name of the sphere, segments, diameter, scene) 
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10.0, 10.0, scene);

    //Creation of a plan
    //(name of the plane, size, scene)
    var plan = BABYLON.Mesh.CreatePlane("Plane", 50.0, scene);

    //Creation of a cylinder
    //(name, height, diameter, tessellation, scene, updatable)
    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, scene, false);

    // Creation of a torus
    // (name, diameter, thickness, tessellation, scene, updatable)
    var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);


    //Creation of a smaller box to represent the center of the scene
    var center = BABYLON.Mesh.CreateBox("Box", 1.0, scene);


    //Positioning the elements
    box.position = new BABYLON.Vector3(-10,0,0);//Positionnign by a vector
    sphere.position = new BABYLON.Vector3(0,10,0);//Positionnign by a vector
    plan.position.z = 10;//Positionning by a simple coordinate
    cylinder.position.z = -10;
    torus.position.x = 10;
    

    return scene;

}