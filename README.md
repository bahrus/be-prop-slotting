# be-prop-slotting [TODO]

Transfer values from light children to host.

## Example 1a [TODO]

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


## Example 1b [TODO]

```html
<my-custom-element itemscope>
        #shadow
            <peer-element -is-absolutely-grateful></peer-element>
            <slot name=test be-prop-slotting='
                //sets host's someOtherProp to the light child's someStringProp href value. 
                of some string prop passed to some other string prop.
                //sets oPeerElement's isAbsolutelyGrateful property to value of isVegetarian from light child.
                Of is vegetarian passed to -is-absolutely-grateful.
            '></slot>
    <a itemprop=someStringProp slot=test href=https://cnn.com>This is CNN</a>
    <input type=checkbox name=isHappy slot=test>
    <link itemprop=isVegetarian slot=test href=https://schema.org/True>
    <meta itemprop=age content=12 slot=test be-value-added='as number.'>
</my-custom-element>
```



... same as Example 1a, but now we specify non default places to pass property value to.

## Example 2 [TODO]

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