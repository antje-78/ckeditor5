/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

import { isDefault } from './utils';
import {getSelectedBlocks} from "../utils";

const BORDER_WIDTH = 'borderWidth';

/**
 * The alignment command plugin.
 *
 * @extends module:core/command~Command
 */
export default class BorderWidthCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const selectedBlocks = getSelectedBlocks( this.editor );
		console.log( selectedBlocks );
		const firstBlock = selectedBlocks.length > 0 ? selectedBlocks[ 0 ] : null;

		// As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
		this.isEnabled = firstBlock && this._canBeAligned( firstBlock );

		/**
		 * A value of the current block's alignment.
		 *
		 * @observable
		 * @readonly
		 * @member {String} #value
		 */
		if ( this.isEnabled && firstBlock.hasAttribute( BORDER_WIDTH ) )
			this.value = firstBlock.getAttribute( BORDER_WIDTH );
		else
			this.value = '';
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
			console.log( selectedBlocks );
			const firstBlock = selectedBlocks.length > 0 ? selectedBlocks[ 0 ] : null;

			let currentAlignment;
			if ( firstBlock.hasAttribute( BORDER_WIDTH ) )
				currentAlignment = firstBlock.getAttribute( BORDER_WIDTH );

			// Remove alignment attribute if current alignment is:
			// - default (should not be stored in model as it will bloat model data)
			// - equal to currently set
			// - or no value is passed - denotes default alignment.
			const removeAlignment = isDefault( value ) || currentAlignment === value || !value;
			console.log( 'childBlocks / firstBlock', firstBlock, currentAlignment);

			if ( removeAlignment ) {
				removeAlignmentFromSelection( selectedBlocks, writer );
			} else {
				setAlignmentOnSelection( selectedBlocks, writer, value );
			}
		} );
	}

	/**
	 * Checks whether a block can have alignment set.
	 *
	 * @private
	 * @param {module:engine/model/element~Element} block The block to be checked.
	 * @returns {Boolean}
	 */
	_canBeAligned( block ) {
		return this.editor.model.schema.checkAttribute( block, BORDER_WIDTH );
	}
}

// Removes the alignment attribute from blocks.
// @private
function removeAlignmentFromSelection( blocks, writer ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.removeAttribute( BORDER_WIDTH, blocks[i] );
	}
}

// Sets the alignment attribute on blocks.
// @private
function setAlignmentOnSelection( blocks, writer, border ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.setAttribute( BORDER_WIDTH, border, blocks[i] );
	}
}
