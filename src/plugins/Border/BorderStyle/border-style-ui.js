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
import BorderWidthIcon from './theme/icons/border-width.svg';

import { isSupported } from './utils';

/**
 * The default alignment UI plugin.
 *
 * It introduces the `'alignment:left'`, `'alignment:right'`, `'alignment:center'` and `'alignment:justify'` buttons
 * and the `'alignment'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BorderStyleUi extends Plugin {
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
			'solid': t('Durchgezogene Linie'),
			'dashed': t('Gestrichelt'),
			'double': t('Doppelt'),
			'dotted': t('Gepunkted'),
			'inset': t('3D Effekt eingelassen'),
			'outset': t('3D Effekt geprägt')
		};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderStyleUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const t = editor.t;
		const options = editor.config.get( 'borderStyle.options' );

		options
			.filter( isSupported )
			.forEach( option => this._addButton( option ) );

		console.log( 'Border Width Initialized' );

		componentFactory.add( 'borderstyle', function( locale ) {
			const dropdownView = createDropdown( locale );
			console.log ( 'border-style is added to componentFactory' );
			// Add existing alignment buttons to dropdown's toolbar.
			const buttons = options.map( option => componentFactory.create( `borderstyle:${ option }` ) );
			addToolbarToDropdown( dropdownView, buttons );

			// Configure dropdown properties an behavior.
			dropdownView.buttonView.set( {
				icon: BorderWidthIcon,
				label: t( 'Rahmenart' ),
				tooltip: true
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

		editor.ui.componentFactory.add( `borderstyle:${ option }`, locale => {
			const command = editor.commands.get( 'borderstyle' );
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
				editor.execute( 'borderstyle', { value: option } );
				editor.editing.view.focus();
			} );

			return buttonView;
		} );
	}
}
