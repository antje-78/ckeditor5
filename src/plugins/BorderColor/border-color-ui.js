import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui';

export default class BorderColorUi extends ColorUI {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		const t = editor.locale.t;

		super( editor, {
			commandName: 'borderColor',
			componentName: 'borderColor',
			dropdownLabel: t( 'Rahmenfarbe' )
		} );
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderColorUI';
	}
}
