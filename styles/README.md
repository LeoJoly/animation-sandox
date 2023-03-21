# Style guidelines

This file defines general rules and principles to follow to write consistent styles across all RS projects.

You may not be able to apply these rules 100% of the time but try to stick to it as much as you can. Scoping styles properly is essential to avoid breaking style of elements you're not editing (which happens more than you wish it does).

These guidelines are based on [B.E.M](https://cssguidelin.es/#bem-like-naming) but with its own specificity. Examples are written in [Sass](https://sass-lang.com/), but you can transpose to any preprocessor you like to use.

## Naming

Name elements with semantic concise words and avoid abbreviations.

This is bad

```html
<div class="ctnr"></div>
<form class="block"></form>
<p class="txt-title"></p>
```

This is good

```html
<div class="o-container"></div>
<form class="c-form" action=""></form>
<p class="u-heading"></p>
```

## Namespacing

In the previous example you may have noticed we put prefixes (o-, c-, u-) before our class names. It's namespaces, and it gives details about the class' scope of use. It also basically tells you if modifying the class properties is **safe or not** (avoid side effects).
The following rules are largely inspired by this **old but gold** [CSS Wizardry article](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

- ```o-``` signify that something is an **Object** and may be use in a large number of unrelated contexts to the one you can currently see in it. Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places. Tread carefully.
- ```c-``` signify that something is a **Component**. This is a concrete, implementation-specific piece of UI. Making modifications to these types of class should be safe and have no side effects.
- ```l-``` signify that something is a part of a **Layout** and is designed to arrange smaller pieces of UI across the page. Making modifications to these types of class may break entire pages. You should not update their properties but rather updating their **$variables** (columns counts, gutters...).
- ```u-``` signify that this is an **Utility** class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. On the other hand you may use them on a large range of contexts.

Adding proper and well-chosen namespace to a css class tells developers if they are fine with modifying css classes, or if they should investigate a bit more to find in what contexts it may be used.

The [article](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) tells about much more namespaces but this is pretty much what you need to cover 99% of cases. However feel free to use other specific namespaces if you feel it is appropriate.

## Modifiers

Modifiers (M in [B.E.M](https://cssguidelin.es/#bem-like-naming)) are used to alter standard styles of an element. Let's take a button.

```html
<button class="c-button">Click me</button>
```

Its styles like width, color, padding, or anything can vary a lot depending on its purpose.
Let's say our button has a blue background across our whole app but red with a trash icon when it should discard a list item.

Don't do this

```html
<button class="c-button">Know you see me</button>
<button class="c-button delete">
  <img src="trash.svg" alt="trash icon"> Delete this item
</button>
```

```scss
.c-button {
  // [...] Any styles for your button
  padding: 10px;
  background-color: aquamarine;
  
  &.delete {
    background-color: red;
    img {
      margin-right: 10px;
    }
  }

}
```

In our previous example our ```.delete``` modifier applies both the red background and the gap between icon and label. We would rather have one modifier in charge of applying the red background, and one in charge of the gap between icon and text, if ever our button has one. Also, the modifier name could be a bit more specific about **what** it modifies. Here the button **type**.

Do this instead

```html
<button class="c-button">Know you see me</button>
<button class="c-button -type-delete -has-icon">
  <img src="trash.svg" alt="trash icon"> Delete this item
</button>
```

```scss
.c-button {
  // [...] Any styles for your button
  padding: 10px;
  background-color: aquamarine;
  
  // Only taking care of background color
  &.-type-delete {
    background-color: red;
  }
  
  // Only taking care of gap between icon and label
  &.-has-icon {
    img {
      margin-right: 10px;
    }
  }

}
```

### Boolean modifiers

When a modifier refers to a boolean state (active, disabled, is/has something) your modifier should be named like we did for the ```-has-icon``` modifier in the example above.

- ```-is-[modifier]```
- ```-has-[modifier]```

### Disclaimer

What [B.E.M](https://cssguidelin.es/#bem-like-naming) tells us about modifiers is not quite what we have seen with the previous example. It indeed encourages stronger scoping of said modifiers. Taking our previous example we would have something like this.

```html
<button class="c-button">Know you see me</button>
<button class="c-button c-button--type-delete c-button--has-icon">
  <img src="trash.svg" alt="trash icon"> Delete this item
</button>
```

```scss
.c-button {
  // [...] button styles
  
  &--type-delete {
    background-color: red;
  }
  
  &--has-icon {
    img {
      margin-right: 10px;
    }
  }

}
```

It results in the absolute certainty that our modifier can't bleed on other components **if ever** two modifiers with the **same name** are applied on a single element. However it makes the markup unclear and the modifiers hard to identify in a glance. So what should we do ?

``` html
<div class="c-card">
  <button class="c-card__button c-button -type-delete -has-icon">
    <img src="trash.svg" alt="trash icon"> Delete this item
  </button>
</div>
```

In our previous example we don't know if ```-type-delete``` and ```-has-icon``` refers to ```c-card__button``` or ```c-button```. Moreover if both ```c-card__button``` and ```c-button``` have a ```-type-delete``` modifier it can lead to undesired results. **BUT** considering such a situation occurs **quite rarely** added to the overall gain of mark up readability makes our method worth using.
If ever it happens, make sure to apply the two class on different element (add a damn wrapper !)

### Tips

Using **Utility** classes can also create a little mess in our markup.

```html
<button class="c-button u-hidden -type-delete -has-icon">
  <img src="trash.svg" alt="trash icon"> Delete this item
</button>
```

To increase markup readability and to ensure that we know what classes and modifiers are related we can use a **double pipe** separator. It will not be interpreted by the browser and definitely makes the markup easier to read.

```html
<button class="c-button -type-delete -has-icon || u-hidden">
  <img src="trash.svg" alt="trash icon"> Delete this item
</button>
```

## Nesting

Sass, Stylus or whatever preprocessor you're used to can nest selectors. We'll use this feature to scope (again) our style. According to [B.E.M](https://cssguidelin.es/#bem-like-naming) a child element extends parent class with double underscores like so.

```html
<article class="c-article">
  <h3 class="c-article__title">Hello world !</h3>
  <p class="c-article__content">Lorem ipsum dolor sit amet [...]</p>
  <a class="c-article__link" href="/hello-world">Read more</a>
</article>
```

You could to this.

```scss
.c-article {
  .c-article__title {/* ... */}
  .c-article__content {/* ... */}
  .c-article__link {/* ... */}
}
```

But you'd better do it this way

```scss
.c-article {
  &__title {/* ... */}
  &__content {/* ... */}
  &__link {/* ... */}
}
```

So if you rename your ```article``` element at any time, just update the root selector and you're good to go.

### Handle grandchildren elements

One classic mistake you will make when using B.E.M is chaining elements on multiple levels. Let's take an example of a navigation component.

```html
<nav class="c-navigation">
  <ul class="c-navigation__list">
    <li class="c-navigation__list__item">
      <a href="" class="c-navigation__list__item__link">Item 1</a>
    </li>
  </ul>
</nav>
```

Using this method can lead to several issues.

- It makes the markup harder to read as you nest elements.
- It limits the flexibility of your html structure. Because if you create a new parent for some element you have to add it to all its children.

```html
<nav class="c-navigation">
    <!-- A new wrapper element we have to add to all wrapper children -->
  <div class="c-navigation__wrapper">
    <ul class="c-navigation__wrapper__list">
      <li class="c-navigation__wrapper__list__item">
        <a href="" class="c-navigation__wrapper__list__item__link">Item 1</a>
      </li>
    </ul>
  </div>
</nav>
```

As you can see it is not a long a term, sustainable choice.

The solution is just not to chain elements.

```html
<nav class="c-navigation">
  <div class="c-navigation__wrapper">
    <ul class="c-navigation__list">
      <li class="c-navigation__item">
        <a href="" class="c-navigation__link">Item 1</a>
      </li>
    </ul>
  </div>
</nav>
```

In the example above styling is no longer markup dependant, and we keep it as simple as possible.

You may sometimes want to name different element with the same __element name.

```html
<nav class="c-navigation">
  <ul class="c-navigation__main">
    <!--  Same element name  -->
    <li class="c-navigation__item">
      <a href="" class="c-navigation__link">Item 1</a>
    </li>
  </ul>
  <ul class="c-navigation__secondary">
    <!--  Same element name  -->
    <li class="c-navigation__item">
      <a href="" class="c-navigation__link">Item 1</a>
    </li>
  </ul>
</nav>
```

Most of the time it means that you should reorganize your markup and/or split your component in smaller pieces.

### Refer to parent's modifiers

You'll often want to vary style of children elements depending on its parent modifiers.
From our last example, let's say the title turns blue when its the featured article.

```html
<article class="c-article -is-featured">
  <h3 class="c-article__title">Hello world !</h3>
  <!-- [...] -->
</article>
```

Don't do this

```scss
.c-article {
  &__title {
    color: grey;
    // .c-article is written twice
    .c-article.-is-featured & {
        color: blue
     }
  }
}
```

Do this

```scss
.c-article {
  // Define $self var to refer root selector
  $self: &;
  &__title {
    color: grey;
    // Use $self variable with an ampersand selector
    #{$self}.-is-featured & {
        color: blue
     }
  }
}
```

## Responsive

For readability and maintaining purpose you'll always want to write media queries rules inside the selector and not the other way around.

```html
<section class="section-read-more">
  <article class="related-article"></article>
  <article class="related-article"></article>
  <article class="related-article"></article>
</section>
```

This is bad

```scss
.section-read-more {
  display: flex;
  flex-flow: column wrap;
}

.related-article {
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .section-read-more {
    display: flex;
    flex-flow: row wrap;
  }
  
  .related-article {
    width: 33.333%;
  }
}
```

This is good

```scss
.section-read-more {
  display: flex;
  flex-flow: column wrap;
  @media screen and (min-width: 1024px) {
    flex-flow: row wrap;
  }
}

.related-article {
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 33.333%;
  }
}
```

When media queries styles are separated from "global" selectors this is not very handy on large files. You will have to go across different part of the file to update style on all devices and probably miss them sometimes.

By putting media queries right inside selectors you spot in a glance styles on all devices but you can go even further !

### Mixins to the rescue!

By using mixins like [sass-mq](https://github.com/sass-mq/sass-mq) it makes it even easier to read thanks to breakpoints abstractions.

```scss
.related-article {
  width: 100%;

  @include mq($from: desktop) {
    width: 33.333%;  
  }
}
```

## Properties sorting

For more consistency we want to group related properties together and sort them.

This is bad

```scss
.element {  
  display: flex;
  position: absolute;
  z-index: 2;
  color: red;
  top: 20px;
  transform: translate3d(20px, 20px, 0);
  padding: 10px;
  left: 50px;
  @include any-mixin();
  font-family: 'Arial', sans-serif;
  margin: 2px 0;
  flex-flow: row wrap;
}
```

Do this instead

```scss
.element {
  //0 - mixins
  @include any-mixin();

  //1 - position-related properties
  position: absolute;
  top: 20px;
  left: 50px;

  //2 - font/color-related properties
  font-family: 'Arial', sans-serif;
  color: red;

  //3 - block-related properties
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  margin: 2px 0;

  //4 - transforms & transitions
  transform: translate3d(20px, 20px, 0);

  //5 - all the remaining things like z-index, cursor etc.
  z-index: 2;

  //6 - media queries & :before, :hover :nth-of-type :active and all this kind of pseudo-selectors
  @media screen and (min-width: 1024px) {
    // Apply same sorting rules
  }
}
```

## Grid system

When it comes to the layout writing only css can be a bit tricky, especially when pages get their content dynamically from a CMS. That's why we generate a bunch of classes for our grid system.

You can set your own values depending on the project in the [variables](styles/_config/_variables.scss) file.

```scss
// Grid variables
$grid: (
  'cols': 12,
  'gutter': 1.5rem,
);
```

## More things you'd better not doing

1. Do not ~~almost~~ **ever** target html tags to define styles. Actually everything you style should have a class with proper naming according to [B.E.M](https://cssguidelin.es/#bem-like-naming) principles. The only case you allow yourself targeting html tags is when you style svgs or text-related elements returned by api/back-end you can't add classes to.
2. Always target classes over ids. Targeting ids break specificity cascade and can lead to issues.
3. Do not use chevron (>) or siblings (+) selectors unless you can't do without it (you always do). Markup order or nesting should not impact how your elements are styled.

## Wrapping them all together

If you stick to those principles you'll avoid a whole bunch of problems mostly linked to specificity and scoping of selectors.
