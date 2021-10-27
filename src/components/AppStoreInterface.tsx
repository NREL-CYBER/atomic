/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
import { AppButtons, AppText } from "atomic";
import { useMemo, useState } from "react";
import { AppButton, AppCard, AppCol, AppContent, AppForm, AppGrid, AppItem, AppRow } from ".";
import { AppPaginatedList } from "./AppPaginatedList";
import { prettyTitle } from "../util";
import { UseBoundStore } from "zustand";
import { Store } from "store";
import { columnAmount } from "./AppCol";
import { selectButtonProps } from "./AppSelectButtons";
export const AppCollectionInterface: React.FC<{
    title?: React.ReactFragment,
    search?: boolean,
    editable?: boolean,
    filterCategories?: Record<string, { multi: boolean, options: selectButtonProps[] }>,
    store: UseBoundStore<Store<any>>
    pageSize?: number
    itemSize?: { xs?: columnAmount, md?: columnAmount, lg?: columnAmount }
    renderItem?: React.FC<Record<string, any>>

}> = ({ store }) => {
    const { setActive, activeInstance, schema, insert, collection, identifier } = store()
    const storeStatus = store(x => x.status);
    const selected = activeInstance();
    const [status, setStatus] = useState<"switch" | "idle" | "activate" | "create">(selected ? "activate" : "idle")

    return <>
        <AppGrid>
            <AppRow>
                <AppCol sizeXs="24" sizeLg="8" sizeMd="12">
                    {storeStatus !== "booting" && storeStatus !== "importing"}   <AppPaginatedList title={prettyTitle(collection) + " Collection"} renderItem=
                        {(item: any) => {
                            // eslint-disable-next-line no-script-url
                            const bgColor = selected === item ? "light" : undefined;
                            const color = selected === item ? "favorite" : undefined;
                            const idKeyPath = identifier || "uuid"
                            const id = item[idKeyPath]
                            return <AppItem color={bgColor} onClick={() => {
                                setStatus("switch")
                                setActive(id)
                                setTimeout(() => {
                                    setStatus("activate")
                                }, 100)
                            }} >
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

                        <AppButton fill="outline" expand="full" onClick={() => {
                            setActive("");
                            setStatus("switch")
                            setTimeout(() => {
                                setStatus("activate")
                            }, 100)

                        }}>
                            Add New
                        </AppButton>
                    </AppCard>}

                    {schema && schema.definitions && schema.definitions[collection] && (status === "activate" || status === "create") && <AppForm
                        rootSchema={schema} objectSchema={schema.definitions![collection]} data={selected || {}}
                        onSubmit={(s) => {
                            setStatus("switch")
                            insert(s.name, s).then((zs) => {
                                console.log(zs)
                            }).then(() => { setStatus("idle") })
                        }}  >{() => { console.log("render") }}
                    </AppForm>}
                </AppCol>
            </AppRow>
        </AppGrid >

    </ >
}