import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Placeholder2Command extends Command {
	execute( { value } ) {
		const editor = this.editor;
		console.log( 'Value: ', value );
		editor.model.change( writer => {
			// Create a <placeholder> elment with the "name" attribute...
			const placeholder = writer.createElement( 'placeholder2', { name: value.key, type: value.type } );
			writer.appendText( value.name, placeholder );
			console.log( 'PlaceholderElement: ', placeholder );
			// placeholder.setAttribute('key', value.key);
			// ... and insert it into the document.
			editor.model.insertContent( placeholder );

			// Put the selection on the inserted element.
			writer.setSelection( placeholder, 'on' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'placeholder2' );

		this.isEnabled = isAllowed;
	}
}
