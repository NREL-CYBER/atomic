import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import { AppButton, AppButtons, AppCard, AppChip, AppCol, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import { columnAmount } from "./AppCol";
import AppIcon from "./AppIcon";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
import { selectButtonProps } from "./AppSelectButtons";
import AppTitle from "./AppTitle";

export const AppPaginatedList: React.FC<{
    title?: React.ReactFragment,
    search?: boolean,
    filterCategories?: Record<string, { multi: boolean, options: selectButtonProps[] }>,
    store: UseStore<Store<any>>
    pageSize?: number
    itemSize?: { xs?: columnAmount, md?: columnAmount, lg?: columnAmount }
    renderItem: React.FC<Record<string, any>>
}> = ({ search, renderItem, store, filterCategories, pageSize = 10, itemSize = { xs: "24" }, title }) => {
    const [queryText, setQueryText] = useState<string>("")
    const [options] = useState(filterCategories || {})
    const { query, index } = store()
    const [queryResults, setQueryResults] = useState<any[] | undefined>()
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    const { lg, md, xs } = itemSize;
    useEffect(() => {
        query({ pageSize, page: pageNumber }, { ...selectedOptions }, queryText).then((results) => {
            setQueryResults(results);
        })
    }, [pageNumber, pageSize, query, queryText, selectedOptions, index])
    return <>
        <AppCard headerColor="light" title={
            <><AppTitle>{title}</AppTitle>
                {search && <AppSearchBar debounce={200} onQuery={(q) => {
                    setQueryText(q)
                }} />}
                <AppGrid>
                    {Object.entries(options).slice(0, 3).map(([property, optionParams], i) =>
                        <AppRow key={i}>
                            <AppChip>
                                {property}
                            </AppChip>
                            <AppSelectButtons allowEmpty multi={optionParams.multi} selected={selectedOptions[property] || []} onSelectionChange={(selection) => {
                                setSelectedOptions(x => ({ ...x, [property]: selection }))
                                setPageNumber(0);
                            }} buttons={optionParams.options} >
                            </AppSelectButtons>
                        </AppRow>
                    )}
                    {Object.keys(options).length > 3 && <AppButton>
                        More Filters
                    </AppButton>}
                </AppGrid>

            </>
        }>
            <AppGrid>
                <AppRow>
                    {useMemo(() => queryResults ? queryResults.map((item: any,i) =>
                        <AppCol key={i} sizeLg={lg} sizeMd={md} sizeXs={xs}>
                            {renderItem(item)}
                        </AppCol>
                    ) : <AppLoadingCard />, [lg, md, queryResults, renderItem, xs])}
                </AppRow>
            </AppGrid>
        </AppCard >
        {< AppItem color='clear'>
            {pageNumber !== 0 && queryResults && < AppButtons slot='start'>
                <AppButton onClick={() => {
                    setPageNumber(x => x - 1)
                }}>
                    <AppIcon icon={arrowBackOutline} />Back
                </AppButton>
            </AppButtons>}
            {queryResults && queryResults.length === pageSize && < AppButtons slot='end'>
                <AppButton onClick={() => {
                    setPageNumber(x => x + 1)
                }}>
                    More
                    <AppIcon icon={arrowForwardOutline} />

                </AppButton>
            </AppButtons>}
        </AppItem>}
    </>
}
