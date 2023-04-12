import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Italic, strikethrough, underline } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { FontBackgroundColor, FontColor } from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { Link } from '@ckeditor/ckeditor5-link'
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'

export default class WebsiteEditors extends ClassicEditor {}

// Plugins to include in the build.
WebsiteEditors.builtinPlugins = [
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  Heading,
  HtmlEmbed,
  Indent,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  strikethrough,
  Table,
  TableToolbar,
  TextTransformation,
  TodoList,
  underline,
]

// Editor configuration.
WebsiteEditors.defaultConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontColor',
      'fontBackgroundColor',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      'alignment',
      '|',
      'blockQuote',
      'insertTable',
      '|',
      'htmlEmbed',
    ],
  },
  alignment: {
    options: ['left', 'right', 'center', 'justify'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
  link: {
    addTargetToExternalLinks: true,
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
    ],
  },
}

// class DefaultWebsiteUploadAdapter {
// 	constructor(loader) {
// 		// The file loader instance to use during the upload.
// 		this.loader = loader;
// 	}

// 	// Starts the upload process.
// 	upload() {
// 		return this.loader.file.then(
// 			(file) =>
// 				new Promise((resolve, reject) => {
// 					this._initRequest();
// 					this._initListeners(resolve, reject, file);
// 					this._sendRequest(file);
// 				})
// 		);
// 	}

// 	// Aborts the upload process.
// 	abort() {
// 		if (this.xhr) {
// 			this.xhr.abort();
// 		}
// 	}

// 	// Initializes the XMLHttpRequest object using the URL passed to the constructor.
// 	_initRequest() {
// 		const xhr = (this.xhr = new XMLHttpRequest());

// 		// Note that your request may look different. It is up to you and your editor
// 		// integration to choose the right communication channel. This example uses
// 		// a POST request with JSON as a data structure but your configuration
// 		// could be different.
// 		xhr.open("POST", "http://example.com/image/upload/path", true);
// 		xhr.responseType = "json";
// 	}

// 	// Initializes XMLHttpRequest listeners.
// 	_initListeners(resolve, reject, file) {
// 		const xhr = this.xhr;
// 		const loader = this.loader;
// 		const genericErrorText = `Couldn't upload file: ${file.name}.`;

// 		xhr.addEventListener("error", () => reject(genericErrorText));
// 		xhr.addEventListener("abort", () => reject());
// 		xhr.addEventListener("load", () => {
// 			const response = xhr.response;

// 			// This example assumes the XHR server's "response" object will come with
// 			// an "error" which has its own "message" that can be passed to reject()
// 			// in the upload promise.
// 			//
// 			// Your integration may handle upload errors in a different way so make sure
// 			// it is done properly. The reject() function must be called when the upload fails.
// 			if (!response || response.error) {
// 				return reject(
// 					response && response.error
// 						? response.error.message
// 						: genericErrorText
// 				);
// 			}

// 			// If the upload is successful, resolve the upload promise with an object containing
// 			// at least the "default" URL, pointing to the image on the server.
// 			// This URL will be used to display the image in the content. Learn more in the
// 			// UploadAdapter#upload documentation.
// 			resolve({
// 				default: response.url,
// 			});
// 		});

// 		// Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
// 		// properties which are used e.g. to display the upload progress bar in the editor
// 		// user interface.
// 		if (xhr.upload) {
// 			xhr.upload.addEventListener("progress", (evt) => {
// 				if (evt.lengthComputable) {
// 					loader.uploadTotal = evt.total;
// 					loader.uploaded = evt.loaded;
// 				}
// 			});
// 		}
// 	}

// 	// Prepares the data and sends the request.
// 	_sendRequest(file) {
// 		// Prepare the form data.
// 		const data = new FormData();

// 		data.append("upload", file);

// 		// Important note: This is the right place to implement security mechanisms
// 		// like authentication and CSRF protection. For instance, you can use
// 		// XMLHttpRequest.setRequestHeader() to set the request headers containing
// 		// the CSRF token generated earlier by your application.

// 		// Send the request.
// 		this.xhr.send(data);
// 	}
// }

// function DefaultWebsiteUploadAdapterPlugin(editor) {
// 	editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
// 		// Configure the URL to the upload script in your back-end here!
// 		return new MyUploadAdapter(loader);
// 	};
// }
