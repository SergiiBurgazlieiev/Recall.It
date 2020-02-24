export function prepareQuery(params) {
  if (params && Object.keys(params).length === 0) return "";
  else
    return (
      "?" +
      Object.keys(params)
        .map(key => key + "=" + params[key])
        .join("&")
    );
}
