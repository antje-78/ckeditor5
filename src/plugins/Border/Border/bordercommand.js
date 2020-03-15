/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';

import { getSelectedBlocks, canBeBordered } from '../utils';

const BORDER = 'border';

/**
 * The alignment command plugin.
 *
 * @extends module:core/command~Command
 */
export default class Bordercommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const selectedBlocks = getSelectedBlocks( this.editor );
		console.log( selectedBlocks );
		const firstBlock = selectedBlocks.length > 0 ? selectedBlocks[ 0 ] : null;

		// As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
		this.isEnabled = firstBlock && canBeBordered( this.editor, firstBlock );

		/**
		 * A value of the current block's alignment.
		 *
		 * @observable
		 * @readonly
		 * @member {String} #value
		 */
		if ( this.isEnabled && firstBlock && firstBlock.hasAttribute( 'border' ) )
			this.value = firstBlock.getAttribute( 'border' );
		else
			this.value = 'no-border';
	}

	/**
	 * Executes the command. Applies the alignment `value` to the selected blocks.
	 * If no `value` is passed, the `value` is the default one or it is equal to the currently selected block's alignment attribute,
	 * the command will remove the attribute from the selected blocks.
	 *
	 * @param {Object} [options] Options for the executed command.
	 * @param {String} [options.value] The value to apply.
	 * @fires execute
	 */
	execute( options = {} ) {
		const editor = this.editor;
		const model = editor.model;
		const doc = model.document;

		const value = options.value;

		model.change( writer => {
			const selectedBlocks = getSelectedBlocks( this.editor );

			console.log('selectedBlocks', selectedBlocks );

			if (selectedBlocks.length > 0 && selectedBlocks[ 0 ].getAttribute( BORDER ) == value )
				removeBorderFromSelection( selectedBlocks, writer );
			else
				setBorderOnSelection( selectedBlocks, writer, value );
		} );
	}
}

// Removes the alignment attribute from blocks.
// @private
function removeBorderFromSelection( blocks, writer ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.removeAttribute( BORDER, blocks[i] );
	}
}

// Sets the alignment attribute on blocks.
// @private
function setBorderOnSelection( blocks, writer, border ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.setAttribute( BORDER, border, blocks[i] );
	}
}
