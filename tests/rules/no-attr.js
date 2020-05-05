'use strict';

const rule = require( '../../src/rules/no-attr' );
const RuleTesterAndDocs = require( '../../tools/rule-tester-and-docs' );

const getError = 'Prefer Element#getAttribute to .attr/$.attr';
const setError = 'Prefer Element#setAttribute to .attr/$.attr';
const removeError = 'Prefer Element#removeAttribute to .removeAttr/$.removeAttr';

const ruleTester = new RuleTesterAndDocs();
ruleTester.run( 'no-attr', rule, {
	valid: [ 'attr()', '[].attr()', 'div.attr()', 'div.attr', 'removeAttr()', 'div.removeAttr' ],
	invalid: [
		{
			code: '$.attr()',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").attr()',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$div.attr()',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").first().attr()',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").append($("input").attr())',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").attr("name")',
			errors: [ { message: getError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").attr("name", "random")',
			errors: [ { message: setError, type: 'CallExpression' } ]
		},
		{
			code: '$.removeAttr()',
			errors: [ { message: removeError, type: 'CallExpression' } ]
		},
		{
			code: '$("div").removeAttr("name")',
			errors: [ { message: removeError, type: 'CallExpression' } ]
		}
	]
} );