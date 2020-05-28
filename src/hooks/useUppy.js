import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import { transloaditKey } from "../config";

const useUppy = ({
  templateId = "",
  allowedFileTypes = null,
  onBeforeFileAdded = () => true,
  autoProceed = false,
}) => {
  const [uppy, setUppy] = useState(null);

  useEffect(() => {
    if (!uppy) {
      const ONE_MEGABYTE = 2 ** 20;
      setUppy(
        Uppy({
          id: templateId,
          allowMultipleUploads: false,
          restrictions: {
            maxFileSize: 128 * ONE_MEGABYTE,
            minNumberOfFiles: 1,
            maxNumberOfFiles: 1,
            allowedFileTypes,
          },
          onBeforeFileAdded,
          autoProceed,
        }).use(Transloadit, {
          params: {
            auth: {
              // TODO: signature auth for Transloadit?
              // https://uppy.io/docs/transloadit/#signature
              key: transloaditKey,
            },
            template_id: templateId,
          },
          waitForEncoding: true,
          locale: {
            strings: {
              creatingAssembly: "Preparing upload...",
              creatingAssemblyFailed:
                "Could not create Assembly. Something is wrong in backend code that will need to be fixed!",
              encoding: "Encoding file...",
            },
          },
        })
      );
    }
  }, [uppy, templateId, allowedFileTypes, onBeforeFileAdded, autoProceed]);

  return uppy;
};

export default useUppy;
