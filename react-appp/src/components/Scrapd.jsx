import Header from './Header';
import diron from '../img/diron.jpg';
import dbook from '../img/dbook.jpg'
import dnew from '../img/dnew.jpg'
import dcardboard from '../img/dcardboard.jpg'
import dcopper from '../img/dcopper.jpg'
import dsteel from '../img/dsteel.jpg'
import dalu from '../img/dalu.jpg'
import dfan from '../img/dfan.jpg'
import dplastic from '../img/dplastic.jpg'
import drefi from '../img/drefi.jpg'
import dwash from '../img/dwash.jpg'
import dglass from '../img/dglass.jpg'


function ScrapPrices() {
    const scrapItems = [
        {
            name: "Newspaper",
            description: "Old newspapers suitable for recycling.",
            price: "₹10–15 per kg",
            image: dnew
        },
        {
            name: "Books/Copies",
            description: "Used books and notebooks for paper recycling.",
            price: "₹10–14 per kg",
            image: dbook
        },
        {
            name: "Cardboard (Gatta)",
            description: "Corrugated cardboard boxes and sheets.",
            price: "₹5–10 per kg",
            image: dcardboard
        },
        {
            name: "Plastic (Mixed)",
            description: "Assorted recyclable plastic materials.",
            price: "₹10–25 per kg",
            image: dplastic
        },
        {
            name: "Iron Scrap",
            description: "Ferrous metal scrap from various sources.",
            price: "₹20–40 per kg",
            image: diron
        },
        {
            name: "Steel (Stainless Steel)",
            description: "Stainless steel items and offcuts.",
            price: "₹30–45 per kg",
            image: dsteel
        },
        {
            name: "Aluminum",
            description: "Aluminum scrap including cans and frames.",
            price: "₹60–100 per kg",
            image: dalu
        },
        {
            name: "Copper",
            description: "Copper wires and components.",
            price: "₹400–700 per kg",
            image: dcopper
        },
        {
            name: "Ceiling Fan",
            description: "Old ceiling fans containing metal parts.",
            price: "₹27–36 per kg",
            image: dfan
        },
        {
            name: "Washing Machine (Front Load)",
            description: "Front load washing machines for recycling.",
            price: "₹500–700 per piece",
            image: dwash
        },
        {
            name: "Refrigerator (Double/Single Door)",
            description: "Double/Single door refrigerators for recycling.",
            price: "₹1000–1500 per piece",
            image: drefi
        },
        {
            name: "Glass",
            description: "Glass bottles and other recyclable glass materials.",
            price: 5,
            image: dglass
        },
     
    ];

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h2 className="text-center text-success mb-4">♻️ Scrap Prices</h2>
                <div className="row">
                    {scrapItems.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-lg">
                                <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'fixed' }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title text-info fw-bold">{item.name}</h5>
                                    <p className="card-text text-muted">{item.description}</p>
                                    <h6 className="text-primary fw-bold">💰 Price: ₹{item.price} per kg</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScrapPrices;
