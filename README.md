# 🏄 3D-image 

<p>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/dt/3d-image" alt="NPM"></a>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/v/3d-image" alt="3d-image version"></a>
  <a href="https://www.npmjs.com/package/3d-image"><img src="https://flat.badgen.net/npm/license/3d-image" alt="R3d-image license"></a>
  
</p>

<p>Small (4.35KB gzipped), dependency-free library for creating 3D image effect on your website ( just like on Facebook! ).</p>

* reacts to mouse move / mobile device movement! 🤳 (in iOS Safari "motion & orientation access" has to be enabled in settings)
* based on WebGL

## How to use 
First, you need 2 images: original image, and [depth image](https://www.youtube.com/watch?v=eeU5mUASnVI):

![coke](https://user-images.githubusercontent.com/28541613/61594285-5ea3c980-abea-11e9-97f5-59bda1da9d27.jpg)

Then, prepare image slot with `data-src` and `data-depth-src` attributes containing paths to those images:

```html
<div id="coke" data-src="path to original image" data-depth-src="path to depth image"></div>
```

Finally, add `3D-image` library and run it like so:
```html
<script src="https://unpkg.com/3d-image"></script>
<script>
    var coke = document.getElementById("coke");
    image3D.process(coke);
</script>

```
### That's it! 🥤


**Disclaimer:** this library is a work-in-progress, so the API will likely change. There will be more options added like:
* increasing and decreasing 3D effect strength
* reacting to scroll events for devices not supporting DeviceOrientation API

**Based on the work of [Yuriy Artyukh](https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/) and [Keilyn Nunez](https://codepen.io/keilyn3d/full/KLVxZM).**
