import './header.css';

export default function Header(): React.ReactElement {
    return (
        <div className='header'>
            <div className='leftHeader'>
                <p>09xx</p>
            </div>

            <div className='rightHeader'>
                <p>Tài Khoản</p>
                <p>Giỏ hàng</p>
            </div>
        </div>
    );
}
