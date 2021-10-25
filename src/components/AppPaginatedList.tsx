import { AppButton, AppButtons, AppCard, AppChip, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import React, { useEffect, useState } from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
import { selectButtonProps, selectButtonsProps } from "./AppSelectButtons";

export const AppPaginatedList: React.FC<{
    filterCategories?: Record<string, { multi: boolean, values: selectButtonProps[] }>,
    store: UseStore<Store<any>>
    pageSize?: number
    render: React.FC<{ item: Record<string, any> }>
}> = ({ render, store, filterCategories, pageSize = 10 }) => {
    const [query, setQuery] = useState<string>()
    const [options] = useState(filterCategories || {})
    const { page, paginate } = store()
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    useEffect(() => {
        paginate({ pageSize, page: pageNumber, identifier: "id" }, { ...selectedOptions, query: [query] })
    }, [pageNumber, pageSize, paginate, query, selectedOptions])

    return <> <AppCard headerColor="light" title={
        <>
            <AppSearchBar onQuery={(q) => {
                setQuery(q)
            }} />
            <AppGrid>
                {Object.entries(options).map(([property, optionParams], i) => <>
                    <AppRow key={i}>
                        <AppChip>
                            {property}
                        </AppChip>
                        <AppSelectButtons multi={optionParams.multi} selected={selectedOptions[property] || []} onSelectionChange={(selection) => {
                            setSelectedOptions(x => ({ ...x, [property]: selection }))
                            setPageNumber(1);
                        }} buttons={optionParams.values} >
                        </AppSelectButtons>
                    </AppRow>
                </>)}
            </AppGrid>

        </>
    }>

        {page ? page.map(i =>
            render({ item: i })
        ) : <AppLoadingCard />}
    </AppCard >
        <AppItem color='light'>
            {pageNumber !== 1 && page && page.length !== 0 && < AppButtons slot='start'>
                <AppButton onClick={() => {
                    setPageNumber(x => x - 1)
                }}>Back</AppButton>
            </AppButtons>}
            {page && page.length === pageSize && < AppButtons slot='end'>
                <AppButton onClick={() => {
                    setPageNumber(x => x + 1)
                }}>next</AppButton>
            </AppButtons>}
        </AppItem>
    </>
}
