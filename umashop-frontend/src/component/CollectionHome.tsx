import Collection from './Collection';
import { SortOrder } from '../zeus';
import { useTypedQuery } from '../zeus/apollo';
// import { useEffect } from 'react';

interface CollectionProps {
    slug: string;
    name: string;
}

export default function CollectionHomePage({
    name,
    slug,
}: CollectionProps): React.ReactElement<CollectionProps> {
    const {
        loading: prodLoad,
        error: prodErr,
        data: prodData,
    } = useTypedQuery({
        search: [
            {
                input: {
                    collectionSlug: slug,
                    groupByProduct: true,
                    inStock: true,
                    sort: {
                        name: SortOrder.ASC,
                    },
                    take: 8,
                },
            },
            {
                items: {
                    slug: true,
                    productName: true,
                    productAsset: {
                        preview: true,
                    },
                    currencyCode: true,
                    price: {
                        '...on PriceRange': {
                            min: true,
                            max: true,
                        },
                        '...on SinglePrice': {
                            value: true,
                        },
                    },
                },
            },
        ],
    });

    // useEffect(() => {
    //     console.log(prodLoad, prodErr, prodData);
    // }, [prodData, prodErr, prodLoad]);

    if (prodErr) return <div>Error</div>;
    if (prodLoad) return <div>Loading...</div>;
    if (!prodData) return <></>;
    // return <></>;
    else return <Collection items={prodData?.search.items} name={name} />;
}
