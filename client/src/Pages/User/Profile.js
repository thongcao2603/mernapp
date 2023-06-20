import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
const Profile = () => {
  return (
    <Layout title={"Profile"}>
      <div className="containet-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
