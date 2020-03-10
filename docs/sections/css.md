# CSS
Features and development tools.

## Grid System
The grid system is similar to Debut's grid system with a few slight modifications in terms of breakpoints.
Grid columns are available in:
* Whole
* Halves
* Thirds
* Fourths
* Fifths
* Sixths
* Eights
* Tenths


### Grid Example
```html
<!-- Example -->
<div class="container">
  <div class="row">
    <!-- Width will be 100% at 0 ~ 767px - Width will be at 33% at 768px ~ ... -->
    <div class="col col--sm-down-1-2 col--md-up-1-3"></div>

    <!-- Width will be 50% at 0 ~ 767px - Width will be at 33% at 768px ~ ... -->
    <div class="col col--sm-down-1-2 col--md-up-1-3"></div>

    <!-- Width will be 50% at 0 ~ 767px - Width will be at 33% at 768px ~ ... -->
    <div class="col col--sm-down-1-2 col--md-up-1-3"></div>

    <!-- Width will be 100% at 0 ~ 767px - will be hidden at 768px ~ ... -->
    <div class="col col--sm-down-1-2"></div>
  </div>
</div>
```

### Row Modifiers
```html
<div class="container">
  <!-- No Gutters -->
  <div class="row row--no-gutters">
    <div class="col col--1-2"></div>
    <div class="col col--1-2"></div>  
  </div>

  <!-- Half Gutters -->
  <div class="row row--half-gutters">
    <div class="col col--1-2"></div>
    <div class="col col--1-2"></div>  
  </div>

  <!-- Double Gutters -->
  <div class="row row--double-gutters">
    <div class="col col--1-2"></div>
    <div class="col col--1-2"></div>  
  </div>
</div>
```

## Utilities
On top of Slate's built-in CSS helper classes, basic helpers have been added for setting Flexbox properties, handling margin/padding spacing, and typography.

All helper classes can be found here:
```
project   
│
└───src
│   │
│   └───styles
│       │   
│       └───core
│           │   
│           └───_helpers.scss
```

### Flexbox CSS Helpers
For all Flexbox helper classes available check the **_helpers.scss** partial file.
```html
<div class="flex">
  <img src="/image.jpg">
  <p class="align-self-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</div>

<div class="flex flex-wrap justify-content-center">
  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
</div>

<div class="pr-6">
  Padding right is equivalent to spacing(6)
</div>

<div class="flex flex-direction-column">
  <img src="/image1.jpg">
  <img src="/image2.jpg">
</div>
```

### Margin/Spacing CSS Helpers
Margin and padding helper classes are constructed using a SASS mixin and the SASS spacing function - their spacings are dependent on the **$spacing-data** map and **$spacing-unit**.
```html
<div class="mt-0">
  Margin top is equivalent to spacing(0)
</div>

<div class="mb-3">
  Margin bottom is equivalent to spacing(3)
</div>

<div class="pr-6">
  Padding right is equivalent to spacing(6)
</div>

<div class="pl-1">
  Padding left is equivalent to spacing(1)
</div>
```

### Typography CSS Helpers
For all Typography helper classes available check the **_helpers.scss** partial file.
```html
<h1 class="text-uppercase">Heading will be uppercase</h1>

<a href="#" class="text-underline">Link will be underlined</a>

<p class="text-bold">Paragraph will be bold</p>
```
