import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { AppButton, AppButtons, AppCard, AppChip, AppCol, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import AppIcon from "./AppIcon";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
import AppTitle from "./AppTitle";
export const AppPaginatedList = ({
  search,
  renderItem,
  store,
  filterCategories,
  pageSize = 10,
  itemSize = {
    xs: "24"
  },
  title
}) => {
  const [queryText, setQueryText] = useState("");
  const [options] = useState(filterCategories || {});
  const {
    query,
    index
  } = store();
  const [queryResults, setQueryResults] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const {
    lg,
    md,
    xs
  } = itemSize;
  useEffect(() => {
    query({
      pageSize,
      page: pageNumber
    }, { ...selectedOptions
    }, queryText).then(results => {
      setQueryResults(results);
    });
  }, [pageNumber, pageSize, query, queryText, selectedOptions, index]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "light",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppTitle, null, title), search && /*#__PURE__*/React.createElement(AppSearchBar, {
      debounce: 200,
      onQuery: q => {
        setQueryText(q);
      }
    }), /*#__PURE__*/React.createElement(AppGrid, null, Object.entries(options).slice(0, 3).map(([property, optionParams], i) => /*#__PURE__*/React.createElement(AppRow, {
      key: i
    }, /*#__PURE__*/React.createElement(AppChip, null, property), /*#__PURE__*/React.createElement(AppSelectButtons, {
      allowEmpty: true,
      multi: optionParams.multi,
      selected: selectedOptions[property] || [],
      onSelectionChange: selection => {
        setSelectedOptions(x => ({ ...x,
          [property]: selection
        }));
        setPageNumber(0);
      },
      buttons: optionParams.options
    }))), Object.keys(options).length > 3 && /*#__PURE__*/React.createElement(AppButton, null, "More Filters")))
  }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, useMemo(() => queryResults ? queryResults.map((item, i) => /*#__PURE__*/React.createElement(AppCol, {
    key: i,
    sizeLg: lg,
    sizeMd: md,
    sizeXs: xs
  }, renderItem(item))) : /*#__PURE__*/React.createElement(AppLoadingCard, null), [lg, md, queryResults, renderItem, xs])))), /*#__PURE__*/React.createElement(AppItem, {
    color: "clear"
  }, pageNumber !== 0 && queryResults && /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setPageNumber(x => x - 1);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowBackOutline
  }), "Back")), queryResults && queryResults.length === pageSize && /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setPageNumber(x => x + 1);
    }
  }, "More", /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  })))));
};