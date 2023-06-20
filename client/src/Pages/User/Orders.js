import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Orders"}>
      <div className="containet-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>all orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
