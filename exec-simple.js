'use strict';

// todo create a seperate nodejs project

// catch error
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    exec = require('child_process').exec,
    Promise = require('bluebird');

/**
 * Promise based execution of processes. After the execution it return either resolve or reject with the exit code
 * @param: 
 */
var ExecSimple = function (execpath, options) {
    this.execpath = execpath;
    this.options = options || {};
};

util.inherits(ExecSimple, EventEmitter);

ExecSimple.prototype.stdout = function (data) {
    this.emit('stdout', data);
};

ExecSimple.prototype.stderr = function (data) {
    this.emit('stderr', data);
};

ExecSimple.prototype.control = function (data) {
    this.emit('control', data);
};

ExecSimple.prototype.run = function () {
    var self = this;
    return new Promise(function (resolve, reject) {

        self.control('start execution');

        var child = exec(self.execpath, self.options);

        child.stdout.on('data', function (data) {
            self.stdout(data);
        });

        child.stderr.on('data', function (data) {
            self.stderr(data);
        });

        child.on('exit', function (code, signal) {
            self.control('exit with: ' + code);

            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });

    });
};

module.exports = ExecSimple;