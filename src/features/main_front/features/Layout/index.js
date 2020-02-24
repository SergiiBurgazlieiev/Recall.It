/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Logo from "../../components/logo";
import Products from "../products";
import Result from "../../components/result";
import { getProduct, scrapProduct } from "../../apis/product";
import "../../assets/css/theme.css";

export default () => {
  const [displayProductsResult, setDisplayProductsResult] = useState(false);
  const [displayListOfProducts, setDisplayListOfProducts] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [state, setState] = useState({
    productsByName: [],
    productsByType: [],
    productsByManufacturer: []
  });
  const [product, setProduct] = useState({
    image: "",
    name: "",
    description: "",
    isDataRequest: true
  });

  if (product.isDataRequest) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { request: "GET_DATA" },
        async function(response) {
          try {
            let data = await scrapProduct({ url: response.url });
            console.log("data", data);
            if (data.success)
              setProduct({
                image: data.image,
                name: data.productTitle,
                by: data.by,
                categorie: data.categorie,
                isDataRequest: false
              });
            else
              setProduct({
                image: response.image,
                name: response.productTitle,
                by: response.by,
                categorie: response.categorie,
                isDataRequest: false
              });

            console.log("response", response);
          } catch (e) {
            setProduct({
              image: response.image,
              name: response.productTitle,
              by: response.by,
              categorie: response.categorie,
              isDataRequest: false
            });
          }
        }
      );
    });
  }

  const retrieveProductData = async () => {
    try {
      console.log(product);
      let productsByName = await getProduct({
        ProductName: product.productTitle,
        format: "json"
      });
      console.log(productsByName);

      let productsByType = await getProduct({
        ProductType: product.categorie,
        format: "json"
      });
      let productsByManufacturer = await getProduct({
        Manufacturer: product.by,
        format: "json"
      });
      console.log(productsByType);
      console.log(productsByManufacturer);

      setState({ productsByName, productsByType, productsByManufacturer });
    } catch (err) {}
  };

  useEffect(() => {
    if (!product.isDataRequest) retrieveProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <div className="App">
      {displayProductsResult ? (
        <Result
          productsByNameNumber={state.productsByName.length}
          productsByTypeNumber={state.productsByType.length}
          productsByManufacturerNumber={state.productsByManufacturer.length}
          resultsOff={val => {
            setDisplayProductsResult(!displayProductsResult);
            setDisplayListOfProducts(!displayListOfProducts);
            setProductValue(val);
          }}
        />
      ) : null}
      {displayListOfProducts ? (
        <Products
          prdValue={productValue}
          productsData={[
            state.productsByName,
            state.productsByType,
            state.productsByManufacturer
          ]}
        />
      ) : null}
      <Logo
        showResults={() => {
          setDisplayProductsResult(!displayProductsResult);
          setDisplayListOfProducts(false);
        }}
      />
    </div>
  );
};
