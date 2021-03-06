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
		let childBlocks;
		if ( this.editor.model.document.selection.getSelectedElement() )
			childBlocks = this.getSelectedBlocks( this.editor.model.document, 'all-tablerow' );
		const firstBlock = this.editor.model.document.selection.getSelectedElement()
			? this.editor.model.document.selection.getSelectedElement()
			: first( this.editor.model.document.selection.getSelectedBlocks() );

		// As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
		this.isEnabled = !!firstBlock && this._canBeAligned( firstBlock );

		/**
		 * A value of the current block's alignment.
		 *
		 * @observable
		 * @readonly
		 * @member {String} #value
		 */
		if ( this.isEnabled && firstBlock.hasAttribute( 'border' ) )
			this.value = firstBlock.getAttribute( 'border' );
		else if ( this.isEnabled && childBlocks && childBlocks[ 0 ].hasAttribute( 'border' ) )
			this.value = childBlocks[ 0 ].getAttribute( 'border' );
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
			// Get only those blocks from selected that can have alignment set
			let blocks = this.getSelectedBlocks( doc, value );

			console.log( blocks );
			const currentAlignment = blocks[ 0 ].getAttribute( 'border' );

			// Remove alignment attribute if current alignment is:
			// - default (should not be stored in model as it will bloat model data)
			// - equal to currently set
			// - or no value is passed - denotes default alignment.
			const removeAlignment = isDefault( value ) || currentAlignment === value || !value;

			if ( removeAlignment ) {
				removeAlignmentFromSelection( blocks, writer );
			} else {
				setAlignmentOnSelection( blocks, writer, value );
			}
		} );
	}

	getSelectedBlocks( doc, value ) {
		let blocks;
		if ( doc.selection.getSelectedElement() == null )
			blocks = Array.from( doc.selection.getSelectedBlocks() ).filter( block => this._canBeAligned( block ) )
		else {
			blocks = [ doc.selection.getSelectedElement() ];
			if ( value.indexOf( 'tablerow' ) > -1 ) {
				var children = doc.selection.getSelectedElement().getChildren();
				console.log( 'Selected Element Children', children );
				var out = [];
				let _next = children.next();
				while ( !_next.done ) {
					console.log( _next );
					if ( _next.value.getChildren ) {
						const children2 = _next.value.getChildren();
						let _next2 = children2.next();
						while ( !_next2.done ) {
							console.log( _next2 );
							out[ out.length ] = _next2.value;
							_next2 = children2.next();
						}
					}
					else {
						out[ out.length ] = _next.value;
					}
					_next = children.next();
				}
				blocks = out;
			}
		}

		return blocks;
	}
	/**
	 * Checks whether a block can have alignment set.
	 *
	 * @private
	 * @param {module:engine/model/element~Element} block The block to be checked.
	 * @returns {Boolean}
	 */
	_canBeAligned( block ) {
		return this.editor.model.schema.checkAttribute( block, BORDER );
	}
}

// Removes the alignment attribute from blocks.
// @private
function removeAlignmentFromSelection( blocks, writer ) {
	for ( const block of blocks ) {
		writer.removeAttribute( BORDER, block );
	}
}

// Sets the alignment attribute on blocks.
// @private
function setAlignmentOnSelection( blocks, writer, border ) {
	for ( const block of blocks ) {
		writer.setAttribute( BORDER, border, block );
	}
}
