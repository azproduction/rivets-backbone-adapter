# Rivets.js Backbone Adapter

Backbone.js adapter for Rivets.js data-bind with nested models and collections support.

## Rivets 0.5.x & 0.6.x & 0.7.x

This adapter is compatible with both rivets `<= 0.5.x` and `>= 0.6.x`, `>= 0.7.x`

If you are using rivets-backbone-adapter with bower:
 * For rivets `0.5.x` freese version on tag `#1.0.0`
 * For rivets `0.6.x` use version >= `#1.1.0` <= `#2.0.0`
 * For rivets `0.7.x` use version >= `#2.0.1`

## Upgrading Adapter from 2.0.x to 2.1.x

In this release Adapter no longer gets/gets properties on Collections or any other non-Model objects.
Old adapter resolves `rv-smth="collection:models"` as javascript code `collection.models`. New one will return `undefined`.
The same is for setting properties on collection. 

To avoid this issue please use native rivets.js `.`-adaptor. Eg `rv-smth="collection.models"` or `rv-smth=".models"` if you are passing collection as root models object.

## Features

 * Nested models support 
   * `rv-each-item="model:subModel:subSubModel:collection"`
 * `*`-keypaths (attributes accessor) 
   * `rv-value="model:* | json"` 
   * `rv-text="model.format < :*"`

[See example](http://azproduction.github.io/rivets-backbone-adapter/example/index.html) and [code](example/index.html)
