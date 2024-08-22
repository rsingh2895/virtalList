import React, { useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useData } from '../Context/DataContext';
import '../App.css';
import Header from './Header';

const Row = ({ index, style, data }) => {
    const item = data.items[index];

    if (!item) {
        return (
            <div style={style} className="loading-indicator">
                Loading...
            </div>
        );
    }

    const { firstName, lastName } = item;

    return (
        <div style={style} className="list-item">
            {`${firstName} ${lastName}`}
        </div>
    );
};

const VirtualizedList = () => {
    const { items, loading, hasMore, fetchMoreItems } = useData();
    // console.log(items)
    const onItemsRendered = ({ visibleStopIndex }) => {
        if (!loading && hasMore && visibleStopIndex >= items.length - 10) {
            fetchMoreItems();
        }
    };

    useEffect(() => {
        fetchMoreItems(); // Initial load
    }, []);

    return (
        <>
            <Header />
            <List
                height={500}
                itemCount={items.length}
                itemSize={50}
                width="100%"
                itemData={{ items }}
                onItemsRendered={onItemsRendered}
                className="parent"
            >
                {Row}
            </List>
        </>
    );
};

export default VirtualizedList;
