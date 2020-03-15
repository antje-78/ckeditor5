import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import plainTextToHtml from '@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml';

export default class ClipboardButtons extends Plugin {
	init() {
		const editor = this.editor;

		console.log( 'ClipboardButtons#init() got called' );
		addButton( 'copy', 'Copy' );
		addButton( 'cut', 'Cut' );
		addButton( 'paste', 'Paste' );

		const clipboardPlugin = editor.plugins.get( 'Clipboard' );
		const editingView = editor.editing.view;

		editingView.document.on( 'clipboardInput', ( evt, data ) => {
			if ( editor.isReadOnly ) {
				return;
			}

			const dataTransfer = data.dataTransfer;

			let content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );

			content = clipboardPlugin._htmlDataProcessor.toView( content );

			clipboardPlugin.fire( 'inputTransformation', { content, dataTransfer } );

			editingView.scrollToTheSelection();

			evt.stop();
		} );

		function addButton( action, label ) {
			editor.ui.componentFactory.add( action, locale => {
				const view = new ButtonView( locale );

				view.set( {
					label: label,
					// Or use the 'icon' property.
					withText: true,
					tooltip: true
				} );

				view.on( 'execute', () => {
					document.execCommand( action );
				} );

				return view;
			} );
		}
	}
}
