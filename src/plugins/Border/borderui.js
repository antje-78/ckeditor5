/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import { isSupported } from './utils';

import borderIcon from './theme/icons/border-all.svg';
import borderTopIcon from './theme/icons/border-top.svg';
import borderBottomIcon from './theme/icons/border-bottom.svg';
import borderLeftIcon from './theme/icons/border-left.svg';
import borderRightIcon from './theme/icons/border-right.svg';
import borderNoneIcon from './theme/icons/border-none.svg';
import borderAllTablerowIcon from './theme/icons/border-all-tablerow.svg';
import borderRightTablerow from './theme/icons/border-right-tablerow.svg';

const icons = new Map( [
	[ 'no-border', borderNoneIcon ],
	[ 'all', borderIcon ],
	[ 'left', borderLeftIcon ],
	[ 'right', borderRightIcon ],
	[ 'top', borderTopIcon ],
	[ 'bottom', borderBottomIcon ],
	[ 'all-tablerow', borderAllTablerowIcon ],
	[ 'right-tablerow', borderRightTablerow ]
] );

/**
 * The default alignment UI plugin.
 *
 * It introduces the `'alignment:left'`, `'alignment:right'`, `'alignment:center'` and `'alignment:justify'` buttons
 * and the `'alignment'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Borderui extends Plugin {
	/**
	 * Returns the localized option titles provided by the plugin.
	 *
	 * The following localized titles corresponding with
	 * {@link module:alignment/alignment~AlignmentConfig#options} are available:
	 *
	 * * `'left'`,
	 * * `'right'`,
	 * * `'center'`,
	 * * `'justify'`.
	 *
	 * @readonly
	 * @type {Object.<String,String>}
	 */
	get localizedOptionTitles() {
		const t = this.editor.t;

		return {
			'no-border': t( 'Kein Rahmen' ),
			'all': t( 'Rahmen aussen' ),
			'left': t( 'Rahmen links' ),
			'right': t( 'Rahmen rechts' ),
			'top': t( 'Rahmen oben' ),
			'bottom': t( 'Rahmen unten' ),
			'all-tablerow': t( 'Rahmen Tabellenzelle alles' ),
			'left-tablerow': t( 'Rahmen Tabellenzelle links' ),
			'right-tablerow': t( 'Rahmen Tabellenzelle rechts' ),
			'top-tablerow': t( 'Rahmen Tabellenzeile oben' ),
			'bottom-tablerow': t( 'Rahmen Tabellenzeile unten' )
		};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const t = editor.t;
		const options = editor.config.get( 'border.options' );

		options
			.filter( isSupported )
			.forEach( option => this._addButton( option ) );

		componentFactory.add( 'border', locale => {
			const dropdownView = createDropdown( locale );

			console.log ( 'border is added to componentFactory' );

			// Add existing alignment buttons to dropdown's toolbar.
			const buttons = options.map( option => componentFactory.create( `border:${ option }` ) );
			addToolbarToDropdown( dropdownView, buttons );

			// Configure dropdown properties an behavior.
			dropdownView.buttonView.set( {
				label: t( 'Rahmen' ),
				icon: 'border-all',
				tooltip: true,
				withText: true
			} );

			dropdownView.toolbarView.isVertical = true;

			dropdownView.extendTemplate( {
				attributes: {
					class: 'ck-alignment-dropdown'
				}
			} );

			// The default icon is align left as we do not support RTL yet (see #3).
			const defaultIcon = borderNoneIcon;

			// Change icon to reflect current selection's alignment.
			dropdownView.buttonView.bind( 'icon' ).toMany( buttons, 'isOn', ( ...areActive ) => {
				// Get the index of an active button.
				const index = areActive.findIndex( value => value );

				// If none of the commands is active, display either defaultIcon or the first button's icon.
				if ( index < 0 ) {
					return defaultIcon;
				}

				// Return active button's icon.
				return buttons[ index ].icon;
			} );

			// Enable button if any of the buttons is enabled.
			dropdownView.bind( 'isEnabled' ).toMany( buttons, 'isEnabled', ( ...areEnabled ) => areEnabled.some( isEnabled => isEnabled ) );

			return dropdownView;
		} );
	}

	/**
	 * Helper method for initializing the button and linking it with an appropriate command.
	 *
	 * @private
	 * @param {String} option The name of the alignment option for which the button is added.
	 */
	_addButton( option ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( `border:${ option }`, locale => {
			const command = editor.commands.get( 'border' );
			const buttonView = new ButtonView( locale );

			// console.log( 'Button: ', option, icons.get( option ) );
			buttonView.set( {
				label: this.localizedOptionTitles[ option ],
				icon: icons.get( option ),
				tooltip: true,
				withText: true
			} );

			// Bind button model to command.
			buttonView.bind( 'isEnabled' ).to( command );
			buttonView.bind( 'isOn' ).to( command, 'value', function( value ) {
				// console.log( 'isOn', value, option, value === option ? 'true' : 'false' );
				return value == option;
			} );

			// Execute command.
			this.listenTo( buttonView, 'execute', () => {
				editor.execute( 'border', { value: option } );
				editor.editing.view.focus();
			} );

			return buttonView;
		} );
	}
}
