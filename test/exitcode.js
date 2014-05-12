// returns the exit code one
'use strict';

var assert = require('assert'),
    debug = require('debug')('execsimple:debug'),
    ExecSimple = require('../exec-simple');

describe('exec-simple', function () {

    // echos the string and checks if the output returns
    it('should return the exit code', function (done) {

        var es = new ExecSimple('exit 1');
        es.on('control', function (data) {
            debug(data);
        });
        es.on('stderr', function (data) {
            debug(data);
        });
        es.on('stdout', function (data) {
            debug(data);
        });

        es.run().then(function () {
            done('this should not happen');
        }).
        catch (function (code) {
            assert.equal(code, 1, 'exec code should be 1');
            done();
        });

    });

});