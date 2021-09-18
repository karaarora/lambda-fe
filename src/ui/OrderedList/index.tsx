import React from 'react';
import { Link } from 'react-router-dom';

import { OrderedListItem, OrderedListProps } from './types';

const OrderedList: React.FC<OrderedListProps> = ({ list, title, isPill }): JSX.Element => <div 
    aria-label={isPill ? "pill-list":"list"} className={isPill ? "mt-5 ml-3":"my-20"}>
        {title && !isPill && <span className="text-primary-bold text-sm font-bold">{title}</span>}
        <ol className={`text-primary-normal mt-2 ${isPill ? "flex w-full overflow-scroll no-scrollbar":""}`}>
            {list.map(({ name, to, active, onClick }: OrderedListItem) => (
                <li key={name}>
                    <Link className={isPill? `text-xs leading-7 hover:opacity-75 rounded-3xl mr-4 block w-max
                        px-4 py-1 ${active ? "text-primary-bold font-bold bg-white":"font-medium bg-primary text-white" }`: 
                        `text-sm leading-7 hover:opacity-75 ${active ? "text-primary-bold font-bold":"font-medium" }`} 
                    key={name} onClick={onClick} to={to}>{name}</Link>
                </li>
            ))}
        </ol>
    </div>;

export default OrderedList;