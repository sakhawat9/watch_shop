import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../../common/AdminLayout";
import WatchForm from "../../../components/Dashboard/WatchForm";
import { Store } from "../../../utils/Store";
import { requireAdmin } from "../../../utils/auth";

export default function AddWatch() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (values) => {
    await axios.post(
      "/api/addWatch/addWatch",
      // The API reads the image from `img`.
      { ...values, img: values.image },
      { headers: { authorization: `Bearer ${userInfo.token}` } },
    );
    toast.success(`${values.name} was added to your catalogue.`);
    // Land on the product list, where the new item is visible and editable —
    // the old form redirected to the public storefront instead.
    router.push("/dashboard/watch/manageWatch");
  };

  return (
    <AdminLayout
      title="Add product"
      description="Create a new watch listing. It goes live as soon as you save."
    >
      <WatchForm mode="create" onSubmit={handleSubmit} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;
  return { props: {} };
}
