global-storage
==============

Simple JavaScript Object for manage global variables

GlobalStorage is a lightweight library (<1kb when minified) designed for simple managing variables
passing from backend languages like PHP to JavaScript. You can saving objects and
arrays, numbers or other data types, accessible via a Redis-like API.

## How to use GlobalStorage


Download it manually from [here](https://raw2.github.com/budnix/global-storage/master/global-storage.js) and hook it in your HTML.

```html
<script src="/path/to/global-storage.js" type="text/javascript"></script>
```

## API reference

```javascript
/**
 * @param {String} key
 * @param {Mixed} value
 */
GlobalStorage.set(key, value)
```

> Set a key to a particular value or a object.

*Example*
```javascript
GlobalStorage.set('book_id', 123); // Saved as number
GlobalStorage.set('book_title', 'JavaScript for dummies'); // Saved as string
GlobalStorage.set('books', [{title: 'JavaScript for dummies', iban: 12345}, {titile: 'Html5', iban: 56789}]);
```

---

```javascript
/**
 * @param {String} key
 * @param {Mixed} defaultValue
 */
GlobalStorage.get(key, defaultValue)
```

> Returns the saved value for given key, even if the saved value is a object. If value is null or undefined it returns a default value.

*Example*
```javascript
GlobalStorage.get('book_title');
> "JavaScript for dummies"

GlobalStorage.get('book_id');
> 123

GlobalStorage.get('books');
>  [{title: 'JavaScript for dummies', iban: 12345}, {titile: 'Html5', iban: 56789}]

GlobalStorage.get('not-exists-key', 55):
> 55

GlobalStorage.set('foo', 11):
GlobalStorage.get('foo', 55):
> 11
```
