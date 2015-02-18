YUI.add('moodle-atto_fullscreen-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_preview
 * @copyright  2015 Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_preview-button
 */

/**
 * Atto text editor preview plugin.
 *
 * @namespace M.atto_preview
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var PLUGINNAME = 'atto_preview',
    PREVIEW = 'preview',
    STATE = false;

Y.namespace('M.atto_preview').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        var button = this.addButton({
            icon: 'preview',
            iconComponent: PLUGINNAME,
            callback: this._toggle
        });
        var host = this.get('host');
        button.set('title', 'Toggle preview');
    },

    /**
     * Toggle preview and normal display mode
     *
     * @method _toggle
     * @param {EventFacade} e
     * @private
     */
    _toggle: function(e) {
        e.preventDefault();
        var button = this.buttons[PREVIEW];

        if (button.getData(STATE)) {
            this.unHighlightButtons(PREVIEW);
            this._setpreview(button);
        } else {
            this.highlightButtons(PREVIEW);
            this._setpreview(button, true);
        }

    },

    /**
     * Adjust editor to screen size
     *
     * @method _fitToScreen
     * @private
     */
    _fitToScreen: function() {
        var button = this.buttons[PREVIEW];
        if (!button.getData(STATE)) {
            return;
        }
        var host = this.get('host');
        var height;
        var hide = host.editor.hasAttribute('hidden') || host.editor.getComputedStyle('display') === 'none';

        this._background.setStyles({
            "left": - host.editor.get('winWidth') / 2,
            "height": host.editor.get('winHeight'),
            "width": host.editor.get('winWidth')
        });
        window.scroll(this._background.getX(), this._background.getY());

        host._wrapper.setStyles({
            "maxWidth": "100%",
            "width": "100%",
            "top": 0
        });

        host.editor.show();
        height = parseFloat(host.editor.getComputedStyle('height')) + host.editor.get('winHeight') - parseFloat(host._wrapper.getComputedStyle('height'));
        host.editor.setStyles({
            "height": height,
            "maxHeight": height
        });
        height = parseFloat(height) + 20;
        host.textarea.setStyles({
            "padding": host.editor.getComputedStyle('padding'),
            "margin": host.editor.getComputedStyle('margin'),
            "width": host.editor.getComputedStyle('width'),
            "height": height,
            "maxHeight": height,
            "top": host.editor.getY() - host.toolbar.getY()
        });
        
        host.textarea.setStyle("margin-bottom", parseFloat(host.editor.getComputedStyle('margin-bottom')) + 20);
        if (hide) {
            this.editor.hide();
            // If using htmlplus allow it to be position in editor's spot.
            if (host.textarea.hasAttribute('hidden') || host.textarea.getComputedStyle('display') === 'none') {
                this._background.setStyles({
                    "left": "0px",
                    "padding": host._wrapper.getComputedStyle('padding'),
                    "margin": host._wrapper.getComputedStyle('margin'),
                    "height": host._wrapper.getComputedStyle('height'),
                    "width": host._wrapper.getComputedStyle('width')
                });
                window.scroll(this._background.getX(), this._background.getY());
            }
        }
    },

    /**
     * Change the mode for editor screen
     *
     * @method _setpreview
     * @param {Node} button The preview button
     * @param {Boolean} mode Whether the editor should be made preview
     * @private
     */
    _setpreview: function(button, mode) {
        var host = this.get('host');

        if (mode) {
            Y.one('body').setStyle('overflow', 'hidden');

            // Save style attribute for editor.
            this._editorStyle = {
                minHeight: host.editor.getStyle('min-height'),
                height: host.editor.getStyle('height')
            };

            Y.one('body').insertBefore(this._background, host._wrapper);
            host._wrapper.setStyles({position: 'fixed', "top": '0px', left: '0px', scroll: "auto"});

            // Use CSS to hide navigation
            Y.one('body').addClass('atto-preview');

            host.textarea.setStyles({
                "position": "fixed",
                "overflow": "auto",
                "left": 0
            });
            host._wrapper.setStyles({
                "left": 0,
                "position": "fixed"
            });

        } else {
            Y.one('body').setStyle('overflow', 'inherit');
            this._background.remove();

            // Restore editor and textarea style.
            if (this._editorStyle) {
                host.editor.removeAttribute('style');
                host.editor.setStyles(this._editorStyle);
                if (host.textarea.getComputedStyle('display') === "none") {
                    host.textarea.removeAttribute('style');
                    host.textarea.setStyle("display", "none");
                } else {
                    host.textarea.removeAttribute('style');
                }

            }
            host._wrapper.removeAttribute('style');

            Y.one('body').removeClass('atto-preview');
            host.textarea.setStyle('width', this.toolbar.getComputedStyle('width'));

        }
        button.setData(STATE, !!mode);
        this._fitToScreen();

    }
});


}, '@VERSION@');
