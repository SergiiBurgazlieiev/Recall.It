/*global chrome*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import FindReplace from "@material-ui/icons/FindReplace";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import get from "lodash/get";
import { CircularProgress } from "@material-ui/core";

import ProductItem from "./productItem";
import noProduct from "../../../assets/images/noProduct.png";

const useStyles = makeStyles(theme => ({
  root: {
    width: 400
  },
  media: {
    height: 0,
    backgroundSize: "contain",
    marginTop: 7,
    paddingTop: "49.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [listProducts, setListProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    description: "",
    isDataRequest: true
  });

  if (product.isDataRequest) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      console.log("try to send request");
      chrome.tabs.sendMessage(tabs[0].id, { request: "GET_DATA" }, function(
        response
      ) {
        console.log(response);
        setIsLoadingProduct(true);
        setExpanded(false);

        fetch("https://product-scrap.herokuapp.com/scraping/get", {
          method: "POST",
          body: { url: response.url }
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(
            data => {
              setIsLoadingProduct(false);
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
            },

            () => {
              alert("failed get");

              setIsLoadingProduct(false);
              setProduct({
                image: response.image,
                name: response.productTitle,
                by: response.by,
                categorie: response.categorie,
                isDataRequest: false
              });
            }
          );
      });
    });
  }

  return (
    <Card className={classes.root}>
      {console.log(product)}
      <CssBaseline />
      {!isLoadingProduct ? (
        <>
          <CardMedia
            className={classes.media}
            image={get(product, "image", "") || noProduct}
            title="product"
          />
          {product.image && (
            <>product
              <CardContent>
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>
                    {get(product, "name", "").substring(0, 45) + "..."}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ color: "#0000008a", fontSize: "0.85rem" }}>
                        MADE BY
                      </div>
                      <div>{get(product, "by", "")}</div>
                    </div>
                    <div>
                      <div style={{ color: "#0000008a", fontSize: "0.85rem" }}>
                        CATEGORY
                      </div>
                      <div>{get(product, "categorie", "")}</div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardActions disableSpacing>
                <Button
                  onClick={() => {
                    setLoading(true);
                    setExpanded(false);

                    fetch(
                      `https://www.saferproducts.gov/RestWebServices/Recall?format=json&ProductType=child`
                    )
                      // We get the API response and receive data in JSON format...
                      .then(response => response.json())
                      // ...then we update the users state
                      .then(data => {
                        setListProducts(data);
                        setExpanded(true);
                        setLoading(false);
                      });
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={15} /> : <FindReplace />}{" "}
                  &nbsp;Find Similar Products
                </Button>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {listProducts.map((item, key) => (
                    <ProductItem key={key} {...item} />
                  ))}
                </CardContent>
              </Collapse>
            </>
          )}
        </>
      ) : (
        <div
          style={{
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress size={30} />
        </div>
      )}
    </Card>
  );
}
