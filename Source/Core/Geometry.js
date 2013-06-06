/*global define*/
define([
        './defaultValue',
        './DeveloperError'
    ], function(
        defaultValue,
        DeveloperError) {
    "use strict";

    /**
     * DOC_TBA
     *
     * @alias Geometry
     * @constructor
     */
    var Geometry = function(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * DOC_TBA
         */
        this.attributes = defaultValue(options.attributes, {});

        /**
         * DOC_TBA
         */
        this.indexList = options.indexList;

        /**
         * DOC_TBA
         */
        this.primitiveType = options.primitiveType;

        /**
         * DOC_TBA
         */
        this.boundingSphere = options.boundingSphere;
    };

    /**
     * DOC_TBA
     */
    Geometry.prototype.clone = function(result) {
        if (typeof result === 'undefined') {
// TODO: is this always what we want, for say BoxGeometry?
            result = new Geometry();
        }

        var attributes = this.attributes;
        var newAttributes = {};
        for (var property in attributes) {
            if (attributes.hasOwnProperty(property)) {
                newAttributes[property] = attributes[property].clone();
            }
        }
        result.attributes = newAttributes;

// TODO: typed array or not.  fastest way to copy?
        var sourceValues = this.indexList;
        var length = sourceValues.length;
        var values = new Array(length);
        for (var i = 0; i < length; ++i) {
            values[i] = sourceValues[i];
        }
        result.indexList = values;

        result.primitiveType = this.primitiveType;
        this.boundingSphere.clone(result.boundingSphere);

        return result;
    };

    /**
     * DOC_TBA
     *
     * @exception {DeveloperError} geometries is required.
     */
    Geometry.computeNumberOfVertices = function(geometry) {
        if (typeof geometry === 'undefined') {
            throw new DeveloperError('geometry is required.');
        }

        var numberOfVertices = -1;
        for ( var property in geometry.attributes) {
            if (geometry.attributes.hasOwnProperty(property) && geometry.attributes[property].values) {
                var attribute = geometry.attributes[property];
                var num = attribute.values.length / attribute.componentsPerAttribute;
                if ((numberOfVertices !== num) && (numberOfVertices !== -1)) {
                    throw new DeveloperError('All attribute lists must have the same number of attributes.');
                }
                numberOfVertices = num;
            }
        }

        return numberOfVertices;
    };

    return Geometry;
});
