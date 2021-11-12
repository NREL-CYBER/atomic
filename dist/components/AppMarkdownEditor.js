import { AppGrid } from "atomic";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export const AppMarkdownEditor = () => /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(Editor, {
  initialValue: "hello react editor world!",
  previewStyle: "vertical",
  height: "600px",
  initialEditType: "markdown",
  useCommandShortcut: true
}));