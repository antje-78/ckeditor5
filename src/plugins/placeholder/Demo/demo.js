import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { addToolbarToDropdown, addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class Demo extends Plugin {
	init() {
		console.log("Demo Plugin initialized.");

		const editor = this.editor;
		const t = editor.t;

		const buttons = [];

		// Add a simple button to the array of toolbar items.
		buttons.push( new ButtonView() );

		// The "placeholder" dropdown must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'demo', locale => {
			// The default dropdown.
			const dropdownView = createDropdown( locale );

			// Create a dropdown with a toolbar inside the panel.
			addToolbarToDropdown( dropdownView, buttons );

			dropdownView.buttonView.set( {
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t( 'Demo' ),
				tooltip: true,
				withText: true
			} );

			// // Execute the command when the dropdown item is clicked (executed).
			// this.listenTo( dropdownView, 'execute', evt => {
			// 	editor.execute( 'placeholder', { value: evt.source.commandParam } );
			// 	editor.editing.view.focus();
			// } );

			return dropdownView;
		} );
	}
}
