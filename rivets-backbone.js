/* global define: true */
(function (root, factory) {
    'use strict';
    if (typeof exports === 'object') {
        // CommonJS
        factory(require('rivets'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['rivets', 'backbone'], factory);
    } else {
        // Browser globals
        factory(root.rivets, root.Backbone);
    }
})
(this, function (rivets, Backbone) {
    'use strict';

    var Model = Backbone.Model,
        Collection = Backbone.Collection;

    /**
     * @param {Model}  model
     * @param {String} keypath
     * @param {*}      [value]
     *
     * @returns {*}
     */
    function getterSetter(obj, keypath, value) {
        if (!(obj instanceof Model) && !(obj instanceof Collection)) {
            return;
        }

        if (arguments.length === 3) {
            if (keypath === '*') {
                // setting all attributes
                // value should be an Object
                obj.set(value);
                return;
            }
            // setting the only attribute
            obj.set(keypath, value);
            return;
        }

        if (keypath === '*') {
            // all attributes
            value = obj.attributes;
        } else {
            // one attribute
            value = obj.get(keypath);
        }

        // rivets cant iterate over Backbone.Collection -> return Array
        if (value instanceof Collection) {
            return value.models;
        }

        return value;
    }

    /**
     * @param {String} action on or off
     * @returns {Function}
     */
    function onOffFactory(action) {

        /**
         * @param {Model}    model
         * @param {String}   keypath
         * @param {Function} callback
         */
        return function (model, keypath, callback) {
            if (!(model instanceof Model)) {
                return;
            }

            var value = model.get(keypath);

            var eventName = 'change' + (keypath === '*' ? '' : (':' + keypath));
            model[action](eventName, callback);

            if (value instanceof Collection) {
                value[action]('add remove reset sort', callback);
            }
        };
    }

    // Configure rivets data-bind for Backbone.js
    rivets.adapters[':'] = {
        observe: onOffFactory('on'),
        unobserve: onOffFactory('off'),
        get: getterSetter,
        set: getterSetter
    };

    return rivets;
});
