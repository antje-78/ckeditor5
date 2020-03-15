import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderColorEditing from './border-color-editing';
import BorderColorUi from './border-color-ui';

export default class BorderColor extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ BorderColorEditing, BorderColorUi ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderColor';
	}
}
