module.exports = {
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

Object.keys(module.exports).forEach(function(name) {
    var code = module.exports[name];

    if(name != 'CUR_DEVELOPMENT') {
        module.exports['isAndroidFrom'+code] = code <= Ti.Platform.Android.API_LEVEL;
        module.exports['isAndroidUpTo'+code] = code >= Ti.Platform.Android.API_LEVEL;
    }
});
