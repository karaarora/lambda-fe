import { MouseEventHandler } from "react";

export type OrderedListProps = {
    list: Array<OrderedListItem>;
    title?: string;
    isPill?: boolean;
}

export type OrderedListItem = {
    name: string;
    to: any;
    active: boolean;
    onClick: MouseEventHandler<HTMLAnchorElement>  
}