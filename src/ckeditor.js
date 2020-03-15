/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import DecoupledDocumentEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

// Custom Plugins
import Border from './plugins/Border/Border/border';
import BorderWidth from './plugins/Border/BorderWidth/border-width';
import BorderColor from './plugins/Border/BorderColor/border-color';
import BorderFillColor from './plugins/Border/BorderFillColor/border-fill-color';
import BorderStyle from './plugins/Border/BorderStyle/border-style';
import Placeholder2 from './plugins/placeholder2/placeholder2';

// CKEditor Inspector
import CKEditorInspector from '../node_modules/@ckeditor/ckeditor5-inspector/build/inspector.js';
import Demo from "./plugins/Demo/demo";
import Save from "./plugins/SavePlugin/save";

export default class Editor extends DecoupledDocumentEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	BlockQuote,
	Bold,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	Strikethrough,
	Table,
	TableToolbar,
	Underline,
	Autoformat,
	Autosave,
	EasyImage,
	FontColor,
	FontBackgroundColor,
	HorizontalLine,
	ImageResize,
	PageBreak,
	RemoveFormat,
	SpecialCharacters,
	SpecialCharactersEssentials,
	SpecialCharactersCurrency,
	SpecialCharactersArrows,
	Subscript,
	Superscript,
	TableCellProperties,
	TableProperties,
	Essentials,
	Paragraph,
	Border,
	BorderWidth,
	BorderColor,
	BorderFillColor,
	BorderStyle,
	Placeholder2,
	Demo,
	Save
];

const _colors = [
	{
		color: 'rgb(0, 0, 0)',
		label: 'Schwarz'
	},
	{
		color: 'hsl(0, 0%, 30%)',
		label: 'Dunkelgrau'
	},
	{
		color: 'hsl(0, 0%, 60%)',
		label: 'Grau'
	},
	{
		color: 'hsl(0, 0%, 90%)',
		label: 'Hellgrau'
	},
	{
		color: 'hsl(0, 0%, 100%)',
		label: 'Weiss',
		hasBorder: true
	},
	{
		color: 'hsl(0, 100%, 50%)',
		label: 'Rot'
	},
	{
		color: 'hsl(39, 100%, 50%)',
		label: 'Orange'
	},
	{
		color: 'hsl(60, 100%, 50%)',
		label: 'Gelb'
	},
	{
		color: 'hsl(120, 73%, 75%)',
		label: 'Hellgrün'
	},
	{
		color: 'hsl(120, 100%, 25%)',
		label: 'Grün'
	},
	{
		color: 'hsl(160, 100%, 75%)',
		label: 'Aquamarin'
	},
	{
		color: 'hsl(174, 72%, 56%)',
		label: 'Türkis'
	},
	{
		color: 'hsl(195, 53%, 79%)',
		label: 'Hellblau'
	},
	{
		color: 'hsl(240, 100%, 50%)',
		label: 'Blau'
	},
	{
		color: 'hsl(300, 100%, 25%)',
		label: 'Purpur'
	},
	{
		color: 'hsl(80, 61%, 50%)',
		label: 'Gelbgrün'
	},
	{
		color: 'hsl(275, 100%, 25%)',
		label: 'Indigo'
	},
	{
		color: 'hsl(0, 100%, 90%)',
		label: 'Pastellrot'
	},
	{
		color: 'hsl(30, 100%, 90%)',
		label: 'Pastellorange'
	},
	{
		color: 'hsl(60, 100%, 90%)',
		label: 'Pastellgelb'
	},
	{
		color: 'hsl(90, 100%, 90%)',
		label: 'Pastellgrün 1'
	},
	{
		color: 'hsl(120, 100%, 90%)',
		label: 'Pastellgrün 2'
	},
	{
		color: 'hsl(150, 100%, 90%)',
		label: 'Pastellgrün 3'
	},
	{
		color: 'hsl(180, 100%, 90%)',
		label: 'Pastellblau 1'
	},
	{
		color: 'hsl(210, 100%, 90%)',
		label: 'Pastellblau 2'
	},
	{
		color: 'hsl(240, 100%, 90%)',
		label: 'Pastellila'
	},
	{
		color: 'hsl(270, 100%, 90%)',
		label: 'Pastellindigo'
	},
	{
		color: 'hsl(300, 100%, 90%)',
		label: 'Pastellrosa 1'
	},
	{
		color: 'hsl(330, 100%, 90%)',
		label: 'Pastellrosa 2'
	}
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'save',
			'demo',
			'|',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'removeFormat',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'highlight',
			'|',
			'border',
			'borderWidth',
			'bordercolor',
			'borderFillColor',
			'borderstyle',
			'|',
			'placeholder2',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'|',
			'indent',
			'outdent',
			'|',
			'link',
			'blockQuote',
			'imageUpload',
			'insertTable',
			'|',
			'undo',
			'redo',
			'horizontalLine',
			'pageBreak',
			'specialCharacters'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	fontColor: {
		colors: _colors,
		documentColorsCount: 10
	},
	fontBackgroundColor: {
		colors: _colors,
		documentColorsCount: 10
	},
	fontSize: {
		options: [
			9,
			11,
			13,
			14,
			17,
			19,
			21,
			24,
			26,
			28,
			36
		]
	},
	borderColor: {
		colors: _colors,
		documentColorsCount: 10
	},
	borderFillColor: {
		colors: _colors
	},
	'borderColor.documentColorsCount': 10,
	placeholderConfig: {
		types: [ 'date', 'color', 'first name', 'surname' ] // ADDED
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'de',
	placeholder2: {
		items: {
			'Sonstiges': {
				invoiceDate: {
					name: 'Rechnungsdatum',
					type: 'Date'
				}
			},
			'Item1' : {
				item1: {
					name: 'Item1',
					type: 'String'
				}
			}
		}
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Standard', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Überschrift 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Überschrift 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Überschrift 3', class: 'ck-heading_heading3' }
		]
	}
};

Editor
	.create( document.querySelector( '#editor' ) )
	.then( editor => {
		console.log( 'Editor was initialized', editor );

		window.editor = editor;
		window.editor.createXML = createXML;
		window.editor.createElements = createElements;

		editor.model.document.on( 'change:data', ( event, value, value2 ) => {
			console.log( 'The data has changed!', event, value, value2 );
		} );

		CKEditorInspector.attach( editor );

		document.getElementsByClassName( 'document-editor__toolbar' )[0].appendChild( editor.ui.view.toolbar.element );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

function createXML() {
	const document = window.editor.model.document;
	const items = document.roots._items;
	let _xml = '';
	for ( let item of items ) {
		if ( item.rootName == 'main' ) {
			_xml += '<main>';
			if ( item._children && item._children._nodes )
				_xml += window.editor.createElements( item._children._nodes );
			_xml += '</main>';
		}
	}
	return _xml;
}

function createElements( nodes ) {
	let _xml = '';
	for ( let _node of nodes ) {
		const name = _node.name;
		if ( name ) {
			_xml += '<' + name;
			_node._attrs.forEach( (item, index) => _xml += ' ' + index + '="' + item + '"');
			_xml += '>';
			if ( _node._children && _node._children._nodes)
				_xml += window.editor.createElements( _node._children._nodes );
			_xml += '</' + name + '>'
		}
		if ( _node.data ) {
			_xml += '<text';
			_node._attrs.forEach( (item, index) => _xml += ' ' + index + '="' + item+ '"');
			_xml += '>' + _node.data + '</text>';
		}
	}
	return _xml;
}
