/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var xml = require("xml");
function createOutlines(outlines) {
    return outlines.map(function (outline) {
        if ('_children' in outline) {
            var children = outline['_children'];
            console.log('child', children);
            delete outline['_children'];
            var ret = createOutlines(children);
            ret.unshift({_attr: outline});
            return {'outline': ret};
        }
        return {
            "outline": {
                _attr : outline
            }
        };
    });
}

function createBody(outlines) {
    var out = createOutlines(outlines);
    console.log('out', JSON.stringify(out));
    var ret = xml({'body': out});
    return ret;
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
