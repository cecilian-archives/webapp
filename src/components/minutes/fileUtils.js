import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";

const ONE_MEGABYTE = 2 ** 20;

export const uppy = Uppy({
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: 128 * ONE_MEGABYTE,
    minNumberOfFiles: 1,
    maxNumberOfFiles: 1,
    allowedFileTypes: [".pdf"],
  },
}).use(Transloadit, {
  params: {
    auth: {
      // TODO: signature auth for Transloadit?
      // https://uppy.io/docs/transloadit/#signature
      key: "750d26800c9411e99ff16dafffcf4ae2",
    },
    template_id: "a34188603a2611e9b44f2f1f0370e845",
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
});
