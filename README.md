# ExecSimple

[![build status](https://secure.travis-ci.org/chris-rock/exec-simple.png)](http://travis-ci.org/chris-rock/exec-simple)

A simple command runner in nodejs. This is a port of [exec-simple for ruby](https://github.com/arlimus/exec-simple) for nodejs.

## Usage

A simple execution:

    var ExecSimple = require('exec-simple');
    var es = new ExecSimple('echo test');
    es.run().then(function (code) {
        console.log('done');
    });

Handle timeouts:

    var es = new ExecSimple('echo "Sleep... wait for it"; sleep 100; echo "DARY"');
    es.run().timeout(50).then(function (code) {
        console.log('done');
    }).catch (function (code) {
        console.log('process took too long');
    });

Recieve `stdout` and `stderr` events

    var es = new ExecSimple('echo test');
    es.on('control', function (data) {
        console.log(data);
    });
    es.on('stderr', function (data) {
        console.log(data);
    });
    es.on('stdout', function (data) {
        console.log(data);
    });

    es.run()


## Installation

    npm install exec-simple

## Contributing

1. Fork it ( http://github.com/chris-rock/exec-simple/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Author

- Christoph Hartmann <chris@lollyrock.com>

## License

MIT
