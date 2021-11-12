import { ItemReorderEventDetail } from "@ionic/core"
import { AppBadge, AppChip, AppGrid, AppLabel, AppText, AppTitle } from "atomic"
import produce from "immer"
import { isArray } from "lodash"
import React, { useState } from "react"
import { AppItem } from ".."

export interface appTableProps {
    columns: string[]
    data: any[]
}
export interface appListTableProps {
    rows: string[]
    data: any[]
    type: string
}

export const AppTableList: React.FC<appListTableProps> = ({ rows, type, data }) => {
    const [rowName, rowNames] = useState(rows)

    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        {
            data.map((item, i) => <div style={{
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {rowName.map((row) =>
                    <>
                        <tr style={{
                            padding: 10,
                            backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
                        }}>
                            <div style={{
                                textAlign: "left"
                            }}>
                                <AppChip>
                                    <AppBadge color="clear">
                                        {row}
                                    </AppBadge>
                                    <AppGrid>

                                        <AppLabel>
                                            {['string', 'number'].includes(typeof item[row]) ? item[row] : <></>}
                                            {['object'].includes(typeof item[row]) && isArray(item[row]) && <>[{item[row].length}]</>}
                                        </AppLabel>
                                    </AppGrid>
                                </AppChip>
                                {['object'].includes(typeof item[row]) && !isArray(item[row]) && < AppTableList type={row} rows={Object.keys(item[row])} data={item[row]} />}
                            </div>
                        </tr></>
                )}
            </div>
            )
        }
    </table >
}

export const AppTable: React.FC<appTableProps> = ({ columns, data }) => {
    const [columnNames, setColumnNames] = useState(columns)

    function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
        const newNames = produce<string[]>(columnNames, (names) => {
            const { from, to } = event.detail;
            names[from] = names.splice(to, 1, names[from])[0]
        });
        setColumnNames(newNames)

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        event.detail.complete();
    }
    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        <tr style={{ borderRadius: 10, backgroundColor: "rgba(2,2,2,0.1)" }}>
            {/* <AppReorderGroup disabled={false} onReorder={doReorder}> */}
            {columnNames.map((name) => <th>
                <AppTitle>
                    {name}
                </AppTitle>
            </th>
            )}
        </tr>
        {/* </AppReorderGroup> */}
        {
            data.map((item, i) => <tr style={{
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {columnNames.map((column) =>
                    <td style={{
                        padding: 10,
                        backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
                    }}>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <AppLabel>
                                {(item[column])}
                            </AppLabel>
                        </div>
                    </td>
                )}
            </tr>
            )
        }
    </table >
}
