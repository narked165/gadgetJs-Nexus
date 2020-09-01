const assert = require('assert'), fs = require('fs')

exports.traceVariable = function(vname, vrb, type) {
    console.debug(`\n\t->Testing, ${ vname } is defined in the current scope.`)
    assert(typeof(vrb) !== 'undefined', `Expect: ${ vname } to be defined. Received: ${ typeof vrb }`)
    console.debug(`\t\t-> Testing, ${ vname } is defined, as the Type: ${ type }, in the current scope.`)
    assert(typeof(vrb) === type, `Expect: ${ vname } to be TYPE: ${ type }; Recieved ${ typeof vrb }\n`)
    console.info(`\t\t\t[DEBUG-TEST] :: traceVariable :: ACTUAL: ${ vrb } %type ${ typeof vrb }\np `)
}

exports.tracePath = function(name, filepath) {
    console.debug('Testing: Path value ${ name } is rendered correctly as a text-path-string.')
    assert(typeof(filepath) !== 'undefined' && typeof(filepath) === 'string', `Expect: filepath to be string; Received: ${ typeof filepath }.`)
    console.debug('Testing filepath: ${ filepath }, map to a file.')
    assert(fs.existsSync(filepath), `Expect FilePath: ${ filepath }, to map to a real file.`)
    console.info(`\t\t\t -> [DEBUG-TEST] :: filepath :: ACTUAL: ${ name }:  -> ${ filepath }`)
}




