# be-prop-slotting [TODO]

Transfer values from light children to host.

## Example 1 [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=link be-prop-slotting='from href.'></slot>
    <a slot=link href=https://cnn.com>This is CNN</a>
</my-custom-element>
```

... sets oMyCustomElement's href property to https://cnn.com at the moment when the hyperlink is slotted.  

## Example 2 [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=inputEl be-deslotted='from value as number to numeric prop.
            From dataset:msg to stringProp.
        '></slot>
    <input type=number data-msg=hello slot=inputEl>
</my-custom-element>
```

... sets oMyCustomElement's numericProp property to oInput.valueAsNumber at the moment when the input element is slotted. 