import View from '@ckeditor/ckeditor5-ui/src/view';
import ListView from '@ckeditor/ckeditor5-ui/src/list/listview';
import ListSeparatorView from '@ckeditor/ckeditor5-ui/src/list/listseparatorview';
import ListItemView from '@ckeditor/ckeditor5-ui/src/list/listitemview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import SwitchButtonView from '@ckeditor/ckeditor5-ui/src/button/switchbuttonview';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

export default class PlaceholderDropdownView extends View {
	constructor( locale, editor ) {
		super( locale );
		this.items = {
			'Dokument': {
				pageNumber: {
					name: 'Seitennummer',
					type: 'Number'
				},
				pageCount: {
					name: 'Seitenanzahl',
					type: 'Number'
				}
			},
			'Sonstiges': {
				currentDate: {
					name: 'Aktuelles Datum',
					type: 'Date'
				}
			}
		};
		const placeholderConfig = editor.config.get( 'placeholder2.items' );
		for ( let key in placeholderConfig ) {
			if ( !this.items[ key ] )
				this.items[ key ] = {};
			for ( let key2 in placeholderConfig[ key ] ) {
				this.items[ key ][ key2 ] = placeholderConfig[ key ][ key2 ];
			}
		}
		console.log( 'Placeholder Config:', placeholderConfig );
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
					this.itemDefinitions2.clear();
					for ( let item in this.items[ commandParam ] ) {
						this.itemDefinitions2.add({
							type: 'button',
							model: new Model( {
								commandParam: item,
								label: this.items[ commandParam ][item].name ? this.items[ commandParam ][item].name : item,
								option: this.items[ commandParam ][item],
								withText: true
							} )
						});
					}
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
				console.log( 'Model: ', model);
				console.log( 'Type: ', type);
				buttonView.on( 'execute', function( evt ) {
					editor.execute( 'placeholder2', { value: { key: model.commandParam, name: model.label, type: model.option.type } } );
					editor.editing.view.focus();
				});

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

	_createItemDefinitions( items ) {
		const itemDefinitions = new Collection();
		for ( let item in items ) {
			itemDefinitions.add({
				type: 'button',
				model: new Model( {
					commandParam: item,
					label: items[item].name ? items[item].name : item,
					option: items[item],
					withText: true
				} )
			});
		}
		return itemDefinitions;
	}
}
