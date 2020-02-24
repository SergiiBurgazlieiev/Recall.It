import React from "react";
import get from "lodash/get";

export default ({ product }) => {
  return (
    <div>
      <img
        src={get(
          product,
          ["Images", "0", "URL"],
          "https://dapp.dblog.org/img/default.jpg"
        )}
        alt="n/a"
        className="imgWindow"
      />
      <p>{get(product, "RecallDate", "")}</p>
      <p>{get(product, "Title", "")}</p>
      <p>Hazard {get(product, ["Hazards", "0", "Name"], "")} </p>
      <p>Description {get(product, "Description", "")} </p>
    </div>
  );
};
