
(function(root) {
    'use strict';

    var data = {},
        _get, _set,
        extend,
        isObject,
        storage;

    extend = function(base, object) {
        var i;

        for ( i in object ) {
            if ( object.hasOwnProperty(i) ) {
                base[i] = object[i];
            }
        }

        return base;
    }

    isObject = function(object) {
        return Object.prototype.toString.call(object) === '[object Object]';
    }

    _get = function(key, subdata) {
        var result = null,
            i;

        if ( subdata === undefined ) {
            subdata = data;
        }

        for ( i in subdata ) {
            if ( subdata.hasOwnProperty(i) && key[0] == i ) {
                if ( key.length <= 1 ) {
                    result = subdata[i];
                    break;
                }
                subdata = subdata[i];

                if ( subdata === null || subdata === undefined ) {
                    result = null;
                    break;
                }
                if ( key.indexOf(i) !== -1 ) {
                    key.splice(key.indexOf(i), 1);
                }
                if ( key.length == 1 ) {
                    if ( isObject(subdata) ) {
                        result = !subdata.hasOwnProperty(key) || subdata[key] === undefined ? null : subdata[key];
                    } else {
                        result = null;
                    }
                } else {
                    if ( isObject(subdata) ) {
                        result = _get(key, subdata);
                    } else {
                        result = null;
                    }
                }
                break;
            }
        }

        return result;
    };

    _set = function(key, value) {
        var subdata = {}, i, len;

        key = key.reverse();
        len = key.length;

        for ( i = 0; i < len; i++ ) {
            if ( i === 0 ) {
                subdata[key[0]] = value;
            } else {
                subdata[key[i]] = extend({}, subdata);
                delete subdata[key[i - 1]];
            }
        }
        extend(data, subdata);

        if ( value ) {
            /*jshint evil:true */
            eval('data' + '["' + key.reverse().join('"]["') + '"] = value;');
        }
    };

    storage = {
        get: function(key, defaultValue) {
            var value = _get(key.split('.'));

            return value !== null ? value : (defaultValue === undefined ? null : defaultValue);
        },

        set: function(key, value) {
            _set(key.split('.'), value);

            return this;
        },

        fromJSON: function(json) {
            extend(data, JSON.parse(json) || {});

            return this;
        }
    };

    if ( typeof define === 'function' && define.amd ) {
        define(function() {
            root.GlobalStorage = storage;
        });
    } else {
        root.GlobalStorage = storage;
    }
}(this));