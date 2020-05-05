import React from "react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const getKind = (key) =>
  key === "main" ? "PRIMARY" : String(key).toUpperCase();

const FileUploader = ({ item, setItem, uppy }) => {
  uppy.on("transloadit:complete", (assembly) => {
    const files = assembly.results
      ? Object.keys(assembly.results).map((fileKey) => {
          const [
            {
              signed_url,
              signed_ssl_url,
              tus_upload_url,
              meta,
              ...neededFields
            },
          ] = assembly.results[fileKey];
          const {
            title,
            author,
            creator,
            create_date,
            modify_date,
            date_file_created,
            description,
            ...neededMetadata
          } = meta;
          return {
            kind: getKind(fileKey),
            ...neededFields,
            meta: neededMetadata,
          };
        })
      : [];
    setItem({ ...item, files });
  });

  return (
    <Dashboard
      uppy={uppy}
      inline={true}
      width="100%"
      height={200}
      showLinkToFileUploadResult={false}
      showProgressDetails={true}
      hideProgressAfterFinish={false}
      note="PDF only. One file at a time!"
      proudlyDisplayPoweredByUppy={false}
      locale={{
        strings: {
          dropPasteImport:
            "Drag and drop a file here, %{browse} or import from",
          dropPaste: "Drag and drop a file here, or %{browse}",
          browse: "open the file picker",
        },
      }}
    />
  );
};

export default FileUploader;
