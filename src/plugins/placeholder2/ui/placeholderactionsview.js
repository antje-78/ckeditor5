import View from '@ckeditor/ckeditor5-ui/src/view';
import NumberFormatView from './NumberFormatView';
import '../theme/placeholderactionsview.css';
import DateTimeFormatView from './DateTimeFormatView';
import PlaceholderFormatCommand from './PlaceholderFormatCommand';
import DateFormatView from './DateFormatView';
import TimeFormatView from './TimeFormatView';

export default class PlaceholderActionsView extends View {
	constructor( locale, editor ) {
		super( locale );
		this.numberFormatView = new NumberFormatView( this.locale, editor );
		this.numberFormatView.delegate( 'closeActionsView' ).to( this );

		this.dateTimeFormatView = new DateTimeFormatView( this.locale, editor );
		this.dateTimeFormatView.delegate( 'closeActionsView' ).to( this );

		this.dateFormatView = new DateFormatView( this.locale, editor );
		this.dateFormatView.delegate( 'closeActionsView' ).to( this );

		this.timeFormatView = new TimeFormatView( this.locale, editor );
		this.timeFormatView.delegate( 'closeActionsView' ).to( this );

		editor.commands.add( 'placeholder2-format', new PlaceholderFormatCommand( editor ) );

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-placeholder-actions-container',
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				this.numberFormatView,
				this.dateTimeFormatView,
				this.dateFormatView,
				this.timeFormatView
			]
		} );
	}

	onOpen( placeholderElement ) {
		console.log( 'placeholder Element', placeholderElement, placeholderElement._attrs, placeholderElement._attrs.get( 'type' ));

		this.numberFormatView.isVisible = false;
		if ( placeholderElement._attrs.get( 'type' ).toLowerCase() == 'number' ) {
			this.numberFormatView.onOpen( placeholderElement );
			this.numberFormatView.isVisible = true;
		}

		this.dateTimeFormatView.isVisible = false;
		if ( placeholderElement._attrs.get( 'type' ).toLowerCase() == 'datetime' ) {
			this.dateTimeFormatView.onOpen( placeholderElement );
			this.dateTimeFormatView.isVisible = true;
		}

		this.dateFormatView.isVisible = false;
		if ( placeholderElement._attrs.get( 'type' ).toLowerCase() == 'date' ) {
			this.dateFormatView.onOpen( placeholderElement );
			this.dateFormatView.isVisible = true;
		}

		this.timeFormatView.isVisible = false;
		if ( placeholderElement._attrs.get( 'type' ).toLowerCase() == 'time' ) {
			this.timeFormatView.onOpen( placeholderElement );
			this.timeFormatView.isVisible = true;
		}
	}
}
