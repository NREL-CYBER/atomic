import { AppButton, AppButtons, AppCard, AppChip, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import React, { useEffect, useState } from "react";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
export const AppPaginatedList = ({
  render,
  store,
  filterCategories,
  pageSize = 10
}) => {
  const [query, setQuery] = useState();
  const [options] = useState(filterCategories || {});
  const {
    page,
    paginate
  } = store();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  useEffect(() => {
    paginate({
      pageSize,
      page: pageNumber,
      identifier: "id"
    }, { ...selectedOptions,
      query: [query]
    });
  }, [pageNumber, pageSize, paginate, query, selectedOptions]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "light",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppSearchBar, {
      onQuery: q => {
        setQuery(q);
      }
    }), /*#__PURE__*/React.createElement(AppGrid, null, Object.entries(options).map(([property, optionParams], i) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRow, {
      key: i
    }, /*#__PURE__*/React.createElement(AppChip, null, property), /*#__PURE__*/React.createElement(AppSelectButtons, {
      multi: optionParams.multi,
      selected: selectedOptions[property] || [],
      onSelectionChange: selection => {
        setSelectedOptions(x => ({ ...x,
          [property]: selection
        }));
        setPageNumber(1);
      },
      buttons: optionParams.values
    }))))))
  }, page ? page.map(i => render({
    item: i
  })) : /*#__PURE__*/React.createElement(AppLoadingCard, null)), /*#__PURE__*/React.createElement(AppItem, {
    color: "light"
  }, pageNumber !== 1 && page && page.length !== 0 && /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setPageNumber(x => x - 1);
    }
  }, "Back")), page && page.length === pageSize && /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setPageNumber(x => x + 1);
    }
  }, "next"))));
};