import React from "react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const getKind = (key) =>
  key === "main" ? "PRIMARY" : String(key).toUpperCase();

const FileUploader = ({ item, setItem, uppy }) => {
  if (!uppy) return null;

  uppy.on("transloadit:complete", (assembly) => {
    const files = assembly.results
      ? Object.keys(assembly.results).map((fileKey) => {
          const [
            {
              signed_url,
              signed_ssl_url,
              tus_upload_url,
              meta,
              id,
              // Extract the ID because we are creating a new file document
              // in Firebase, and we don't therefore want the API to attempt
              // to update an existing document with this ID.
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
      height={320}
      showLinkToFileUploadResult={false}
      showProgressDetails={true}
      hideProgressAfterFinish={false}
      disableThumbnailGenerator={true}
      /* The thumbnail generator is desired but throws an error
       * for programmatically-added blobs.
       * Possibly related to https://github.com/transloadit/uppy/issues/2172
       * and therefore TODO: attempt to remove this restriction in a future version.
       */
      note="Image files only. One file at a time!"
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
