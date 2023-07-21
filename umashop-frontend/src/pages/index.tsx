import Collection from '../component/CollectionHome';
import { useTypedQuery } from '../zeus/apollo';
import { ValueTypes } from '../zeus';
import './index.css';

export default function HomePage(): React.ReactElement {
    const GET_COLLECTION: ValueTypes['Query'] = {
        collections: [
            {
                options: {
                    topLevelOnly: true,
                },
            },
            {
                items: {
                    name: true,
                    slug: true,
                },
            },
        ],
    };
    const { loading: colLoading, error: colErr, data: colData } = useTypedQuery(GET_COLLECTION);

    if (colErr) return <div>Error</div>;
    if (colLoading) return <div>Loading...</div>;
    else
        return (
            <>
                <div className='hero'></div>
                {colData?.collections?.items.map((collection) => {
                    if (collection)
                        return (
                            <Collection
                                key={collection.slug}
                                slug={collection.slug}
                                name={collection.name}
                            />
                        );
                    return <></>;
                })}
            </>
        );
}
