window.addEventListener("load", function() {
  let category = document
    .querySelector("#wayfinding-breadcrumbs_feature_div ul")
    .getElementsByTagName("li");
  let image = document.querySelector("[data-a-image-name]").src;
  let productTitle = document.querySelector("#productTitle").outerText;
  let by = document.querySelector("#bylineInfo").outerText;
  let categorie = category[category.length - 1].outerText;
  let link = `https://localhost:3000?image=${image}&productTitle=${productTitle}&by=${by}&categorie=${categorie}`;

  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:fixed;bottom:0;z-index:99999;border:none;left:20px;bottom:20px;"
  );
  iframe.setAttribute("allowFullScreen", "");
  iframe.setAttribute("src", link);
  document.querySelector("body").appendChild(iframe);
  this.setTimeout(() => {
    console.log("he IframeResize");
    window.iFrameResize(
      {
        log: false,
        sizeWidth: true,
        minHeight: 20,
        resizeFrom: "parent",
        messageCallback: function(messageData) {
          switch (messageData.message) {
            case Events.FULL_SCREEN:
              originalStyle = messageData.iframe.getAttribute("style");
              messageData.iframe.style =
                "position: fixed;\n" +
                "    z-index: 99999;\n" +
                "    border: none;\n" +
                "    left: 0px;\n" +
                "    right: 0px;\n" +
                "    bottom: 0px;\n" +
                "    top: 0;\n" +
                "    height: 100%;\n" +
                "    width: 100%;";

              break;
            case Events.REGULAR_SCREEN:
              messageData.iframe.style = originalStyle;
              break;
            default:
              console.log("Undefined event ", messageData);
          }
        }
      },
      iframe
    );
  }, 3000);
});
