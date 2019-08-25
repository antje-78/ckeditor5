/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import FontSizePlugin from '@ckeditor/ckeditor5-font/src/fontsize';
import FontFamilyPlugin from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontColorPlugin from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import SimpleBox from './plugins/Simplebox/simplebox';
import Placeholder from './plugins/placeholder/placeholder';
import Demo from './plugins/placeholder/Demo/demo';
import Border from './plugins/Border/border';
import './ckeditor.css';
import BorderWidth from './plugins/BorderWidth/border-width';
import BorderColor from './plugins/BorderColor/border-color';

export default class ClassicEditor extends DecoupledEditor {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	FontSizePlugin,
	FontFamilyPlugin,
	FontColorPlugin,
	FontBackgroundColor,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	Alignment,
	Indent,
	IndentBlock,
	SimpleBox,
	Placeholder,
	Demo,
	Border,
	BorderWidth,
	BorderColor
];

const _colors = [
	{
		color: 'hsl(0, 0%, 0%)',
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
ClassicEditor.defaultConfig = {
	extraPlugins: [ BorderWidth, BorderColor ],
	toolbar: {
		items: [
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'subScript',
			'superScript',
			'|',
			'alignment',
			'|',
			'outdent',
			'indent',
			'|',
			'border',
			'borderWidth',
			'bordercolor',
			'|',
			'simpleBox',
			'placeholder',
			'demo',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'insertTable',
			'|',
			'Clipboard',
			'undo',
			'redo'
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
			'mergeTableCells'
		]
	},
	fontColor: {
		colors: _colors
	},
	fontBackgroundColor: {
		colors: _colors
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
	placeholderConfig: {
		types: [ 'date', 'color', 'first name', 'surname' ] // ADDED
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'de'
};

// ClassicEditor
// 	.create( document.querySelector( '#editor' ) )
// 	.then( editor => {
// 		console.log( 'Editor was initialized', editor );
//
// 		window.editor = editor;
//
// 		editor.model.document.on( 'change:data', ( event, value, value2 ) => {
// 			console.log( 'The data has changed!', event, value, value2 );
// 		} );
// 		document.getElementsByClassName( 'document-editor__toolbar' )[0].appendChild( editor.ui.view.toolbar.element );
// 	} )
// 	.catch( err => {
// 		console.error( err.stack );
// 	} );
