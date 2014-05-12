'use strict';

var assert = require('assert'),
    debug = require('debug')('execsimple:debug'),
    ExecSimple = require('../exec-simple'),
    Promise = require('bluebird');

describe('exec-simple', function () {

    // echos the string and checks if the output returns
    it('timeout', function (done) {

        var output = '';
        var es = new ExecSimple('echo "Sleep... wait for it"; sleep 100; echo "DARY"');
        es.on('control', function (data) {
            debug(data);
        });
        es.on('stderr', function (data) {
            debug(data);
        });
        es.on('stdout', function (data) {
            debug(data);
        });

        es.run().timeout(50).then(function (code) {
            done('we need a timeout');
        }).catch(Promise.TimeoutError, function() {
            done();
        })
        .catch (function (code) {
            debug('this should not happen');
            done('we should not get an exit code: ' + code);
        });

    });

});