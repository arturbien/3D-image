# 🏄 3D-image 
<p>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/dt/3d-image" alt="NPM"></a>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/v/3d-image" alt="3d-image version"></a>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/license/3d-image" alt="R3d-image license"></a>
  
</p>

![car](https://user-images.githubusercontent.com/28541613/61730278-57f78c80-ad79-11e9-826e-71198a75025c.gif)



<p>Small (2.5kB gzipped), dependency-free library for creating 3D image effect on your website ( just like on Facebook! ).</p>

* reacts to mouse move / mobile device movement! 🤳 (in iOS Safari ["motion & orientation access"](https://www.youtube.com/watch?time_continue=30&v=ulsqCFMCajY) has to be enabled)
* based on WebGL shaders
* uses IntersectionObserver to animate only the images that are currently in the viewport

## How to use 
First, you need 2 images: original image, and [depth image](https://www.youtube.com/watch?v=eeU5mUASnVI):

![car1](https://user-images.githubusercontent.com/28541613/61730337-73fb2e00-ad79-11e9-8242-fdd093e39f28.jpg)


Then, prepare image slot with `data-src` and `data-depth-src` attributes containing paths to those images:

```html
<div id="car" data-src="path to original image" data-depth-src="path to depth image"></div>
```

Finally, add `3D-image` library and run it like so:
```html
<script src="https://unpkg.com/3d-image"></script>
<script>
    var car = document.getElementById("car");
    image3D.process(car);
</script>

```
### That's it! 🥤


**Disclaimer:** this library is a work-in-progress, so the API will likely change. There will be more options added like:
* increasing and decreasing 3D effect strength
* reacting to scroll events for devices not supporting DeviceOrientation API

**Based on the work of [Yuriy Artyukh](https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/) and [Keilyn Nunez](https://codepen.io/keilyn3d/full/KLVxZM).**
