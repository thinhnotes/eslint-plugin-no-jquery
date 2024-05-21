'use strict';

const rule = require( '../../src/rules/no-event-shorthand-click' );
const RuleTester = require( '../../tools/rule-tester' );
const error = 'Prefer .on or .trigger to .click';

const ruleTester = new RuleTester();

ruleTester.run( 'no-event-shorthand-click', rule, {
	valid: [
		'div123.click()',
		'div123.click(function() {alert(1);})'
	],
	invalid: [
		{
			code: '$("div")[0].click()',
			errors: [ error ],
			output: '$("div")[0].trigger("click")',
			docgen: false
		},
		{
			code: 'var fileUploadButton = $("#demo"); var demo2=""; var demo3="12312"; fileUploadButton.click()',
			errors: [ error ],
			output: 'var fileUploadButton = $("#demo"); var demo2=""; var demo3="12312"; fileUploadButton.trigger("click")',
			docgen: false
		},
		{
			code: '$(".popupImage:last")[0].click()',
			errors: [ error ],
			output: '$(".popupImage:last")[0].trigger("click")',
			docgen: false
		},
		{
			code: '$("#div123").click(function() {alert(1);})',
			errors: [ error ],
			output: '$("#div123").on("click", function() {alert(1);})',
			docgen: false
		}
	]
} );
