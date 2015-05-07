# Primer

Primer is a small tool I wrote for testing time dependent functionality in my Javascript applications. (And in case you were wondering, yes, it is named after [one of my favorite movies.](http://en.wikipedia.org/wiki/Primer_(film))) I wanted to be able to fake the system time, but I didn't want to have to know anything about the internals of any function, or how it got the time. There were a few other tools like this one, but none were quite as easy to use (or as small).

## How It Works

Primer overrides the internal `Date` object with a custom one that behaves nearly identically. The only difference is that it has a few extra functions to change the time if necessary.

## Enabling Primer

Primer is disabled by default. The way to enable and disable depends on your environment. When enabled, Primer should have no effect on any of your code (unless there are bugs). The only time you should see any effect from Primer is when you call the `setTime` function.

## Browser Globals
If you're not using a module system, they're located on the `Date` object. 

```js
Date.enablePrimer()
Date.disablePrimer()
```

## Node.js/CommonJS
They're directly on the exports.

```js
var primer = require('primer');

...

primer.enable();
primer.disable();
```

## AMD
They're on the exports object.

```js
define(['primer'], function(primer) {
	primer.enable();
	primer.disable();
});
```

## Changing The Time

There are two ways to change the time. The first is by using an absolute date. For instance, you might want to set the date to January 15, 1999. In which case you would do this:

```js
Date.setTime(new Date('January 15, 1999'));
console.log(Date()); // Fri Jan 15 1999 00:00:03 GMT-0500 (EST)
```

`setTime` can take a `Date` object, a date string or a numeric timestamp. You can also change the time to a relative point from now. For instance, say we wanted to set the date 20 minutes in the past.

```js
var realNow = Date.now();
Date.setTime(-20*60*1000, true); // second parameter means relative
console.log(realNow - Date.now()); // about 20 minutes or 20*60*1000
```

**Note:** No matter how you set the date, the **clock continues to tick**. I didn't see much use in stopping the clock since your code wouldn't normally function in that type of environment.

## Resetting The Time

If you want to go back to real-world time, but don't want to disable and enable Primer, just call `Date.resetTime()`.

## Testing

I've done some fairly basic testing, but by no means is it extensive. If you find a bug, let me know. I've tested this in the latest versions of Chrome, Firefox and Safari on OSX Mavericks, as well as in PhantomJS.
