import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderFillColorEditing from './border-fill-color-editing';
import BorderFillColorUi from './border-fill-color-ui';

export default class BorderFillColor extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ BorderFillColorEditing, BorderFillColorUi ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderFillColor';
	}
}
