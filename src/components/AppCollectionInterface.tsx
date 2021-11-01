/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
import { AppButtons, AppText } from "atomic";
import { formComposerProps } from "atomic/dist/components/forms/AppForm";
import { addOutline, pencilOutline } from "ionicons/icons";
import { useState } from "react";
import { Store } from "store";
import { UseBoundStore } from "zustand";
import { AppButton, AppCard, AppCol, AppForm, AppGrid, AppIcon, AppItem, AppRow } from ".";
import { prettyTitle } from "../util";
import { columnAmount } from "./AppCol";
import { AppPaginatedList } from "./AppPaginatedList";
import { selectButtonProps } from "./AppSelectButtons";
import ReactJson from "react-json-view"
import React from "react"
type collectionInterfaceState = "switch" | "idle" | "edit" | "view" | "create"


export const AppCollectionInterface: React.FC<{
    title?: React.ReactFragment,
    search?: boolean,
    editable?: boolean,
    filterCategories?: Record<string, { multi: boolean, options: selectButtonProps[] }>,
    store: UseBoundStore<Store<any>>
    pageSize?: number
    itemSize?: { xs?: columnAmount, md?: columnAmount, lg?: columnAmount }
    renderItem?: React.FC<Record<string, any>>
    formProps?: formComposerProps
    showInsert?: boolean
    renderDetail?: React.FC<Record<string, any>>
}> = ({ store, showInsert, formProps, pageSize = 7, renderDetail }) => {
    const { setActive, activeInstance, schema, collection, index, identifier } = store()
    const storeStatus = store(x => x.status);
    const selected = activeInstance();
    const [status, setStatus] = useState<collectionInterfaceState>(selected ? "view" : "idle")
    const beginInsert = () => {
        changeStatus("edit", "");
    }
    const beginEdit = (active: string) => {
        changeStatus("edit", active);
    }
    const changeStatus = (status: collectionInterfaceState, active: string) => {
        setActive(active);
        setStatus("switch")
        setTimeout(() => {
            setStatus(status)
        }, 100)

    }
    const beginView = (active: string) => {
        changeStatus("view", active)
    }
    if (!identifier) {
        return <>Error colleciton has no identifier</>
    }
    return <>
        <AppGrid>
            <AppRow>
                <AppCol sizeXs="24" sizeLg="8" sizeMd="12">
                    {storeStatus !== "booting" && storeStatus !== "importing"}   <AppPaginatedList pageSize={pageSize} title={
                        <AppItem>
                            <AppButtons slot="start">{prettyTitle(collection)} collection ({index.length})
                            </AppButtons>
                            <AppButtons slot="end">
                                <AppButton color="primary" onClick={beginInsert}>
                                    <AppIcon icon={addOutline} />
                                </AppButton>
                            </AppButtons>
                        </AppItem>}
                        renderItem=
                        {(item: any) => {
                            // eslint-disable-next-line no-script-url
                            const bgColor = selected === item ? "light" : undefined;
                            const color = selected === item ? "favorite" : undefined;
                            const idKeyPath = identifier || "uuid"
                            const id = item[idKeyPath]
                            return <AppItem color={bgColor} onClick={() => beginView(id)} >
                                <AppButtons slot='start'>
                                    <AppText color={color}>
                                        {item.name}
                                    </AppText>
                                </AppButtons>
                            </AppItem>
                        }}
                        store={store}
                    />
                </AppCol>
                <AppCol>
                    {status === "idle" && <AppCard title="">

                        <AppButton fill="outline" expand="full" onClick={beginInsert}>
                            Add New
                        </AppButton>
                    </AppCard>}
                    {status === "view" && <AppCard title={
                        <AppItem>
                            <AppButtons>
                                {prettyTitle(collection) + " # " + selected[identifier]}
                            </AppButtons>
                            <AppButtons slot="end">
                                <AppButton color="primary" onClick={() => {
                                    beginEdit(activeInstance()[identifier])
                                }}>
                                    <AppIcon icon={pencilOutline} />
                                </AppButton>
                            </AppButtons>

                        </AppItem>
                    }>
                        {renderDetail ? renderDetail(selected) : <ReactJson enableClipboard={false} name={false} theme="railscasts" src={selected} />}
                    </AppCard>}

                    {schema && schema.definitions && schema.definitions[collection] && (status === "edit" || status === "create") && <AppForm
                        rootSchema={schema} objectSchema={schema.definitions![collection]} data={selected || {}}
                        onSubmit={(s) => {
                            beginView(s[identifier])
                        }}  >{() => { console.log("render") }}
                    </AppForm>}
                </AppCol>
            </AppRow>
        </AppGrid >

    </ >
}