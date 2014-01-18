/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var xml = require("xml");
function createOutlines(outlines) {
    var outlines = outlines.map(function (outline) {
        var oneLine = Object.keys(outline).map(function (key) {
            var object = {};
            object[key] = outline[key];
            return object;
        });
        return {
            "outline": oneLine
        };
    });
    return xml({
        "outline": outlines
    });
}
function createHeader(header) {
    var headerObject = Object.keys(header).map(function (key) {
        var object = {};
        var value = header[key];
        if (key === "date" && value instanceof Date) {
            object[key] = value.toUTCString();
        } else {
            object[key] = value;
        }
        return object;
    });
    return xml({
        "head": headerObject
    });
}
/**
 *
 * @param header
 * @param outlines
 */
module.exports = function (header, outlines) {
    var headerXML = createHeader(header);
    var outlinesXML = createOutlines(outlines);
    return headerXML + outlinesXML;
};
module.exports.createHeader = createHeader;
module.exports.createOutlines = createOutlines;
