/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-script-url */
import { AppButtons, AppText } from "atomic";
import { useState } from "react";
import { AppButton, AppCard, AppCol, AppForm, AppGrid, AppItem, AppRow } from ".";
import { AppPaginatedList } from "./AppPaginatedList";
import { prettyTitle } from "../util";
export const AppCollectionInterface = ({
  store
}) => {
  const {
    setActive,
    activeInstance,
    schema,
    insert,
    collection,
    identifier
  } = store();
  const storeStatus = store(x => x.status);
  const selected = activeInstance();
  const [status, setStatus] = useState(selected ? "activate" : "idle");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
    sizeXs: "24",
    sizeLg: "8",
    sizeMd: "12"
  }, storeStatus !== "booting" && storeStatus !== "importing", "   ", /*#__PURE__*/React.createElement(AppPaginatedList, {
    title: prettyTitle(collection) + " Collection",
    renderItem: item => {
      // eslint-disable-next-line no-script-url
      const bgColor = selected === item ? "light" : undefined;
      const color = selected === item ? "favorite" : undefined;
      const idKeyPath = identifier || "uuid";
      const id = item[idKeyPath];
      return /*#__PURE__*/React.createElement(AppItem, {
        color: bgColor,
        onClick: () => {
          setStatus("switch");
          setActive(id);
          setTimeout(() => {
            setStatus("activate");
          }, 100);
        }
      }, /*#__PURE__*/React.createElement(AppButtons, {
        slot: "start"
      }, /*#__PURE__*/React.createElement(AppText, {
        color: color
      }, item.name)));
    },
    store: store
  })), /*#__PURE__*/React.createElement(AppCol, null, status === "idle" && /*#__PURE__*/React.createElement(AppCard, {
    title: ""
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "outline",
    expand: "full",
    onClick: () => {
      setActive("");
      setStatus("switch");
      setTimeout(() => {
        setStatus("activate");
      }, 100);
    }
  }, "Add New")), schema && schema.definitions && schema.definitions[collection] && (status === "activate" || status === "create") && /*#__PURE__*/React.createElement(AppForm, {
    rootSchema: schema,
    objectSchema: schema.definitions[collection],
    data: selected || {},
    onSubmit: s => {
      setStatus("switch");
      insert(s.name, s).then(zs => {
        console.log(zs);
      }).then(() => {
        setStatus("idle");
      });
    }
  }, () => {
    console.log("render");
  })))));
};