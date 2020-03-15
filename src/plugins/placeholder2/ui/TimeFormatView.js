import AbstractDateTimeFormatView from './AbstractDateTimeFormatView';

export default class TimeFormatView extends AbstractDateTimeFormatView {
	constructor( locale, editor ) {
		super( locale, editor );

		const bind = this.bindTemplate;
		this.set( 'isVisible', false );
		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-dateTimeFormatView-container',
					bind.if( 'isVisible', 'visible' )
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				this.dropdown6,
				this.dropdown7,
				this.dropdown8,
				this.dropdown9,
				this.dropdown10,

				this.submitButton
			]
		} );
	}
}
