'use strict';

const rule = require( '../../src/rules/no-is' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer Element#matches to .is';

const ruleTester = new RuleTester();
ruleTester.run( 'no-is', rule, {
	valid: [ 'is()', '[].is()', 'div.is()', 'div.is' ],
	invalid: [
		{
			code: '$("div").is()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.is()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").first().is()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").append($("input").is())',
			errors: [ { message: error, type: 'CallExpression' } ]
		}
	]
} );
