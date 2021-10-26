import { AppButton, AppButtons, AppCard, AppChip, AppCol, AppGrid, AppRow, AppSearchBar, AppSelectButtons } from "./";
import React, { useEffect, useState } from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import AppItem from "./AppItem";
import AppLoadingCard from "./AppLoadingCard";
import { selectButtonProps, selectButtonsProps } from "./AppSelectButtons";
import { columnAmount } from "./AppCol";
import { AppSpinner } from "atomic";

export const AppPaginatedList: React.FC<{
    filterCategories?: Record<string, { multi: boolean, options: selectButtonProps[] }>,
    store: UseStore<Store<any>>
    pageSize?: number
    itemSize?: { xs?: columnAmount, md?: columnAmount, lg?: columnAmount }
    renderItem: React.FC<{ item: Record<string, any> }>
}> = ({ renderItem, store, filterCategories, pageSize = 10, itemSize = { xs: "24" } }) => {
    const [query, setQuery] = useState<string>()
    const [options] = useState(filterCategories || {})
    const { page, paginate } = store()
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    const { lg, md, xs } = itemSize;
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
                        <AppSelectButtons allowEmpty multi={optionParams.multi} selected={selectedOptions[property] || []} onSelectionChange={(selection) => {
                            setSelectedOptions(x => ({ ...x, [property]: selection }))
                            setPageNumber(1);
                        }} buttons={optionParams.options} >
                        </AppSelectButtons>
                    </AppRow>
                </>)}
            </AppGrid>

        </>
    }>
        <AppGrid>
            <AppRow>

                {page ? page.map(item =>
                    <AppCol sizeLg={lg} sizeMd={md} sizeXs={xs}>
                        {renderItem({ item })}
                    </AppCol>
                ) : <AppSpinner />}
            </AppRow>
        </AppGrid>
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
