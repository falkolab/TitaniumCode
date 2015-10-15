var VERSION_CODES = {
    CUR_DEVELOPMENT: 10000,
    BASE: 1,
    BASE_1_1: 2,
    CUPCAKE: 3,
    DONUT: 4,
    ECLAIR: 5,
    ECLAIR_0_1: 6,
    ECLAIR_MR1: 7,
    FROYO: 8,
    GINGERBREAD: 9,
    GINGERBREAD_MR1: 10,
    HONEYCOMB: 11,
    HONEYCOMB_MR1: 12,
    HONEYCOMB_MR2: 13,
    ICE_CREAM_SANDWICH: 14,
    ICE_CREAM_SANDWICH_MR1: 15,
    JELLY_BEAN: 16,
    JELLY_BEAN_MR1: 17,
    JELLY_BEAN_MR2: 18,
    KITKAT: 19,
    KITKAT_WATCH: 20,
    LOLLIPOP: 21,
    LOLLIPOP_MR1: 22,
    M:23
};

module.exports = {};

Object.keys(VERSION_CODES).forEach(function(name) {
    var code = VERSION_CODES[name];
    Object.defineProperty(module.exports, name, {
        value: code,
        writable: false
    });
    if(name != 'CUR_DEVELOPMENT') {
        Object.defineProperty(module.exports, 'isAndroidFrom'+code, {
            value: code <= Ti.Platform.Android.API_LEVEL,
            writable: false
        });
        Object.defineProperty(module.exports, 'isAndroidUpTo'+code, {
            value: code >= Ti.Platform.Android.API_LEVEL,
            writable: false
        });
    }
});

VERSION_CODES = undefined;
