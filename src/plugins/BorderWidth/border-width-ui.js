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

/**
 * The default alignment UI plugin.
 *
 * It introduces the `'alignment:left'`, `'alignment:right'`, `'alignment:center'` and `'alignment:justify'` buttons
 * and the `'alignment'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BorderWidthUi extends Plugin {
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
			'': t( '0px' ),
			'1px': t( '1px' ),
			'2px': t( '2px' ),
			'3px': t( '3px' ),
			'4px': t( '4px' ),
			'5px': t( '5px' ),
			'10px': t( '10px' ),
		};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderWidthUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const t = editor.t;
		const options = editor.config.get( 'borderWidth.options' );

		options
			.filter( isSupported )
			.forEach( option => this._addButton( option ) );

		console.log( 'Border Width Initialized' );

		componentFactory.add( 'borderwidth', function( locale ) {
			const dropdownView = createDropdown( locale );
			console.log ( 'border-width is added to componentFactory' );
			// Add existing alignment buttons to dropdown's toolbar.
			const buttons = options.map( option => componentFactory.create( `borderwidth:${ option }` ) );
			addToolbarToDropdown( dropdownView, buttons );

			// Configure dropdown properties an behavior.
			dropdownView.buttonView.set( {
				label: t( 'Rahmenbreite' ),
				tooltip: true,
				withText: true
			} );

			dropdownView.toolbarView.isVertical = true;

			dropdownView.extendTemplate( {
				attributes: {
					class: 'ck-alignment-dropdown'
				}
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

		editor.ui.componentFactory.add( `borderwidth:${ option }`, locale => {
			const command = editor.commands.get( 'borderwidth' );
			const buttonView = new ButtonView( locale );

			// console.log( 'Button: ', option, icons.get( option ) );
			buttonView.set( {
				label: this.localizedOptionTitles[ option ],
				tooltip: true,
				withText: true
			} );

			// Bind button model to command.
			buttonView.bind( 'isEnabled' ).to( command );
			buttonView.bind( 'isOn' ).to( command, 'value', function( value ) {
				console.log( 'isOn', value, option, value === option ? 'true' : 'false' );
				return value == option;
			} );

			// Execute command.
			this.listenTo( buttonView, 'execute', () => {
				editor.execute( 'borderwidth', { value: option } );
				editor.editing.view.focus();
			} );

			return buttonView;
		} );
	}
}
