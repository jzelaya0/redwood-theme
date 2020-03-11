# SASS
Features and development tools.

## SASS Variables
SASS variables can be found here:
```
project   
│
└───src
│   │
│   └───styles
│       │   
│       └───utilities
│           │   
│           └───_variables.scss
```

### Overview
In this file you will modify the theme variables based on your needs. Since Liquid **cannot** be used in SASS, [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are used to work around it. Variables are declared in ```/src/snippets/css-variables.liquid``` and can be assigned values from **settings_schema.json**.

### Colors
Color variables include:
* Text
* Buttons
* Backgrounds
* Borders
* Helper colors for form error/success states

_Change their values if needed_

### Typography
It is recommended that the typography variable values be modified to best suit your needs. These variables include:
* Font sizes
* Font families
* Font weights

## SASS Helper Functions
SASS Helper functions can be found here:
```
project   
│
└───src
│   │
│   └───styles
│       │   
│       └─── tools
```

### Spacing
The **$spacing-data** map consists of 7 values and is used for the **spacing()** helper function and CSS margin/padding helper classes. These values are meant to serve as base sizes for spacing. You can add more sizes by adding to the **$spacing-data** map variable.

```scss
// Modify this pixel value to your needs
$spacing-unit: 5px;

// Do not change the key/value pairs
$spacing-data: (
  0: 0,
  1: rem($spacing-unit),
  2: rem($spacing-unit * 2),
  3: rem($spacing-unit * 3),
  4: rem($spacing-unit * 4),
  5: rem($spacing-unit * 5),
  6: rem($spacing-unit * 6)
);
// Output: 0px, 5px, 10px, 15px 20px, 25px, 30px

```

```scss
// Examples
p {
  padding-bottom: spacing(3); // => 15px
  margin-top: spacing(0); // => 0px
}

div {
  padding: spacing(6) 0 ; // => 30px 0px 30px 0
  margin:  0 spacing(2) spacing(1); // 0 10px 5px 10px
}
```

### REM, EM and PX

All three functions accept either px, rem, or em values

```scss
.rem-to-px {
  padding-top: px(2rem); // => 20px;
}

.px-to-rem {
  padding-right: rem(10px); // =>  1rem
}

.px-to-em {
  padding-bottom: em(15px); // =>  0.9375em;
}

.em-to-px {
  margin-top: px(4em); // => 40px
}

.em-to-rem {
  margin-right: rem(5em); // => 5rem
}

.rem-to-em {
  margin-bottom: em(6rem); // => 3.75em
}
```


### Typography
**font-size()**

The font-size function uses the **$font-size-data** map (found in variables.scss.liquid).
Here you will modify the pixel values based on your need - use the rem function

It accepts the following arguments as values:
* base
* h1
* h2
* h3
* h4
* h5
* h6
* mobile-input

```scss

// Assuming h1 is set to rem(48px);
h1 {
  font-size: font-size(h1); // => 3rem
}

// Assuming small is set to rem(14px);
p {
  font-size: font-size(base); // => 1.6rem
}
```

## SASS Helper Mixins
SASS Helper Mixins can be found here:
```
project   
│
└───src
│   │
│   └───styles
│       │   
│       └───mixins.scss
```
Several mixins were pre-built in the base Slate theme, but additional helpers were added for development. Here are few that might prove to be most useful:
* media-query()
* clearfix()
* prefix() - Cross-broswer prefixing

## Breakpoints
The theme grid system now has 4 breakpoints and uses _em_ instead of _px_ values for media-queries.
* small: 575px
* medium: 768px
* large: 990px
* widescreen: 1200px

There are 12 available media-queries for usage:
```scss
$xs: 'xs';                        // 0 ~ 574
$small-up: 'small-up';            // 575 ~ ...
$small: 'small';                  // 575 ~ 767
$small-down: 'small-down';        // 0 ~ 767
$medium-up: 'medium-up';          // 768 ~ ...
$medium: 'medium';                // 768 ~ 990
$medium-down: 'medium-down';      // 0 ~ 989
$large-up: 'large-up';            // 990 ~ ...
$large: 'large';                  // 990 ~ 1199
$large-down: 'large-down';        // 0 ~ 1199
$medium-large: 'medium-large';    // 768 ~ 1199
$widescreen: 'widescreen';        // 1200 ~ ...
```

```scss
// Examples
span {  
  // Media query at 768px ~ ... (Small desktops and above)
  @include media-query($medium-up) {
    font-size: rem(30px);
  }

  // Media query at 0px ~ 767px (Mobile & Tablet)
  @include media-query($small-down) {
    font-size: rem(25px);
  }

  // Media query at 0px ~ 574px (Mobile)
  @include media-query($xs) {
    font-size: rem(20px);
  }  
}
```
