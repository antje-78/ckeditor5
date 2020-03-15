/**
 * @module border/utils
 */
export function getSelectedBlocks( editor ) {
	let blocks;
	const doc = editor.model.document;
	if ( doc.selection.getSelectedElement() == null )
		blocks = Array.from( doc.selection.getSelectedBlocks() ).filter( block => canBeBordered( editor, block ) ).slice(0, doc.selection.getSelectedBlocks().length)
	else
		blocks = [ doc.selection.getSelectedElement() ];

	return blocks;
}

export const BORDER = 'border';

export function canBeBordered( editor, block ) {
	return editor.model.schema.checkAttribute( block, BORDER );
}
