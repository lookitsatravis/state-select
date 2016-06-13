# Angular 1.x State Select

## Installation

Add the package:

`npm install lookitsatravis/state-select --save`

Add script tags or import the library.

Then add it as a dependency for your Angular 1.x module:

```js
  angular.module('myApp', ['state-select']);
```

This package is intended to be used side-by-side with [country-select](https://github.com/lookitsatravis/country-select)

## Usage

Simply bind the state value to the `state` attribute and the country value to the `country` attribute:

```html
  <state-select name="state" placeholder="State/Province" state="vm.address.state" country="vm.address.country" required></state-select>
```

## Notes

If the selected country does not have any states or provinces, then a text input will be rendered instead.
