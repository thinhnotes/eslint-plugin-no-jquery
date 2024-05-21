'use strict';
const utils = require( '../utils.js' );

const ajaxEvents = [
	'ajaxComplete',
	'ajaxError',
	'ajaxSend',
	'ajaxStart',
	'ajaxStop',
	'ajaxSuccess'
];

const events = [
	// Browser
	'error',
	// Can't disallow 'load' as it conflicts with Ajax load.
	// Use no-load-shorthand rule instead.
	// TODO: Share the logic of no-load-shorthand with this rule.
	'resize',
	'scroll',
	'unload',
	// Form
	'blur',
	'change',
	'focus',
	'focusin',
	'focusout',
	'select',
	'submit',
	// Keyboard
	'keydown',
	'keypress',
	'keyup',
	// Mouse
	'click',
	'contextmenu',
	'dblclick',
	'hover',
	'mousedown',
	'mouseenter',
	'mouseleave',
	'mousemove',
	'mouseout',
	'mouseover',
	'mouseup'
].concat( ajaxEvents );

const rule = {
	// eslint-disable-next-line eslint-plugin/require-meta-type
	meta: {
		fixable: 'code',
		schema: [],
		messages: {
			clickErrorMgs: 'Prefer .on or .trigger to .{{event}}'
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
				if ( isJqueryVar && node.callee.type === 'MemberExpression' && events.includes( node.callee.property.name ) ) {
					context.report( {
						node,
						messageId: 'clickErrorMgs',
						fixable: 'code',
						data: {
							event: node.callee.property.name
						},
						fix: function ( fixer ) {
							// eslint-disable-next-line max-len
							return utils.eventShorthandFixer( node, context, fixer, node.callee.property.name );
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
