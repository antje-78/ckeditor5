import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui';
import borderFillColorIcon from './theme/icons/border-fill-color.svg';

export default class BorderFillColorUi extends ColorUI {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor, {
			commandName: 'borderFillColor',
			icon: borderFillColorIcon,
			componentName: 'borderFillColor',
			dropdownLabel: editor.locale.t( 'Rahmenfüllfarbe' )
		} );
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderFillColorUI';
	}
}
