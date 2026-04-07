/**
 * @name AEM HTML Editor
 * @description Replaces AEM's raw HTML textareas with a full-featured Monaco Editor.
 * @version 2026-04-07
 */
(function ($) {
    var monacoCdn = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs";

    var editorFields = [
        { selector: '[name="./gcRawHeader"]', height: 200 },
        { selector: '[name="./gcRawFooter"]', height: 200 },
        { selector: '[name="./gcPageCSS"]', height: 200 },
        { selector: '[name="./gcPageJavascript"]', height: 500 },
        { selector: '[name="./text"]', height: 500 }
    ];

    $(".coral-FixedColumn-column").css("width", "100%");

    $(".coral-Form-fieldlabel").css({
        "font-size": "30px",
        "font-weight": "bold",
        "margin-top": "20px",
        "margin-bottom": "20px"
    });

    function createEditorForField(field) {
        var inputField = $(field.selector);

        if (!inputField.length) {
            return;
        }

        var height = field.height || 500;
        inputField.height(height);

        var editorContainer = $("<div>").css({
            position: "relative",
            width: "100%",
            height: height + "px",
            minHeight: "200px",
            resize: "vertical",
            overflow: "hidden",
            border: "1px solid #d9d9d9"
        }).insertBefore(inputField);

        inputField.hide();

        var editor = monaco.editor.create(editorContainer[0], {
            value: inputField.val() || "",
            language: "html",
            theme: "vs",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false
        });

        var formatAction = editor.getAction("editor.action.formatDocument");
        if (formatAction) {
            formatAction.run();
        }

        editor.onDidChangeModelContent(function () {
            inputField.val(editor.getValue());
        });

        if (window.ResizeObserver) {
            var resizeObserver = new ResizeObserver(function () {
                editor.layout();
            });
            resizeObserver.observe(editorContainer[0]);
        }
    }

    $.getScript(monacoCdn + "/loader.min.js").done(function () {
        window.require.config({ paths: { vs: monacoCdn } });
        window.require(["vs/editor/editor.main"], function () {
            editorFields.forEach(createEditorForField);
        });
    });
})(jQuery);
