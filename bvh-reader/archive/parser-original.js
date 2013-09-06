(function() {
  var App,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.render = __bind(this.render, this);
      this.animate = __bind(this.animate, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      var floor, geo, mat;
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.scene = new THREE.Scene;
      this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 100000);
      this.camera.position.y = 200;
      this.camera.position.z = 500;
      this.scene.add(this.camera);
      geo = new THREE.PlaneGeometry(500, 500, 10, 10);
      mat = new THREE.LineBasicMaterial({
        color: 0xeeeeee
      });
      floor = new THREE.Mesh(geo, mat);
      floor.rotation.x = -Math.PI / 2;
      this.scene.add(floor);
      this.renderer = new THREE.WebGLRenderer;
      this.container.appendChild(this.renderer.domElement);
      this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
      this.stats = new Stats;
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0';
      this.container.appendChild(this.stats.domElement);
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
      this.load();
    }

    App.prototype.load = function() {
      var _this = this;
      return $.get('data/nocchi.bvh', function(data) {
        var done;
        _this.data = data.split(/\s+/g);
        _this.channels = [];
        done = false;
        while (!done) {
          switch (_this.data.shift()) {
            case 'ROOT':
              _this.root = _this.parseNode(_this.data);
              _this.scene.add(_this.root);
              break;
            case 'MOTION':
              _this.data.shift();
              _this.numFrames = parseInt(_this.data.shift());
              _this.data.shift();
              _this.data.shift();
              _this.secsPerFrame = parseFloat(_this.data.shift());
              done = true;
          }
        }
        _this.root.material = new THREE.MeshBasicMaterial({
          color: 0xff0000
        });
        _this.startTime = Date.now();
        return _this.animate();
      });
    };

    App.prototype.parseNode = function(data) {
      var done, geometry, i, material, n, node, t;
      geometry = new THREE.CubeGeometry(3, 3, 3);
      material = new THREE.MeshNormalMaterial;
      node = new THREE.Mesh(geometry, material);
      node.name = data.shift();
      node.eulerOrder = 'YXZ';
      done = false;
      while (!done) {
        switch (t = data.shift()) {
          case 'OFFSET':
            node.position.x = parseFloat(data.shift());
            node.position.y = parseFloat(data.shift());
            node.position.z = parseFloat(data.shift());
            node.offset = node.position.clone();
            break;
          case 'CHANNELS':
            n = parseInt(data.shift());
            for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
              this.channels.push({
                node: node,
                prop: data.shift()
              });
            }
            break;
          case 'JOINT':
          case 'End':
            node.add(this.parseNode(data));
            break;
          case '}':
            done = true;
        }
      }
      return node;
    };

    App.prototype.onWindowResize = function(event) {
      var height, width;
      width = window.innerWidth;
      height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.controls.screen.width = width;
      this.controls.screen.height = height;
      return this.controls.radius = (width + height) / 4;
    };

    App.prototype.animate = function() {
      var ch, frame, n, torad, _i, _len, _ref;
      frame = ((Date.now() - this.startTime) / this.secsPerFrame / 1000) | 0;
      n = frame % this.numFrames * this.channels.length;
      torad = Math.PI / 180;
      _ref = this.channels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        switch (ch.prop) {
          case 'Xrotation':
            ch.node.rotation.x = (parseFloat(this.data[n])) * torad;
            break;
          case 'Yrotation':
            ch.node.rotation.y = (parseFloat(this.data[n])) * torad;
            break;
          case 'Zrotation':
            ch.node.rotation.z = (parseFloat(this.data[n])) * torad;
            break;
          case 'Xposition':
            ch.node.position.x = ch.node.offset.x + parseFloat(this.data[n]);
            break;
          case 'Yposition':
            ch.node.position.y = ch.node.offset.y + parseFloat(this.data[n]);
            break;
          case 'Zposition':
            ch.node.position.z = ch.node.offset.z + parseFloat(this.data[n]);
        }
        n++;
      }
      if (++this.currentFrame >= this.numFrames) this.currentFrame = 0;
      this.render();
      this.stats.update();
      return requestAnimationFrame(this.animate);
    };

    App.prototype.log = function(obj) {
      var child, pos, _i, _len, _ref, _results;
      pos = obj.matrixWorld.decompose()[0];
      console.log(obj.name, pos.x, pos.y, pos.z, obj.matrixWorld);
      _ref = obj.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(this.log(child));
      }
      return _results;
    };

    App.prototype.render = function() {
      this.controls.update();
      return this.renderer.render(this.scene, this.camera);
    };

    return App;

  })();

  $(function() {
    if (Detector.webgl) {
      return new App();
    } else {
      return Detector.addGetWebGLMessage();
    }
  });

}).call(this);
