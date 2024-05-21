'use strict';
const utils = require( '../utils.js' );
const rule = {
	// eslint-disable-next-line eslint-plugin/require-meta-type
	meta: {
		fixable: 'code',
		schema: [],
		messages: {
			clickErrorMgs: 'Prefer .on or .trigger to .click'
		}
	},
	create( context ) {
		let isJqueryVar = false;
		return {
			'CallExpression:exit': function ( node ) {
				if ( !isJqueryVar ) {
					isJqueryVar = isJquery( node );
				}
				console.log( isJqueryVar );
				if ( isJqueryVar && node.callee.type === 'MemberExpression' && node.callee.property.name === 'click' ) {
					context.report( {
						node,
						messageId: 'clickErrorMgs',
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

function isJquery( node ) {
	while ( node.parent && node.callee ) {
		if ( node.callee && node.callee.name === '$' ) {
			return true;
		}
		node = node.parent;
	}

	return false;
}

module.exports = rule;
