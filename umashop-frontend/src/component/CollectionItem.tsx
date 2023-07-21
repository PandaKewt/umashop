import './CollectionItem.css';

type CollectionItemProps = {
    name: string;
    slug: string;
    price: string;
    image?: string;
    variants?: string[];
};

export default function CollectionItem({
    name,
    slug,
    price,
    image,
    variants,
}: CollectionItemProps): React.ReactElement<CollectionItemProps> {
    return (
        <div className='collection'>
            <div className='collection-content'>
                <div className='collection-item-image'>
                    <img src={image} alt={name} />
                </div>
                <div className='variants-list'>
                    {variants
                        ? variants.map((variant) => (
                              <div className='variant-item'>
                                  <img src={variant} alt={variant} />
                              </div>
                          ))
                        : null}
                </div>
                <div className='item-info'>
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
            </div>
            <div className='collection-action'>
                <a href={'#d'}>Mua ngay</a>
                <a href={`/products/${slug}`}>Xem chi tiết</a>
            </div>
        </div>
    );
}
