'use strict';

const utils = require( './utils.js' );

module.exports = {
	meta: {
		docs: {
			description: 'Disallows variable names which don\'t match `variablePattern` in settings (by default a `$`-prefix).'
		},
		schema: []
	},

	create: function ( context ) {
		function test( node, left, right ) {
			if (
				!utils.isjQuery( context, left ) &&
				utils.isjQuery( context, right )
			) {
				context.report( {
					node: node,
					message: 'jQuery collection names must match the variablePattern'
				} );
			}
		}

		return {
			AssignmentExpression: function ( node ) {
				test( node, node.left, node.right );
			},
			VariableDeclarator: function ( node ) {
				test( node, node.id, node.init );
			}
		};
	}
};