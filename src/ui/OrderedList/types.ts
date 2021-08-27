import React from "react-router/node_modules/@types/react";

export type OrderedListProps = {
    list: Array<OrderedListItem>;
    title?: string;
}

export type OrderedListItem = {
    name: string;
    onClick: (e: Event) => void;
}

type Event = React.MouseEvent<HTMLElement>;