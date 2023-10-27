# be-prop-slotting [TODO]

Transfer values from light children to host.

## Example 1a [TODO]

```html
<my-custom-element itemscope>
    #shadow
        <slot name=test be-prop-slotting></slot>
    <a itemprop=someStringProp slot=test href=https://cnn.com>This is CNN</a>
    <input type=checkbox name=isHappy slot=test>
    <link itemprop=isVegetarian slot=test href=https://schema.org/True>
    <meta itemprop=age content=12 slot=test be-value-added='as number.'>
</my-custom-element>
```

... sets oMyCustomElement's someStringProp property to https://cnn.com at the moment when the hyperlink is slotted, and keeps the properties in sync. Likewise with isHappy, isVegetarian, age. 


## Example 1b [TODO]



... same as Example 1a, but now it update's oMyCustomElement's url property.

## Example 2 [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=inputEl be-prop-slotting='from value as number to numeric prop.
            From dataset:msg to stringProp.
        '></slot>
    <input type=number data-msg=hello slot=inputEl>
</my-custom-element>
```

... sets oMyCustomElement's numericProp property to oInput.valueAsNumber at the moment when the input element is slotted. 