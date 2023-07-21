import { CurrencyCode } from '../zeus';
import CollectionItem from './CollectionItem';
import './Collection.css';

type item = {
    price: (
        | {
              min: unknown;
              max: unknown;
          }
        | {
              value: unknown;
          }
    ) & {};
    productAsset?:
        | {
              preview: string;
          }
        | undefined;
    productName: string;
    currencyCode: CurrencyCode;
    slug: string;
};

type CollectionProps = {
    items: item[];
    name: string;
};

export default function Collection({
    items,
    name,
}: CollectionProps): React.ReactElement<CollectionProps> {
    return (
        <div className='content'>
            <h2>{name}</h2>
            <div className='collection-container'>
                {items.map((product: any) => {
                    if (product) {
                        const { productAsset, productName, currencyCode } = product;
                        let price = '0';
                        if (product.price.__typename === 'PriceRange')
                            price =
                                product.price.min +
                                (currencyCode as string) +
                                ' - ' +
                                product.price.max +
                                (currencyCode as string);
                        else price = product.price.value + (currencyCode as string);
                        return (
                            <CollectionItem
                                slug={product.slug as string}
                                price={price}
                                name={productName}
                                image={productAsset.preview}
                            />
                        );
                    }
                    return <></>;
                })}
            </div>
        </div>
    );
}
