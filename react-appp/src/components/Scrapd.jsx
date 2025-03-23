import Header from './Header';

function ScrapPrices() {
    const scrapItems = [
        {
            name: "Plastic",
            description: "Recyclable plastic waste, bottles, and containers.",
            price: 15,
            image: "https://www.recyclingtoday.com/fileuploads/image/recycling-plastic.jpg"
        },
        {
            name: "Newspaper",
            description: "Old newspapers, magazines, and books.",
            price: 8,
            image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Newspaper_bundles.jpg"
        },
        {
            name: "Copper",
            description: "Scrap copper wires and pipes.",
            price: 700,
            image: "https://www.scrapmonster.com/images/news/scrap-copper.jpg"
        },
        {
            name: "Aluminum",
            description: "Used aluminum cans, foil, and scrap parts.",
            price: 190,
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Aluminium_cans_scrap.jpg"
        },
        {
            name: "Glass",
            description: "Glass bottles and other recyclable glass materials.",
            price: 5,
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Recycling_Glass.jpg"
        },
        {
            name: "Iron",
            description: "Rusty iron rods, tools, and sheets.",
            price: 50,
            image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Scrap_iron.jpg"
        }
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
                                <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
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
