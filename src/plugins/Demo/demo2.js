import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { addToolbarToDropdown, addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import DropdownView from "@ckeditor/ckeditor5-ui/src/dropdown/dropdownview";
import StickyPanelView from "@ckeditor/ckeditor5-ui/src/panel/sticky/stickypanelview";
import DropdownButtonView from "@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview";
import BalloonPanelView from "@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview";
import clickOutsideHandler from "@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler";
import SwitchButtonView from "@ckeditor/ckeditor5-ui/src/button/switchbuttonview";
import ListItemView from "@ckeditor/ckeditor5-ui/src/list/listitemview";
import ListView from "@ckeditor/ckeditor5-ui/src/list/listview";
import ListSeparatorView from "@ckeditor/ckeditor5-ui/src/list/listseparatorview";
import View from '@ckeditor/ckeditor5-ui/src/view';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import './demo.css';

export default class Demo extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		console.log("Demo Plugin initialized.");

		const editor = this.editor;
		const t = editor.t;

		this._balloon = editor.plugins.get( ContextualBalloon );

		const buttons = [];

		// Add a simple button to the array of toolbar items.
		buttons.push( new ButtonView() );

		// The "placeholder" dropdown must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'demo', locale => {

			// const command = editor.commands.get( 'insertTable' );
			const dropdownView = createDropdown( locale );

			// dropdownView.bind( 'isEnabled' ).to( command );

			// Decorate dropdown's button.
			dropdownView.buttonView.set( {
				// icon: tableIcon,
				label: t( 'Demo' ),
				withText: true,
				tooltip: true
			} );

			// Prepare custom view for dropdown's panel.
			const demoView = new DemoView( locale );
			dropdownView.panelView.children.add( demoView );

			// demoView.delegate( 'execute' ).to( dropdownView );

			dropdownView.on( 'execute', ( ) => {
				// editor.execute( 'placeholder', { option: demoView.option } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	_showUI( forceVisible = false ) {
		const editor = this.editor;
		// const linkCommand = editor.commands.get( 'link' );

		// if ( !linkCommand.isEnabled ) {
		// 	return;
		// }
		this._addView();

		this._balloon.showStack( 'main' );

		// Begin responding to ui#update once the UI is added.
		// this._startUpdatingUI();
	}

	_addView() {
		const editor = this.editor;
		// const linkCommand = editor.commands.get( 'link' );

		this._balloon.add( {
			view: this.view,
			position: this._getBalloonPositionData()
		} );
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		const targetLink = this._getSelectedPlaceholderElement();

		const target = targetLink ?
			// When selection is inside link element, then attach panel to this element.
			view.domConverter.mapViewToDom( targetLink ) :
			// Otherwise attach panel to the selection.
			view.domConverter.mapViewToDom( this.button );

		return { target };
	}

	_getSelectedPlaceholderElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;

		return ( selection && selection.getSelectedElement() ) ? selection.getFirstRange() : null;
	}
}

export class DemoView extends View {
	constructor( locale ) {
		super( locale );
		this.items = {
			'Sonstiges': {
				currentDate: {
					name: 'Aktuelles Datum'
				}
			},
			'Dokument': {
				pageNumber: {
					name: 'Seitennummer'
				},
				pageCount: {
					name: 'Seitenanzahl'
				}
			}
		};
		const t = locale.t;

		const itemDefinitions = this._createItemDefinitions( this.items );
		this.listView1 = new ListView( locale );
		this.listView1.items.bindTo( itemDefinitions ).using( ({ type, model } ) => {
			if ( type === 'separator' ) {
				return new ListSeparatorView( locale );
			} else if ( type === 'button' || type === 'switchbutton' ) {
				const listItemView = new ListItemView( locale );

				let buttonView;
				if ( type === 'button' ) {
					buttonView = new ButtonView( locale );
				} else {
					buttonView = new SwitchButtonView( locale );

				}
				// Bind all model properties to the button view.
				buttonView.bind( ...Object.keys( model ) ).to( model );

				buttonView.on( 'execute', function( event ) {
					const commandParam = event.source.commandParam;
					this.itemDefinitions2 = this._createItemDefinitions( this.items[ commandParam ] );
				}.bind( this ) );

				listItemView.children.add( buttonView );

				return listItemView;
			}
		});

		this.listView2 = new ListView(locale);
		this.itemDefinitions2 = this._createItemDefinitions( this.items.Sonstiges );
		this.listView2.items.bindTo( this.itemDefinitions2 ).using( ({ type, model } ) => {
			if ( type === 'separator' ) {
				return new ListSeparatorView( locale );
			} else if ( type === 'button' || type === 'switchbutton' ) {
				const listItemView = new ListItemView( locale );

				let buttonView;
				if ( type === 'button' ) {
					buttonView = new ButtonView( locale );
				} else {
					buttonView = new SwitchButtonView( locale );

				}
				// Bind all model properties to the button view.
				buttonView.bind( ...Object.keys( model ) ).to( model );

				listItemView.children.add( buttonView );
				return listItemView;
			}
		} );
		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-demo-container',
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				this.listView1,
				this.listView2
			]
		} );
	}

	_createListView(locale, itemDefinitions, buttonExecuteFunction) {
		const listView = new ListView( locale );
		listView.items.bindTo( itemDefinitions ).using( ({ type, model } ) => {
			if ( type === 'separator' ) {
				return new ListSeparatorView( locale );
			} else if ( type === 'button' || type === 'switchbutton' ) {
				const listItemView = new ListItemView( locale );

				let buttonView;
				if ( type === 'button' ) {
					buttonView = new ButtonView( locale );
				} else {
					buttonView = new SwitchButtonView( locale );

				}
				// Bind all model properties to the button view.
				buttonView.bind( ...Object.keys( model ) ).to( model );

				if (buttonExecuteFunction)
					buttonView.on( 'execute', buttonExecuteFunction );
				// buttonView.delegate( 'execute' ).to( dropdownView );

				listItemView.children.add( buttonView );
				return listItemView;
			}
		});
		return listView;
	}

	_createItemDefinitions( items ) {
		const itemDefinitions = new Collection();
		for ( let item in items ) {
			itemDefinitions.add({
				type: 'button',
				model: new Model( {
					commandParam: item,
					label: items[item].name ? items[item].name : item,
					withText: true
				} )
			});
		}
		return itemDefinitions;
	}
}
