import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { request } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";

const TinyEditor = ({ onChange, name, value }) => {
    const [pluginConfig, setPluginConfig] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPluginConfig = async () => {
            const editor = await request(`/${pluginId}/config/editor`, {
                method: "GET",
            });
            if (editor) {
                setPluginConfig(editor);
            }
        };
        getPluginConfig().then(() => {
          setLoading(false)
        });
    }, []);

    return (
        !loading ?
            <Editor
                tinymceScriptSrc={CUSTOM_VARIABLES.tinymce_source}
                value={value || "<p></p>"}
                tagName={name}
                onEditorChange={(editorContent) => {
                    onChange({ target: { name, value: editorContent } });
                }}
                outputFormat={pluginConfig?.outputFormat || "html"}
                init={pluginConfig?.editorConfig}
            />
            : <></>
    );
};
TinyEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};
export default TinyEditor;
