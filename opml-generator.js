/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var xml = require("xml");
function createBody(outlines) {
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
        "body": outlines
    });
}
function createHeader(header) {
    var headerObject = Object.keys(header).map(function (key) {
        var object = {};
        var value = header[key];
        if (key === "dateCreated" && value instanceof Date) {
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
    var outlinesXML = createBody(outlines);
    return '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">'
        + headerXML
        + outlinesXML
        + '</opml>';
};
module.exports.createHeader = createHeader;
module.exports.createBody = createBody;
