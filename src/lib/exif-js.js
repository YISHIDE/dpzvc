/*!
 * JavaScript EXIF Reader
 * https://github.com/exif-js/exif-js
 * 修复版：解决 strict mode 下未声明变量问题
 */

(function () {
    var debug = false;
    var root = this;

    var EXIF = function (obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    /* ========================= TAG MAPS ========================= */

    var ExifTags = EXIF.Tags = {
        0x9000: "ExifVersion",
        0xA000: "FlashpixVersion",
        0xA001: "ColorSpace",
        0xA002: "PixelXDimension",
        0xA003: "PixelYDimension",
        0x9101: "ComponentsConfiguration",
        0x9102: "CompressedBitsPerPixel",
        0x927C: "MakerNote",
        0x9286: "UserComment",
        0xA004: "RelatedSoundFile",
        0x9003: "DateTimeOriginal",
        0x9004: "DateTimeDigitized",
        0x9290: "SubsecTime",
        0x9291: "SubsecTimeOriginal",
        0x9292: "SubsecTimeDigitized",
        0x829A: "ExposureTime",
        0x829D: "FNumber",
        0x8822: "ExposureProgram",
        0x8824: "SpectralSensitivity",
        0x8827: "ISOSpeedRatings",
        0x8828: "OECF",
        0x9201: "ShutterSpeedValue",
        0x9202: "ApertureValue",
        0x9203: "BrightnessValue",
        0x9204: "ExposureBias",
        0x9205: "MaxApertureValue",
        0x9206: "SubjectDistance",
        0x9207: "MeteringMode",
        0x9208: "LightSource",
        0x9209: "Flash",
        0x920A: "FocalLength",
        0xA300: "FileSource",
        0xA301: "SceneType",
        0xA401: "CustomRendered",
        0xA402: "ExposureMode",
        0xA403: "WhiteBalance",
        0xA406: "SceneCaptureType"
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x8769: "ExifIFDPointer",
        0x8825: "GPSInfoIFDPointer",
        0x0112: "Orientation",
        0x0132: "DateTime",
        0x010F: "Make",
        0x0110: "Model",
        0x0131: "Software"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000: "GPSVersionID",
        0x0001: "GPSLatitudeRef",
        0x0002: "GPSLatitude",
        0x0003: "GPSLongitudeRef",
        0x0004: "GPSLongitude"
    };

    /* ========================= CORE ========================= */

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        var n;
        for (n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) !== "Exif") {
            return false;
        }

        var bigEnd;
        var tiffOffset = start + 6;

        if (file.getUint16(tiffOffset) === 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) === 0x4D4D) {
            bigEnd = true;
        } else {
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
        var tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            var exifData = readTags(
                file,
                tiffOffset,
                tiffOffset + tags.ExifIFDPointer,
                ExifTags,
                bigEnd
            );
            var tag;
            for (tag in exifData) {
                tags[tag] = exifData[tag];
            }
        }

        return tags;
    }

    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd);
        var tags = {};
        var i;

        for (i = 0; i < entries; i++) {
            var entryOffset = dirStart + i * 12 + 2;
            var tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (tag) {
                tags[tag] = readTagValue(file, entryOffset, tiffStart, bigEnd);
            }
        }
        return tags;
    }

    function readTagValue(file, entryOffset, tiffStart, bigEnd) {
        var type = file.getUint16(entryOffset + 2, !bigEnd);
        var numValues = file.getUint32(entryOffset + 4, !bigEnd);
        var valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart;
        var n, vals;

        if (type === 2) {
            return getStringFromDB(file, valueOffset, numValues - 1);
        }

        if (type === 3) {
            if (numValues === 1) {
                return file.getUint16(entryOffset + 8, !bigEnd);
            }
            vals = [];
            for (n = 0; n < numValues; n++) {
                vals[n] = file.getUint16(valueOffset + 2 * n, !bigEnd);
            }
            return vals;
        }

        if (type === 4) {
            if (numValues === 1) {
                return file.getUint32(entryOffset + 8, !bigEnd);
            }
            vals = [];
            for (n = 0; n < numValues; n++) {
                vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
            }
            return vals;
        }

        return null;
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);
        if (dataView.getUint8(0) !== 0xFF || dataView.getUint8(1) !== 0xD8) {
            return false;
        }

        var offset = 2;
        var length = file.byteLength;

        while (offset < length) {
            if (dataView.getUint8(offset) !== 0xFF) {
                return false;
            }

            var marker = dataView.getUint8(offset + 1);
            if (marker === 225) {
                return readEXIFData(
                    dataView,
                    offset + 4,
                    dataView.getUint16(offset + 2) - 2
                );
            } else {
                offset += 2 + dataView.getUint16(offset + 2);
            }
        }
        return false;
    }

    EXIF.getData = function (img, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.exifdata = findEXIFinJPEG(e.target.result) || {};
            if (callback) callback.call(img);
        };
        reader.readAsArrayBuffer(img);
    };

    EXIF.getAllTags = function (img) {
        return img.exifdata || {};
    };

    EXIF.readFromBinaryFile = function (file) {
        return findEXIFinJPEG(file);
    };

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function () {
            return EXIF;
        });
    }
}.call(this));