import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import '../theme/DateTimeFormatView.css';

export default class AbstractDateTimeFormatView extends View {
	constructor( locale, editor ) {
		super( locale );
		this.set( 'dropdown1Value' );
		this.dropdownValues1 = [{ command: '', name: '-' }, { command: 'd', name: 'Tag einstellig' },
			{ command: 'dd', name: 'Tag zweistellig' }, { command: 'M', name: 'Monat einstellig' },
			{ command: 'MM', name: 'Monat zweistellig' }, { command: 'yy', name: 'Jahr zweistellig' },
			{ command: 'yyyy', name: 'Jahr vierstellig' }];
		this.dropdownValues2 = [ { command: '', name: '-' }, { command: ' ', name: 'Leerzeichen' },
			{ command: '.', name: '. Punkt' }, { command: '/', name: '/ Schrägstrich' },
			{ command: '-', name: '- Bindestrich' } ];
		this.dropdown1 = this._createDropDown( locale, editor, this.dropdownValues1, 'Option', 'dropdown1Value' );
		this.dropdown1.bind( 'value' ).to( this, 'dropdown1Value' );

		this.set( 'dropdown2Value' );
		this.dropdown2 = this._createDropDown( locale, editor, this.dropdownValues2, 'Option', 'dropdown2Value' );
		this.dropdown2.bind( 'value' ).to( this, 'dropdown2Value' );

		this.set( 'dropdown3Value' );
		this.dropdown3 = this._createDropDown( locale, editor, this.dropdownValues1, 'Option', 'dropdown3Value' );
		this.dropdown3.bind( 'value' ).to( this, 'dropdown3Value' );

		this.set( 'dropdown4Value' );
		this.dropdown4 = this._createDropDown( locale, editor, this.dropdownValues2, 'Option', 'dropdown4Value' );
		this.dropdown4.bind( 'value' ).to( this, 'dropdown4Value' );

		this.set( 'dropdown5Value' );
		this.dropdown5 = this._createDropDown( locale, editor, this.dropdownValues1, 'Option', 'dropdown5Value' );
		this.dropdown5.bind( 'value' ).to( this, 'dropdown5Value' );

		this.dropdownValues3 = [ { command: '', name: '-' }, { command: 'h', name: 'Stunde einstellig' },
			{ command: 'hh', name: 'Stunde zweistellig' }, { command: 'm', name: 'Minute einstellig' },
			{ command: 'mm', name: 'Minute zweistellig' }, { command: 's', name: 'Sekunde einstellig' },
			{ command: 'ss', name: 'Sekunde zweistellig' } ];
		this.set( 'dropdown6Value' );
		this.dropdown6 = this._createDropDown( locale, editor, this.dropdownValues3, 'Option', 'dropdown6Value' );
		this.dropdown6.bind( 'value' ).to( this, 'dropdown6Value' );

		this.dropdownValues4 = [ { command: '', name: '-' }, { command: ' ', name: 'Leerzeichen' },
			{ command: '.', name: '. Punkt' }, { command: ':', name: ': Doppepunkt' }, { command: '/', name: '/ Schrägstrich' },
			{ command: '-', name: '- Bindestrich' } ];
		this.set( 'dropdown7Value' );
		this.dropdown7 = this._createDropDown( locale, editor, this.dropdownValues4, 'Option', 'dropdown7Value' );
		this.dropdown7.bind( 'value' ).to( this, 'dropdown7Value' );

		this.set( 'dropdown8Value' );
		this.dropdown8 = this._createDropDown( locale, editor, this.dropdownValues3, 'Option', 'dropdown8Value' );
		this.dropdown8.bind( 'value' ).to( this, 'dropdown8Value' );

		this.set( 'dropdown9Value' );
		this.dropdown9 = this._createDropDown( locale, editor, this.dropdownValues4, 'Option', 'dropdown9Value' );
		this.dropdown9.bind( 'value' ).to( this, 'dropdown9Value' );

		this.set( 'dropdown10Value' );
		this.dropdown10 = this._createDropDown( locale, editor, this.dropdownValues3, 'Option', 'dropdown10Value' );
		this.dropdown10.bind( 'value' ).to( this, 'dropdown10Value' );

		this.submitButton = new ButtonView( locale );
		this.submitButton.set( {
			label: 'Übernehmen',
			icon: checkIcon,
			keystroke: 'Ctrl+B',
			tooltip: true
		} );
		this.submitButton.extendTemplate( {
			attributes: {
				class: 'ck-button-save'
			}
		} );
		this.submitButton.on( 'execute', function( event ) {
			let error = false;

			if ( !error ) {
				var format = this.createFormat();
				console.log( 'Format: ', format );
				editor.execute( 'placeholder2-format', { value: format } );
				this.fire( 'closeActionsView' );
			}

		}.bind( this ) );
	}

	_createDropDown( locale, editor, items, label, commandName ) {
		const dropdownView = createDropdown( locale );

		// Populate the list in the dropdown with items.
		addListToDropdown( dropdownView, this.getDropdownItemsDefinitions( items, commandName ) );

		dropdownView.buttonView.set( {
			// The t() function helps localize the editor. All strings enclosed in t() can be
			// translated and change when the language of the editor changes.
			label: editor.t( label ),
			tooltip: true,
			withText: true
		} );

		// Execute command when an item from the dropdown is selected.
		this.listenTo( dropdownView, 'execute', function( evt ) {
			this[evt.source.commandName] = evt.source.commandParam;
			const dropdownName = evt.source.commandName.replace('Value', '');
			this[ dropdownName ].buttonView.label = evt.source.label;
			console.log( dropdownName, this[ dropdownName ].label, this[ dropdownName ]);
			editor.editing.view.focus();
		}.bind( this ) );

		return dropdownView;
	}

	createFormat() {
		let format = '';

		if ( this.dropdown1Value )
			format += this.dropdown1Value;

		if ( this.dropdown2Value )
			format += this.dropdown2Value;

		if ( this.dropdown3Value )
			format += this.dropdown3Value;

		if ( this.dropdown4Value )
			format += this.dropdown4Value;

		if ( this.dropdown5Value )
			format += this.dropdown5Value;

		format += ' ';
		if ( this.dropdown6Value )
			format += this.dropdown6Value;

		if ( this.dropdown7Value )
			format += this.dropdown7Value;

		if ( this.dropdown8Value )
			format += this.dropdown8Value;

		if ( this.dropdown9Value )
			format += this.dropdown9Value;

		if ( this.dropdown10Value )
			format += this.dropdown10Value;

		format = format.trim();

		return format;
	}

	getDropdownItemsDefinitions( items, _commandName ) {
		const itemDefinitions = new Collection();

		for ( const item of items ) {
			const definition = {
				type: 'button',
				model: new Model( {
					commandName: _commandName,
					commandParam: item.command,
					label: item.name,
					withText: true
				} )
			};

			definition.model.bind( 'isOn' ).to( this, _commandName, value => value === item.command );

			// Add the item definition to the collection.
			itemDefinitions.add( definition );
		}
		return itemDefinitions;
	}

	onOpen( placeholderElement ) {
		if ( placeholderElement._children.length > 1 ) {
			const format = placeholderElement._children[1]._children[0].data.replace( ' (', '' ).replace( '(', '' ).replace( ')', '' );
			const __ret = this.parseFormat( format );
			this.dropdown1.buttonView.fire( 'change:value', null, this.dropdown1Value );
			this.changeLabel( this.dropdown1Value, 'dropdown1' );

			this.dropdown2.buttonView.fire( 'change:value', null, this.dropdown2Value );
			this.changeLabel( this.dropdown2Value, 'dropdown2' );

			this.dropdown3.buttonView.fire( 'change:value', null, this.dropdown3Value );
			this.changeLabel( this.dropdown3Value, 'dropdown3' );

			this.dropdown4.buttonView.fire( 'change:value', null, this.dropdown4Value );
			this.changeLabel( this.dropdown4Value, 'dropdown4' );

			this.dropdown5.buttonView.fire( 'change:value', null, this.dropdown5Value );
			this.changeLabel( this.dropdown5Value, 'dropdown5' );

			this.dropdown6.buttonView.fire( 'change:value', null, this.dropdown6Value );
			this.changeLabel( this.dropdown6Value, 'dropdown6' );

			this.dropdown7.buttonView.fire( 'change:value', null, this.dropdown7Value );
			this.changeLabel( this.dropdown7Value, 'dropdown7' );

			this.dropdown8.buttonView.fire( 'change:value', null, this.dropdown8Value );
			this.changeLabel( this.dropdown8Value, 'dropdown8' );

			this.dropdown9.buttonView.fire( 'change:value', null, this.dropdown9Value );
			this.changeLabel( this.dropdown9Value, 'dropdown9' );

			this.dropdown10.buttonView.fire( 'change:value', null, this.dropdown10Value );
			this.changeLabel( this.dropdown10Value, 'dropdown10' );

			console.log( format );
		}
	}

	changeLabel( value, name ) {
		if ( value )
		{
			const index = parseInt( name.replace( 'dropdown', '' ) );
			console.log( index );
			let values;
			if ( index == 1 || index == 3 || index == 5 )
				values = this.dropdownValues1;
			if ( index == 2 || index == 4 )
				values = this.dropdownValues2;
			if ( index == 6 || index == 8 || index == 10 )
				values = this.dropdownValues3;
			if ( index == 7 || index == 9 )
				values = this.dropdownValues4;
			for ( let i = 0; i < values.length; i++ ) {
				if ( values[ i ].command == value ) {
					this[ name ].buttonView.label = values[ i ].name;
					return;
				}
			}
		}
		this[ name ].buttonView.label = 'Option';
	}
	parseFormat( format ) {
		let lastChars = '';
		let currentChar = null;
		let values = [];
		for ( let i = 0; i < format.length; i++ ) {
			currentChar = format.substr( i, 1 );
			if (currentChar == ' ' || currentChar == '.' || currentChar == ':' || currentChar == '/' || currentChar == '-')
			{
				values[ values.length ] = lastChars;
				values[ values.length ] = currentChar;
				lastChars = '';
			}
			else
				lastChars += currentChar;
		}
		if ( lastChars != '' )
			values[ values.length ] = lastChars;

		this.dropdown1Value = null;
		this.dropdown2Value = null;
		this.dropdown3Value = null;
		this.dropdown4Value = null;
		this.dropdown5Value = null;
		this.dropdown6Value = null;
		this.dropdown7Value = null;
		this.dropdown8Value = null;
		this.dropdown9Value = null;
		this.dropdown10Value = null;
		let i = 0;
		for ( ; i < values.length; i += 2 ) {
			if ( values[ i ].indexOf( 'd' ) > -1 || values[ i ].indexOf( 'M' ) > -1 || values[ i ].indexOf( 'y' ) > -1 ) {
				this[ 'dropdown' + ( i + 1 ) + 'Value' ] = values[ i ];
				if ( values.length > i + 1 && ( values[ i + 1 ].indexOf( '.' ) > -1 || values[ i + 1 ].indexOf( ' ' ) > -1 ||
					values[ i + 1 ].indexOf( '/' ) > -1 || values[ i + 1 ].indexOf( '-' ) > -1 ) ) {
					this[ 'dropdown' + ( i + 2 ) + 'Value' ] = values[ i + 1 ];
				}
			}
			if ( values[ i ].indexOf( 'h' ) > -1 || values[ i ].indexOf( 'm' ) > -1 || values[ i ].indexOf( 's' ) > -1 ) {
				i = 5;
				this[ 'dropdown' + ( i + 1 ) + 'Value' ] = values[ i ];
				if ( values.length > i + 1 && ( values[ i + 1 ].indexOf( '.' ) > -1 || values[ i + 1 ].indexOf( ' ' ) > -1 ||
					values[ i + 1 ].indexOf( '/' ) > -1 || values[ i + 1 ].indexOf( '-' ) > -1 ) ) {
					this[ 'dropdown' + ( i + 2 ) + 'Value' ] = values[ i + 1 ];
				}
			}
		}
		console.log( values );
	}
}
