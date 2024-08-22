import React, { createContext, useState, useContext, useCallback } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 50;

    const fetchMoreItems = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        fetch(
            `https://gist.githubusercontent.com/diondree/92e4518ca7529e1f4d1300993e5cc287/raw/5e689bb33a11a2e55cb11e6f413ddea14c4be804/mock-data-10000.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                const newItems = data.slice(start, end).map((item) => ({
                    firstName: item.first_name || 'No First Name',
                    lastName: item.last_name || 'No Last Name',
                }));

                setItems((prevItems) => [...prevItems, ...newItems]);

                if (newItems.length < pageSize) {
                    setHasMore(false); // No more data to load
                }

                setPage(page + 1);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setHasMore(false); // Stop loading on error
            });
    }, [loading, hasMore, page]);


    return (
        <DataContext.Provider value={{ items, loading, hasMore, fetchMoreItems }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
