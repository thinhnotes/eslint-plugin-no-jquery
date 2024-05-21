'use strict';
const utils = require( '../utils.js' );
const rule = {
	// eslint-disable-next-line eslint-plugin/require-meta-type
	meta: {
		fixable: 'code',
		schema: [],
		messages: {
			avoidName: 'Prefer .on or .trigger to .click'
		}
	},
	create( context ) {
		return {
			'CallExpression:exit': function ( node ) {
				if ( node.callee.type === 'MemberExpression' && node.callee.property.name === 'click' ) {
					context.report( {
						node,
						messageId: 'avoidName',
						fixable: 'code',
						fix: function ( fixer ) {
							return utils.eventShorthandFixer( node, context, fixer, 'click' );
						}
					} );
				}
			}
		};
	}
};

module.exports = rule;
