YUI.add("moodle-atto_preview-button",function(s,e){var t="preview";s.namespace("M.atto_preview").Button=s.Base.create("button",s.M.editor_atto.EditorPlugin,[],{initializer:function(){this.addButton({icon:"e/preview",callback:this._toggle}).set("title",M.util.get_string("pluginname","atto_preview")),s.after("windowresize",s.bind(this._fitToScreen,this)),this.editor.on(["gesturemove","gesturemoveend"],s.bind(this._fitToScreen,this),{standAlone:!0},this),this.toolbar.on("click",s.bind(this._fitToScreen,this))},_toggle:function(e){e.preventDefault();e=this.buttons[t];e.getData(!1)?(this.unHighlightButtons(t),this._setpreview(e)):(this.highlightButtons(t),this._setpreview(e,!0))},_fitToScreen:function(){var e=this.buttons[t];e.getData(!1)&&(e=this.get("host"),this.preview.setStyles({position:"absolute",height:e.editor.getComputedStyle("height"),width:e.editor.getComputedStyle("width"),top:e.editor.getComputedStyle("top"),left:e.editor.getComputedStyle("left")}),this.preview.setY(this.editor.getY()))},_setpreview:function(e,t){var i,o=this.get("host");t?(this.preview=s.Node.create('<iframe src="'+this.get("previewurl")+"?sesskey="+this.get("sesskey")+"&contextid="+this.get("contextid")+"&content="+encodeURIComponent(o.textarea.get("value"))+'" srcdoc="" id="atto-preview"></iframe'),this.preview.setStyles({backgroundColor:s.one("body").getComputedStyle("backgroundColor"),backgroundImage:"url("+M.util.image_url("i/loading","core")+")",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}),o._wrapper.appendChild(this.preview),i={sesskey:this.get("sesskey"),contextid:this.get("contextid"),content:o.textarea.get("value")},s.io(this.get("previewurl"),{context:this,data:i,on:{complete:this._loadContent},method:"POST"}),o.disablePlugins(),o.enablePlugins(this.name),"undefined"!=typeof s.M.atto_fullscreen&&o.enablePlugins("fullscreen")):(this.preview.remove(!0),o.enablePlugins()),e.setData(!1,!!t),this._fitToScreen()},_loadContent:function(e,t){t=t.responseText;this.preview.setAttribute("srcdoc",t)}},{ATTRS:{previewurl:{value:null},contextid:{value:null},sesskey:{value:null}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});