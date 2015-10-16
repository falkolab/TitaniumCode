# Android version helper commonjs module for Titanium SDK

[![Available on gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/falkolab-version)


## Installation


With **npm** for **Node.js** and **io.js** you can easily install it with

    $ npm install --save falkolab-version

With **gitTio** for  **Titanium SDK** you can easily install it with

    $ gittio install com.falkolab.version

To download the module for [manual install][mi] (e.g. through *Appcelerator Studio*).

[mi]: http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module

## Usage

You can use this module in both Classic or Alloy projects.

### Alloy usage


`alloy.js`

```js
var version = require('com.falkolab.version');
_.extend(Alloy.Globals, version);

```

In your TSS files:
```tss
// API_LEVEL >= 14 (ICE_CREAM_SANDWICH)
"#info[if=Alloy.Globals.isAndroidFrom14]" : {
    ...
}
// API_LEVEL <= 14 (ICE_CREAM_SANDWICH)
"#info[if=Alloy.Globals.isAndroidUpTo14]" : {
    ...
}
// API_LEVEL === 14 (ICE_CREAM_SANDWICH)
"#info[if=Alloy.Globals.ICE_CREAM_SANDWICH]" : {
    ...
}

```

In view `*.xml`
```xml
<View if="Alloy.Globals.isAndroidUpTo14" />
<View if="Alloy.Globals.ICE_CREAM_SANDWICH" />
...

```
