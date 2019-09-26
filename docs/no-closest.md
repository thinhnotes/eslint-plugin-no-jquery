# no-closest

Disallows the .closest method. Prefer Element#closest to $.closest.

## Rule details

✗ The following patterns are considered errors:
```js
$( 'div' ).closest();
$div.closest();
$( 'div' ).first().closest();
$( 'div' ).append( $( 'input' ).closest() );
```

✓ The following patterns are not considered errors:
```js
closest();
[].closest();
div.closest();
div.closest;
```