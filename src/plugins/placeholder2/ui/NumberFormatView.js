import View from '@ckeditor/ckeditor5-ui/src/view';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';
import '../theme/NumberFormatView.css';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';

export default class NumberFormatView extends View {
	constructor( locale, editor ) {
		super( locale );

		this._numberInput1 = this._createInput( locale, 'number', 'Mindestens Stellen vor dem Komma', 'numberInput1Value' );
		this._numberInput1.on( 'change:value', function( event ) {
			console.log( event );
		});
		this._numberInput1.value = 1;

		this._numberInput2 = this._createInput( locale, 'number', 'Stellen nach dem Komma', 'numberInput2Value' );
		this._numberInput2.value = 0;

		this._textInput1 = this._createInput( locale, 'text', 'Tausendertrennzeichen', 'textInput1Value' );
		this._textInput1.value = '.';

		this._textInput2 = this._createInput( locale, 'text', 'Dezimaltrennzeichen', 'textInput2Value' );
		this._textInput2.value = ',';

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
			console.log( event, this._numberInput1.inputView.element.value );
			let error = false;
			if ( isNaN( parseInt( this._numberInput1.inputView.element.value ) ) ) {
				this._numberInput1.errorText = 'Ungültige Zahl';
				error = true;
			}

			if ( isNaN( parseInt(this._numberInput2.inputView.element.value) ) ) {
				this._numberInput2.errorText = 'Ungültige Zahl';
				error = true;
			}

			if ( !error ) {
				// #.##0,00
				var format = this.createFormat();
				console.log( 'Format: ', format );
				editor.execute( 'placeholder2-format', { value: format });
				this.fire( 'closeActionsView' );
			}

		}.bind( this ) );

		const bind = this.bindTemplate;
		this.set( 'isVisible', false );
		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-numberFormatView-container',
					bind.if( 'isVisible', 'visible' )
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				this._numberInput1,
				this._numberInput2,
				this._textInput1,
				this._textInput2,
				this.submitButton
			]
		} );
	}

	createFormat() {
		var format = '';
		if (this._numberInput1.inputView.element.value > 3) {
			format += this._textInput1.inputView.element.value + '000';
			let i = this._numberInput1.inputView.element.value - 3;
			for (i > 0; i--;) {
				format = '0' + format;
			}
			format = '#' + format;
		} else {
			let i = this._numberInput1.inputView.element.value;
			for (i > 0; i--;) {
				format = '0' + format;
			}
			i = 3 - this._numberInput1.inputView.element.value;
			for (i > 1; i--;) {
				format = '#' + format;
			}
			format = '#' + this._textInput1.inputView.element.value + format;
		}
		if (this._numberInput2.inputView.element.value >= 1) {
			format += this._textInput2.inputView.element.value;
			let i = this._numberInput2.inputView.element.value;
			for (i > 0; i--;) {
				format += '0';
			}
		}
		return format;
	}

	_createInput( locale, inputType, label, bindValueProp ) {
		const bind = this.bindTemplate;

		const numberInput = new LabeledInputView( locale, InputTextView );
		numberInput.inputView.setTemplate( {
			tag: 'input',
			attributes: {
				type: inputType,
				class: [
					'ck',
					'ck-input',
					'ck-input-text',
					bind.if( 'hasError', 'ck-error' )
				],
				id: bind.to( 'id' ),
				placeholder: bind.to( 'placeholder' ),
				readonly: bind.to( 'isReadOnly' ),
				'aria-invalid': bind.if( 'hasError', true ),
				'aria-describedby': bind.to( 'ariaDescribedById' )
			},
			on: {
				input: bind.to( 'input' )
			}
		} );
		numberInput.label = label;

		return numberInput;
	}

	onOpen( placeholderElement ) {
		let numberInput1Value = 1;
		let numberInput2Value = 0;
		let textInput1Value = '.';
		let textInput2Value = ',';
		if ( placeholderElement._children.length > 1 ) {
			const format = placeholderElement._children[1]._children[0].data.replace(' (', '').replace('(', '').replace(')', '');
			const __ret = this.parseFormat( format );
			numberInput1Value = __ret.numberInput1Value;
			textInput1Value = __ret.textInput1Value;
			textInput2Value = __ret.textInput2Value;
			numberInput2Value = __ret.numberInput2Value;
			console.log( format );
		}

		this._numberInput1.inputView.fire( 'change:value', null, numberInput1Value );
		this._numberInput2.inputView.fire( 'change:value', null, numberInput2Value );

		this._textInput1.inputView.fire( 'change:value', null, textInput1Value );
		this._textInput2.inputView.fire( 'change:value', null, textInput2Value );
	}

	parseFormat( format ) {
		let numberInput2Value = 0;
		let numberInput1Value = 0;
		let textInput1Value = '';
		let textInput2Value = '';
		let useNumberInput1Value = true;
		let useTextInput1Value = true;
		let lastChar = null;
		let currentChar = null;
		for (let i = 0; i < format.length; i++) {
			currentChar = format.substr( i, 1 );
			if (useTextInput1Value && lastChar == '#' && currentChar == 0) {
				textInput1Value = '';
				useTextInput1Value = false;
			}
			if (currentChar == '0') {
				if (useNumberInput1Value) {
					numberInput1Value += 1;
				} else {
					numberInput2Value += 1;
				}
			}
			else if (useTextInput1Value && currentChar != '#') {
				textInput1Value = currentChar;
				useTextInput1Value = false;
			}
			else if (!useTextInput1Value && currentChar != '#') {
				textInput2Value = currentChar;
				useNumberInput1Value = false;
			}
			lastChar = currentChar;
		}
		if (textInput2Value == '') {
			textInput2Value = ',';
		}
		return { numberInput1Value, textInput1Value, textInput2Value, numberInput2Value };
	}
}
