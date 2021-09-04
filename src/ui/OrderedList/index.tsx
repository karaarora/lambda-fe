import React from 'react';
import { Link } from 'react-router-dom';

import { OrderedListItem, OrderedListProps } from './types';

const OrderedList: React.FC<OrderedListProps> = ({ list, title }): JSX.Element => <div className="my-20">
        {title && <span className="text-primary-bold text-sm font-bold">{title}</span>}
        <ol className="text-primary-normal mt-2">
            {list.map(({ name, onClick }: OrderedListItem) => (
                <li key={name}>
                    <Link className="text-sm font-medium leading-7" onClick={onClick} to="/">{name}</Link>
                </li>
            ))}
        </ol>
    </div>;

export default OrderedList;