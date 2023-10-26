# be-prop-slotting [TODO]

Transfer values from light children to host.

## Example 1a [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=link be-prop-slotting='from href.'></slot>
    <a slot=link href=https://cnn.com>This is CNN</a>
</my-custom-element>
```

... sets oMyCustomElement's href property to https://cnn.com at the moment when the hyperlink is slotted. 

Adds be-value-added enhancement to hyperlink anchor element, so that instead of updating the href, if the href is updated via the oHTMLAnchorElement.beEnhanced.beValueAdded.value, it will reflect to the hyperlink, as well as to oMyCustomElement's href property.

## Example 1b [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=link be-prop-slotting='from href to url.'></slot>
    <a slot=link href=https://cnn.com>This is CNN</a>
</my-custom-element>
```

... same as Example 1a, but now it update's oMyCustomElement's url property.

## Example 2 [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=inputEl be-be-prop-slotting='from value as number to numeric prop.
            From dataset:msg to stringProp.
        '></slot>
    <input type=number data-msg=hello slot=inputEl>
</my-custom-element>
```

... sets oMyCustomElement's numericProp property to oInput.valueAsNumber at the moment when the input element is slotted. 