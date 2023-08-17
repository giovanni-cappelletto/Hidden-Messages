# Hidden-Messages

A cool effect for showing up hidden messages

## ToDo

- fixing bug with more than one section
- implementing reduceOnStop
- Handling styles

# Docs

### HTML structure

First of all you need a little bit of html. Basically, you will create two views, one over the other. Then, this library will handle the rest.

Under the hood, CSS will remove one of the two views through clipping its background, then JavaScript will handle the move of this clip to let us review the hiddden view's content.

Let's create the HTML structure:

```html
<!-- Container of what you see everywhere -->
<div class="container">
  <!-- First section -->
  <section>
    <h1 class="layer-1">SECRET</h1>
  </section>
  <!-- Second section -->
  <section>
    <h1 class="layer-1">SECRET</h1>
  </section>
</div>

<!-- Container of what you see only when hovering -->
<div class="wrapper">
  <!-- First section (hidden through clip-path) -->
  <section>
    <h1 class="layer-2">MESSAGE</h1>
  </section>
  <!-- Second section (hidden through clip-path) -->
  <section>
    <h1 class="layer-2">MESSAGE</h1>
  </section>
</div>
```

### Using the library

In order to use the library, download `HideMessages.js` file and create a new JavaScript file where you'll import the class:

```javascript
import HideMessages from "path/to/HideMessages.js";
```

Now, create a new instance of `HideMessages` like so:

```javascript
new HideMessages(options);
```

### Parameters

`HideMessages` class requires four parameters:

1. `rootElement` - **Element**: Hidden messages' container

2. `layer1Array` - **Array** : An array containing layer1 elements

3. `minSize` - **Number**: The minimum size of the circle that follows the cursor (default: 20px)

4. `maxSize` - **Number**: The maximum size of the circle that follows the cursor (default 60px)

```javascript
const options = {
  rootElement: document.querySelector(".wrapper"),
  // Use always querySelectorAll to generate an array of at least one element
  layer1Array: document.querySelectorAll(".layer-1"),
  minSize: 20,
  maxSize: 60,
};
```
