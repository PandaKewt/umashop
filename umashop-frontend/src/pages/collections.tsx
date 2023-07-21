import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedQuery } from '../zeus/apollo';
import Collection from '../component/Collection';
import { SortOrder } from '../zeus';
import './collections.css';

export default function CollectionsPage(): React.ReactElement {
    const { slug, page: pageSub } = useParams();
    const page = pageSub ? parseInt(pageSub) : 1;
    const navigate = useNavigate();
    const productPerPage = 8;

    const [totalPage, setTotalPage] = useState<number | null>(null);
    if (!slug) navigate('/');
    const { loading, error, data } = useTypedQuery({
        collection: [{ slug: slug }, { name: true }],
        search: [
            {
                input: {
                    collectionSlug: slug,
                    groupByProduct: true,
                    inStock: true,
                    sort: {
                        name: SortOrder.ASC,
                    },
                    skip: page ? (page - 1) * productPerPage : 0,
                    take: productPerPage,
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
                totalItems: true,
            },
        ],
    });

    useEffect(() => {
        if (data?.search?.items?.length === 0) navigate('/');
        if (!loading)
            setTotalPage(Math.ceil(parseInt(data?.search.totalItems + '') / productPerPage));
    }, [data, loading, page, totalPage, navigate]);
    if (!data) return <></>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <Collection name={data?.collection?.name + ''} items={data?.search.items} />
            <ul className='pageSelector'>
                {Array.from(Array(totalPage).keys()).map((i) => (
                    <li key={i}>
                        <a
                            className={page === i + 1 ? 'selected' : ''}
                            href={`/collections/${slug}/${i + 1}`}>
                            {i + 1}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}
