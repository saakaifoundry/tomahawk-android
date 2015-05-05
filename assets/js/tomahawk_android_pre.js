/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 *   Copyright 2013, Enno Gottschalk <mrmaffen@googlemail.com>
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 */

// This detour is needed because we can only send Strings and no JSON objects from Java to JS
// through the Javascript Interface.

Tomahawk.resolverData =
    function () {
        return JSON.parse(Tomahawk.resolverDataString());
    };

Tomahawk.addTrackResults =
    function (results) {
        Tomahawk.addTrackResultsString(JSON.stringify(results));
    };

Tomahawk.addAlbumResults =
    function (results) {
        Tomahawk.addAlbumResultsString(JSON.stringify(results));
    };

Tomahawk.addArtistResults =
    function (results) {
        Tomahawk.addArtistResultsString(JSON.stringify(results));
    };

Tomahawk.addAlbumTrackResults =
    function (results) {
        Tomahawk.addAlbumTrackResultsString(JSON.stringify(results));
    };

Tomahawk.reportStreamUrl =
    function (qid, url, headers) {
        var stringifiedHeaders = null;
        if (headers) {
            stringifiedHeaders = JSON.stringify(headers);
        }
        Tomahawk.reportStreamUrlString(qid, url, stringifiedHeaders);
    };

Tomahawk.createFuzzyIndex =
    function (indexList) {
        if (indexList) {
            Tomahawk.createFuzzyIndexString(JSON.stringify(indexList));
        }
    };

Tomahawk.searchFuzzyIndex =
    function (query) {
        var result = Tomahawk.searchFuzzyIndexString(query);
        if (result) {
            return JSON.parse(result);
        } else {
            return null;
        }
    };

Tomahawk.resolveFromFuzzyIndex =
    function (artist, album, title) {
        var result = Tomahawk.resolveFromFuzzyIndexString(artist, album, title);
        if (result) {
            return JSON.parse(result);
        } else {
            return null;
        }
    };

Tomahawk.nativeAsyncRequest =
    function (reqId, url, extraHeaders, options) {
        Tomahawk.nativeAsyncRequestString(reqId, url, JSON.stringify(extraHeaders),
            JSON.stringify(options));
    };

/**
 * Pass the natively retrieved reply back to the javascript callback.
 * Creates a fake XMLHttpRequest object to augment the response.
 * Convenience-method wrapper for nativeAsyncRequestDone(reqId, xhr).
 *
 * Internal use only!
 */
Tomahawk._nativeAsyncRequestDone = function (reqId, responseText, responseHeaders, status, statusText) {
    var fakeXhr = {
        responseHeaders: JSON.parse(responseHeaders),
        responseText: responseText,
        readyState: 4,
        status: status,
        statusText: statusText,
        getAllResponseHeaders: function () {
            return this.responseHeaders;
        },
        getResponseHeader: function (header) {
            return this.responseHeaders[header];
        }
    };
    Tomahawk.nativeAsyncRequestDone(reqId, fakeXhr);
};

Tomahawk.addUrlResult =
    function (url, result) {
        Tomahawk.addUrlResultString(url, JSON.stringify(result));
    };

Tomahawk.localStorage = {
    setItem: function(key, value) {
        Tomahawk.localStorageSetItem(key, value);
    },
    getItem: function(key) {
        return Tomahawk.localStorageGetItem(key);
    },
    removeItem: function(key) {
        Tomahawk.localStorageRemoveItem(key);
    },
};
