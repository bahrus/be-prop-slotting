# be-prop-slotting

Transfer values from light children to host.

[![NPM version](https://badge.fury.io/js/be-prop-slotting.png)](http://badge.fury.io/js/be-prop-slotting)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-prop-slotting?style=for-the-badge)](https://bundlephobia.com/result?p=be-prop-slotting)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-prop-slotting?compression=gzip">
<!-- [![Playwright Tests](https://github.com/bahrus/be-prop-slotting/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-prop-slotting/actions/workflows/CI.yml) -->

## Example 1a

```html
<my-custom-element-1-a itemscope>
        #shadow
            <slot name=test be-prop-slotting></slot>
    <a itemprop=someStringProp slot=test href=https://cnn.com>This is CNN</a>
    <input type=checkbox name=isHappy slot=test>
    <link itemprop=isVegetarian slot=test href=https://schema.org/True>
    <meta itemprop=age content=12 slot=test be-value-added='as number.'>
</my-custom-element-1-a>
```

... sets oMyCustomElement's someStringProp property to https://cnn.com at the moment when the hyperlink is slotted, and keeps the properties in sync. Likewise with isHappy, isVegetarian, age. 


## Example 1b [TODO - once use case is found]

```html
<my-custom-element itemscope>
        #shadow
            <peer-element -is-absolutely-grateful></peer-element>
            <slot name=test -is-happy=isAbsolutelyGrateful be-prop-slotting></slot>
    <a itemprop=someOtherStringProp slot=test -slot-prop=someStringProp href=https://cnn.com>This is CNN</a>
    <input type=checkbox name=isHappy slot=test>
    <link itemprop=isVegetarian slot=test href=https://schema.org/True>
    <meta itemprop=age content=12 slot=test be-value-added='as number.'>
</my-custom-element>
```



... same as Example 1a, but now we specify non default places to pass property value to.

## Example 2 [TODO -- need use case]

```html
<my-custom-element>
    #shadow
        <slot name=inputEl be-prop-slotting='
            of new weak ref ( @ my input element ) passed to input element.
        '></slot>
    <input name=myInput slot=inputEl type=url>
</my-custom-element>
```

... sets oMyCustomElement's input element property to weakRef of oInputElement.

## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'be-prop-slotting/be-prop-slotting.js';
```