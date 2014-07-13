global-storage
==============

Simple JavaScript Object for manage global variables

GlobalStorage is a lightweight library (~1kb when minified) designed for simple managing variables
passing from backend languages like PHP to JavaScript. You can set/get objects, arrays, numbers or other data
types, accessible via a Redis-like API.

## How to use GlobalStorage


Download it manually from [here](https://raw2.github.com/budnix/global-storage/master/global-storage.js) and add it in your HTML.

```html
<script src="/path/to/global-storage.js" type="text/javascript"></script>
```

You can pass variables collected from backend to frontend via JSON:

```javascript
<script>
    GlobalStorage.fromJSON('{"user_id":123,"env":"dev","session":{"is_logged":true,"is_admin":false}}');
</script>
```

and in different code of your JavaScript you have easily access to yours backend variables.

*Example*
```javascript

...
if ( GlobalStorage.get('env') == 'dev' ) {
   // code for dev environment
}
...

if ( GlobalStorage.get('session.is_logged') ) {
   // code for logged user
}
...

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
// Save as number
GlobalStorage.set('book_id', 123);
// Save as string
GlobalStorage.set('book_title', 'JavaScript for dummies');
// Saved as array
GlobalStorage.set('books', [{title: 'JavaScript', iban: 12345}, {titile: 'Html5', iban: 56789}]);
// Saved as object
GlobalStorage.set('session', {user_id: 12, avatar: {min: 'http://...min.jpg', max: 'http://...max.jpg'}});
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

GlobalStorage.get('session');
>  {user_id: 12, avatar: {min: 'http://...min.jpg', max: 'http://...max.jpg'}}

GlobalStorage.get('session.user_id');
>  12

GlobalStorage.get('session.avatar');
>  {min: 'http://...min.jpg', max: 'http://...max.jpg'}

GlobalStorage.get('session.avatar.min');
>  'http://...min.jpg'

GlobalStorage.get('session.avatar.mid', 'mid.jpg');
>  'mid.jpg'

GlobalStorage.get('not-exists-key', 55):
> 55

GlobalStorage.set('foo', 11):
GlobalStorage.get('foo', 55):
> 11
```
