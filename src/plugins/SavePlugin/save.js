import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import saveIcon from './theme/icons/save.svg'

export default class Save extends Plugin {

    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add( 'save', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Speichern',
                icon: saveIcon,
                withText: false,
                tooltip: true
            } );

            view.on( 'execute', () => {
                editor.fire('save', editor.getData());
            } );

            return view;
        } );
    }
}
