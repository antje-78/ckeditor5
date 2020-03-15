import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

import { isDefault } from './utils';
import {getSelectedBlocks} from "../utils";

const BORDER_FILL_COLOR = 'borderFillColor';

export default class BorderFillColorCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const selectedBlocks = getSelectedBlocks( this.editor );
		console.log( selectedBlocks );
		const firstBlock = selectedBlocks.length > 0 ? selectedBlocks[ 0 ] : null;

		// As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
		this.isEnabled = firstBlock && this._canBeFilled( this.editor, firstBlock );

		/**
		 * A value of the current block's alignment.
		 *
		 * @observable
		 * @readonly
		 * @member {String} #value
		 */
		if ( this.isEnabled && firstBlock && firstBlock.hasAttribute( BORDER_FILL_COLOR ) )
			this.value = firstBlock.getAttribute( BORDER_FILL_COLOR );
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

			let currentFillColor;
			if ( firstBlock && firstBlock.hasAttribute( BORDER_FILL_COLOR ) )
				currentFillColor = firstBlock.getAttribute( BORDER_FILL_COLOR );

			// Remove alignment attribute if current alignment is:
			// - default (should not be stored in model as it will bloat model data)
			// - equal to currently set
			// - or no value is passed - denotes default alignment.
			const removeAlignment = currentFillColor === value || !value;
			console.log( 'childBlocks / firstBlock', firstBlock, currentFillColor);
			if ( removeAlignment ) {
				removeFillColorFromSelection( selectedBlocks, writer );
			} else {
				setFillColorOnSelection( selectedBlocks, writer, value );
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
	_canBeFilled(editor, block ) {
		return editor.model.schema.checkAttribute( block, BORDER_FILL_COLOR );
	}
}

// Removes the alignment attribute from blocks.
// @private
function removeFillColorFromSelection( blocks, writer ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.removeAttribute( BORDER_FILL_COLOR, blocks[i] );
	}
}

// Sets the alignment attribute on blocks.
// @private
function setFillColorOnSelection( blocks, writer, border ) {
	for (var i = 0; i < blocks.length; i++) {
		writer.setAttribute( BORDER_FILL_COLOR, border, blocks[i] );
	}
}
