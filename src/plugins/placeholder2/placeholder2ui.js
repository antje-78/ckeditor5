import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import './theme/placeholder.css';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import PlaceholderDropdownView from './ui/placeholderdropdownview';
import PlaceholderActionsView from './ui/placeholderactionsview';

export default class Placeholder2Ui extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		console.log("Placeholder2 Plugin initialized.");

		const editor = this.editor;
		const t = editor.t;

		this._balloon = editor.plugins.get( ContextualBalloon );

		const buttons = [];

		// Add a simple button to the array of toolbar items.
		buttons.push( new ButtonView() );

		// The "placeholder" dropdown must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'placeholder2', locale => {

			// const command = editor.commands.get( 'insertTable' );
			const dropdownView = createDropdown( locale );

			// dropdownView.bind( 'isEnabled' ).to( command );

			// Decorate dropdown's button.
			dropdownView.buttonView.set( {
				// icon: tableIcon,
				label: t( 'Platzhalter' ),
				withText: true,
				tooltip: true
			} );

			// Prepare custom view for dropdown's panel.
			const placeholderDropdownView = new PlaceholderDropdownView( locale, editor );
			dropdownView.panelView.children.add( placeholderDropdownView );

			// placeholderDropdownView.delegate( 'execute' ).to( dropdownView );

			dropdownView.on( 'execute', ( ) => {
				editor.editing.view.focus();
			} );

			this.actionsView = new PlaceholderActionsView( locale, editor );
			// const placeholderCommand = editor.commands.get( 'placeholder2' );
			// this.actionsView.bind( 'type' ).to( placeholderCommand, 'type' );

			this.listenTo( this.actionsView, 'closeActionsView', () => {
				this._hideUI();
			} );
			// Attach lifecycle actions to the the balloon.
			this._enableUserBalloonInteractions();

			return dropdownView;
		} );
	}

	/**
	 * Attaches actions that control whether the balloon panel containing the
	 * {@link #formView} is visible or not.
	 *
	 * @private
	 */
	_enableUserBalloonInteractions() {
		const viewDocument = this.editor.editing.view.document;

		// Handle click on view document and show panel when selection is placed inside the link element.
		// Keep panel open until selection will be inside the same link element.
		this.listenTo( viewDocument, 'click', () => {
			const placeholderElement = this._getSelectedPlaceholderElement();

			if ( placeholderElement ) {
				console.log( 'placeholderElement', placeholderElement );
				// Then show panel but keep focus inside editor editable.
				this._showUI(placeholderElement);
			}
		} );

		// Focus the form if the balloon is visible and the Tab key has been pressed.
		this.editor.keystrokes.set( 'Tab', ( data, cancel ) => {
			if ( this._areActionsVisible && !this.actionsView.focusTracker.isFocused ) {
				this.actionsView.focus();
				cancel();
			}
		}, {
			// Use the high priority because the link UI navigation is more important
			// than other feature's actions, e.g. list indentation.
			// https://github.com/ckeditor/ckeditor5-link/issues/146
			priority: 'high'
		} );

		// Close the panel on the Esc key press when the editable has focus and the balloon is visible.
		this.editor.keystrokes.set( 'Esc', ( data, cancel ) => {
			if ( this._isUIVisible ) {
				this._hideUI();
				cancel();
			}
		} );

		// Close on click outside of balloon panel element.
		clickOutsideHandler( {
			emitter: this.actionsView,
			activator: () => this._areActionsInPanel,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideUI()
		} );
	}

	_showUI( placeholderElement ) {
		const editor = this.editor;
		// const linkCommand = editor.commands.get( 'link' );

		// if ( !linkCommand.isEnabled ) {
		// 	return;
		// }
		this._addView( placeholderElement );

		this._balloon.showStack( 'main' );

		// Begin responding to ui#update once the UI is added.
		// this._startUpdatingUI();
	}

	_addView( placeholderElement ) {
		const editor = this.editor;

		this.actionsView.onOpen( placeholderElement );

		this._balloon.add( {
			view: this.actionsView,
			position: this._getBalloonPositionData()
		} );
	}

	/**
	 * Returns `true` when {@link #actionsView} is in the {@link #_balloon}.
	 *
	 * @readonly
	 * @protected
	 * @type {Boolean}
	 */
	get _areActionsInPanel() {
		return this._balloon.hasView( this.actionsView );
	}

	/**
	 * Removes the {@link #formView} from the {@link #_balloon}.
	 *
	 * See {@link #_addFormView}, {@link #_addActionsView}.
	 *
	 * @protected
	 */
	_hideUI() {
		if ( !this._areActionsInPanel ) {
			return;
		}

		const editor = this.editor;

		this.stopListening( editor.ui, 'update' );
		this.stopListening( this._balloon, 'change:visibleView' );

		// Make sure the focus always gets back to the editable _before_ removing the focused form view.
		// Doing otherwise causes issues in some browsers. See https://github.com/ckeditor/ckeditor5-link/issues/193.
		editor.editing.view.focus();

		// Then remove the actions view because it's beneath the form.
		this._balloon.remove( this.actionsView );
	}

	/**
	 * Adds the {@link #actionsView} to the {@link #_balloon}.
	 *
	 * @protected
	 */
	_addActionsView() {
		if ( this._areActionsInPanel ) {
			return;
		}

		this._balloon.add( {
			view: this.actionsView,
			position: this._getBalloonPositionData()
		} );
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		const selection = view.document.selection;

		const placeholderElement = this._getSelectedPlaceholderElement();

		const target = placeholderElement ?
			// When selection is inside link element, then attach panel to this element.
			view.domConverter.mapViewToDom( placeholderElement ) :
			// Otherwise attach panel to the selection.
			view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

		return { target };
	}

	_getSelectedPlaceholderElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;
		if ( selection.getSelectedElement() ) {
			console.log( 'selection.getSelectedElement()', selection.getSelectedElement() );
			let found = false;
			for ( let _class of selection.getSelectedElement()._classes.values() ) {
				if ( _class == 'placeholder2' )
					found = true;
			}
			return found ? selection.getSelectedElement() : null;
		} else {
			return null;
		}
	}
}

function findLinkElementAncestor( position ) {
	return position.getAncestors().find( ancestor => isPlaceholderElement( ancestor ) );
}

function isPlaceholderElement( node ) {
	return node.is( 'node' ) && !!node.name == 'div';
}
