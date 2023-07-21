import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedQuery } from '../zeus/apollo';
import './product.css';

export default function ProductPage(): React.ReactElement {
    const { slug } = useParams();

    const { loading, error, data } = useTypedQuery({
        product: [
            { slug: slug },
            {
                name: true,
                assets: { source: true, preview: true },
                variants: { name: true, price: true, assets: { source: true, preview: true } },
            },
        ],
    });
    useEffect(() => {
        console.log(slug);
    }, [slug]);

    useEffect(() => {
        console.log(loading, error, data);
    }, [loading, error, data]);

    return (
        <div className='product-container'>
            <div className='product-image'></div>
        </div>
    );
}
