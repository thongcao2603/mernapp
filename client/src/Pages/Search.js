import Layout from "../Components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search resilts"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {" "}
            {values?.results?.map((product) => {
              return (
                <>
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    className="product-link"
                  >
                    <div
                      className="card m-2"
                      style={{ width: "18rem", minWidth: "18rem" }}
                    >
                      <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                        alt={product?.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
