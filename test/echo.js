'use strict';

var assert = require('assert'),
    debug = require('debug')('execsimple:debug'),
    ExecSimple = require('../exec-simple');

describe('exec-simple', function () {

    // echos the string and checks if the output returns
    it('echo', function (done) {

        var output = '';
        var es = new ExecSimple('echo test');
        es.on('control', function (data) {
            debug(data);
        });
        es.on('stderr', function (data) {
            debug(data);
        });
        es.on('stdout', function (data) {
            output = output + data;
        });

        es.run().then(function () {
            debug('process done');
            debug('output: ' + output);
            // wait for the last event
            setTimeout(function(){
                assert.equal(output, "test\n");
                done();
            }, 100);
            
        }).
        catch (function (code) {
            debug('this should not happen');
            done('exit with code: ' + code);
        });

    });

});