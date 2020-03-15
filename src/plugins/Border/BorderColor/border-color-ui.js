import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui';
import borderColorIcon from './theme/icons/border-color.svg';

export default class BorderColorUi extends ColorUI {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor, {
			commandName: 'borderColor',
			icon: borderColorIcon,
			componentName: 'borderColor',
			dropdownLabel: editor.locale.t( 'Rahmenfarbe' )
		} );
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderColorUI';
	}
}
