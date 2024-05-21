'use strict';

const rule = require( '../../src/rules/no-event-shorthand-click' );
const RuleTester = require( '../../tools/rule-tester' );
const error = 'Prefer .on or .trigger to .click';

const ruleTester = new RuleTester();

ruleTester.run( 'no-event-shorthand-click', rule, {
	valid: [ ],
	invalid: [
		{
			code: '$("div")[0].click()',
			errors: [ error ],
			output: '$("div")[0].trigger("click")',
			docgen: false
		},
		{
			code: 'var fileUploadButton = $("#demo"); fileUploadButton.click()',
			errors: [ error ],
			output: 'var fileUploadButton = $("#demo"); fileUploadButton.trigger("click")',
			docgen: false
		},
		{
			code: '$(".popupImage:last")[0].click()',
			errors: [ error ],
			output: '$(".popupImage:last")[0].trigger("click")',
			docgen: false
		}
	]
} );
