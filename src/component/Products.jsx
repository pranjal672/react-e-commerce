import Card from "../component/Card";

const Products = ({ products }) => {

    return (
        <section className="content">
            <h2>All Products</h2>
            <section className="products">
                {products?.map(product => <Card item={product} key={product.id} />)}
            </section>
        </section>
    )
}

export default Products