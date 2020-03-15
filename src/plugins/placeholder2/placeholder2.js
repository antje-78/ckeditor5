// placeholder/placeholder.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import Placeholder2Editing from './placeholder2editing';
import Placeholder2UI from './placeholder2ui';

export default class Placeholder2 extends Plugin {
	static get requires() {
		return [ Placeholder2Editing, Placeholder2UI ];
	}
}
