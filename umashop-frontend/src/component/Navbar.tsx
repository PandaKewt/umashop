// import { useEffect } from 'react';
import { ValueTypes } from '../zeus';
import { useTypedQuery } from '../zeus/apollo';
import './navbar.css';

export default function Navbar(): React.ReactElement {
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
    const { data: colData } = useTypedQuery(GET_COLLECTION);

    return (
        <div className='nav'>
            <div className='navContent'>
                <div className='leftNav'>
                    <a href='/'>Logo</a>
                </div>
                <ul className='middleNav'>
                    {colData?.collections?.items.map((collection) => {
                        if (collection) {
                            return (
                                <li key={collection.slug}>
                                    <a href={'/collections/' + collection.slug}>
                                        {collection.name}
                                    </a>
                                </li>
                            );
                        }
                        return <></>;
                    })}
                </ul>
                <div className='rightNav'>
                    <input className='searchBar' />
                </div>
            </div>
        </div>
    );
}
