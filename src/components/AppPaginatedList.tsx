import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Store } from "store";
import { UseBoundStore } from "zustand";
import { AppButton, AppButtons, AppCard, AppChip, AppCol, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import { columnAmount } from "./AppCol";
import AppIcon from "./AppIcon";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
import { selectButtonProps } from "./AppSelectButtons";

export const AppPaginatedList: React.FC<{
    search?: boolean,
    filterCategories?: Record<string, { multi: boolean, options: selectButtonProps[] }>,
    store: UseBoundStore<Store<any>>
    pageSize?: number
    itemSize?: { xs?: columnAmount, md?: columnAmount, lg?: columnAmount }
    renderItem: React.FC<Record<string, any>>
}> = ({ search = false, renderItem, store, filterCategories, pageSize = 10, itemSize = { xs: "24" } }) => {
    const [queryText, setQueryText] = useState<string>("")
    const [options] = useState(filterCategories || {})
    const { query } = store()
    const [queryResults, setQueryResults] = useState<any[] | undefined>()
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    const { lg, md, xs } = itemSize;
    useEffect(() => {
        query({ pageSize, page: pageNumber, identifier: "id" }, { ...selectedOptions }, queryText).then((results) => {
            setQueryResults(results);
        })
    }, [pageNumber, pageSize, query, queryText, selectedOptions])
    return <> <AppCard headerColor="light" title={
        <>
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
                {queryResults ? queryResults.map((item: any) =>
                    <AppCol sizeLg={lg} sizeMd={md} sizeXs={xs}>
                        {renderItem({ item })}
                    </AppCol>
                ) : <AppLoadingCard />}
            </AppRow>
        </AppGrid>
    </AppCard >
        <AppItem color='light'>
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
        </AppItem>
    </>
}
