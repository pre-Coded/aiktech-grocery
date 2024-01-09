import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { LoadingCard } from '../../Pages/AddContent/ContentCards';
import { toast } from 'react-toastify';

const InfiniteScroller = ({ 
        children, 
        apiCall,
        page, 
        setPage,
        fullItem, 
        setFullItem,
        errorMsg
    }) => {

    const isMounted = useRef(true);
    const [hasMore, toggleHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchItem = async (newPage) => {
        try {
            const data = {
                "page": newPage
            }

            const response = await apiCall(data);

            if (response.data.length === 0) {
                toggleHasMore(false);
            } else {
                const data = response.data;
                const uniqueData = [
                    ...new Map([...fullItem, ...data].map((item) => [item.id, item])).values(),
                ];
                if (uniqueData.length === fullItem.length) {
                    toggleHasMore(false)
                }

                setPage(newPage);
                setFullItem(uniqueData);
            }
        } catch (e) {
            toast.error(errorMsg);
            toggleHasMore(false)
        }
    }

    const loadMore = async () => {
        if (!loading && isMounted.current) {
            console.log("loading");
            try {
                setLoading(true);
                await fetchItem(page + 1);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    return (
        <InfiniteScroll
            style={{
                width : '100%',
                height : '100%',
            }}

            hasMore={hasMore}
            loadMore={!loading && loadMore}
            loader={
                <LoadingCard 
                    num={30}
                />
            }
        >
            {
                children
            }
        </InfiniteScroll>
    );
};

export default InfiniteScroller;
