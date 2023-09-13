"use strict";

export const responseToDownloadable = (httpResponse) => {
  const url = window.URL.createObjectURL(httpResponse.data);

  const contentDisposition = httpResponse.headers["content-disposition"];

  let fileName = "unknown";
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
  }
  return {
    url,
    fileName,
  };
};

export const invalidate = (url) => {
  window.URL.revokeObjectURL(url);
};

export const download = ({ url, fileName }, revoke = true) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (revoke) {
    invalidate(url);
  }
};

// temporary utility function to parse validation options provided by MEI Garage
// will be deprecated once new version of MEI Garage API is available
export const parseValidationOptions = (validations) => {
  const notationProfiles = {
    all: "MEI All",
    any: "MEI anyStart",
    cmn: "MEI CMN",
    mensural: "MEI Mensural",
    neumes: "MEI Neumes",
  };
  const MEIversions = {
    211: "2.1.1",
    300: "3.0.0",
    400: "4.0.0",
    401: "4.0.1",
  };
  return Object.entries(validations).map(([key, value]) => {
    const pocket = key.split("-");
    const regxLetters = /[a-z]+/gi;
    const regxNumbers = /[0-9]+/gi;
    return Object.assign(
      {
        format: pocket[0].match(regxLetters)[0],
        version:
          pocket[0].search(/[0-9]/) > -1
            ? MEIversions[pocket[0].match(regxNumbers)[0]] ||
              "(" + pocket[0].match(regxNumbers)[0] + ")"
            : "dev",
        notation: pocket[1]
          ? notationProfiles[pocket[1]] || "(" + pocket[1] + ")"
          : "MEI all",
      },
      value
    );
  });
};
