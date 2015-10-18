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

/**
 * Simply compares two string version values.
 *
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 *
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 *
 * https://gist.github.com/alexey-bass/1115557/43208c146d64018b84e5a177272f0a394703be63
 *
 * @function
 * @param {String} left  Version #1
 * @param {String} right Version #2
 * @return {Integer|Boolean}
 * @author Alexey Bass (albass)
 * @since 2011-07-14
 */
exports.versionCompare = function(left, right) {
    if (typeof left + typeof right != 'stringstring')
        return false;

    var a = left.split('.'),
        b = right.split('.'),
        i = 0, len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }

    return 0;
};
