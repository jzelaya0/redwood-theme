# Lazysizes
The starter theme comes with lazysizes.js pre-installed and lazysizes templating snippets are available for usage.
These snippets are **responsive-image.liquid** and **responsive-bg-image.liquid**. You can find more information about lazysizes.js [here](https://github.com/aFarkas/lazysizes).

## Responsive Images
**responsive-image.liquid** - This snippet accepts liquid variables as parameters:
- image: **{Object}** Image object - **Required**
- image_class: **{String}** class name of the <img />
- image_attributes: **{String}**  additional HTML attributes of the <img />
- image_alt: **{String}**  custom image alt for the <img />
- max_width: **{Number}** Max width of the image container
- max_height: **{Number}** Max height of the image container
- wrapper_class: **{String}** class name of the wrapper
- wrapper_attributes: **{String}** additional HTML attributes of the <div> wrapper

```liquid
<!-- exmpale usage -->
<ul>
  {% for image in product.images %}    
    {% capture data %}data-index="{{ forloop.index0 }}"{% endcapture %}    
    <li>
      {%- include 'responsive-image' with
        image: image,
        max_width: 800,
        max_height: 600,
        wrapper_class: 'my-class',
        wrapper_attributes: data
      -%}
    </li>
  {% endfor %}
</ul>
```

## Responsive Background Images
**responsive-bg-image.liquid** - This snippet is meant to be used as HTML attributes. It accepts the following liquid variables:
- image: {Object} Image object - **Required**

```liquid
<!-- example usage -->
<div class="lazyload" data-bgset="{% include 'responsive-bg-image', image: article.image %}"></div>

```
