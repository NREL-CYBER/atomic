/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
import { AppButtons, AppText } from "atomic";
import { formNodeProps } from "atomic/dist/components/forms/AppForm";
import { addOutline, pencilOutline } from "ionicons/icons";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import { Store } from "store";
import { UseBoundStore } from "zustand";
import { AppButton, AppCard, AppCol, AppForm, AppGrid, AppIcon, AppItem, AppRow } from ".";
import { useAppSettings } from "../hooks/useAppSettings";
import { prettyTitle } from "../util";
import { columnAmount } from "./AppCol";
import { VisualizeValue } from "./AppJsonDisplay";
import { AppPaginatedList } from "./AppPaginatedList";
import { selectButtonProps } from "./AppSelectButtons";
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
    editFormProps?: Partial<formNodeProps>
    createFormProps?: Partial<formNodeProps>
    showInsert?: boolean
    renderDetail?: React.FC<Record<string, any>>
}> = ({ store, showInsert = true, editFormProps, createFormProps, pageSize = 7, renderDetail, renderItem }) => {
    const { setActive, activeInstance, schema, collection, index, identifier, insert } = store()
    const storeStatus = store(x => x.status);
    const selected = activeInstance();
    const { darkMode } = useAppSettings();
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

    const formProps = status === "create" ? createFormProps : editFormProps;

    return <>
        <AppGrid>
            <AppRow>
                <AppCol sizeXs="24" sizeLg="8" sizeMd="12">
                    {storeStatus !== "booting" && storeStatus !== "importing"}   <AppPaginatedList pageSize={pageSize} title={
                        <AppItem>
                            <AppButtons slot="start">{prettyTitle(collection)} collection ({index.length})
                            </AppButtons>
                            {showInsert && <AppButtons slot="end">
                                <AppButton color="primary" onClick={beginInsert}>
                                    <AppIcon icon={addOutline} />
                                </AppButton>
                            </AppButtons>}
                        </AppItem>}
                        renderItem=
                        {
                            (item: any) => {
                                // eslint-disable-next-line no-script-url
                                const bgColor = selected === item ? "light" : undefined;
                                const color = selected === item ? "favorite" : undefined;
                                const idKeyPath = identifier || "uuid"
                                const id = item[idKeyPath]
                                return <AppItem color={bgColor} onClick={() => beginView(id)} >
                                    {renderItem ? renderItem(item) :
                                        <AppButtons slot='start'>
                                            <AppText color={color}>
                                                {item.name}
                                            </AppText>
                                        </AppButtons>}
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
                                {prettyTitle(collection) + " # " + selected ? selected[identifier] : ""}
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
                        {renderDetail ? renderDetail(selected) : <VisualizeValue propertyInfo={schema.definitions![collection]} value={selected} />}
                    </AppCard>}

                    {schema && schema.definitions && schema.definitions[collection] && (status === "edit" || status === "create") && <AppForm
                        rootSchema={schema} objectSchema={schema.definitions![collection]} data={selected || {}}
                        hiddenFields={formProps?.hiddenFields}
                        {...formProps as any}
                        onSubmit={(s) => {
                            const id = s[identifier];
                            insert(id, s).then(() => {
                                beginView(id)
                                formProps?.onSubmit && formProps.onSubmit(s);
                            })
                        }}  >
                    </AppForm>}
                </AppCol>
            </AppRow>
        </AppGrid >

    </ >
}