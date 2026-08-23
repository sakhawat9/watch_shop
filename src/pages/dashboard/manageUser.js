import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { MdOutlineSearch } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "react-toastify";
import AdminLayout from "../../common/AdminLayout";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmptyState from "../../components/ui/EmptyState";
import userRepo from "../../repositories/userRepo";
import { Store } from "../../utils/Store";
import { requireAdmin } from "../../utils/auth";
import { formatDate } from "../../utils/format";

/**
 * Customer management.
 *
 * The old page rendered each user as a card in a 12-column grid, with an
 * unlabelled delete icon in the corner, a `window.confirm()`, and a full page
 * reload afterwards. Each card also mounted its own `useReducer` and auth
 * `useEffect`, so the login guard ran once per user in the list.
 */
export default function ManageUser({ users = [] }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [items, setItems] = useState(users);
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (user) =>
        user.name?.toLowerCase().includes(needle) ||
        user.email?.toLowerCase().includes(needle),
    );
  }, [items, query]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/user/${target._id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setItems((current) => current.filter((user) => user._id !== target._id));
      toast.success(`${target.name} was removed.`);
      setTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete that customer.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Customers"
      description="Everyone with an account on your store."
    >
      {items.length === 0 ? (
        <EmptyState
          icon={FiUsers}
          title="No customers yet"
          description="Accounts created in the storefront will appear here."
        />
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="user-search" className="sr-only">
                Search customers
              </label>
              <input
                id="user-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or email"
                className="py-2.5 pr-10 text-sm input"
              />
              <MdOutlineSearch
                className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-primary-400"
                aria-hidden="true"
              />
            </div>

            <p className="text-sm text-primary-500" aria-live="polite">
              {filtered.length} of {items.length} customers
            </p>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={MdOutlineSearch}
              title="No matching customers"
              description={`Nothing matched “${query}”.`}
              action={{ label: "Clear search", onClick: () => setQuery("") }}
            />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Role</th>
                    <th scope="col">Joined</th>
                    <th scope="col" className="text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => {
                    const isSelf = user._id === userInfo?._id;
                    return (
                      <tr key={user._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full shrink-0 bg-secondary-200 text-primary-400">
                              {user.img ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={user.img}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <BiUser className="w-5 h-5" aria-hidden="true" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="font-medium truncate text-primary-900">
                                {user.name}
                              </p>
                              <p className="text-xs truncate text-primary-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              user.isAdmin ? "badge-accent" : "badge-neutral"
                            }`}
                          >
                            {user.isAdmin ? "Admin" : "Customer"}
                          </span>
                        </td>

                        <td>{formatDate(user.createdAt)}</td>

                        <td>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => setTarget(user)}
                              disabled={isSelf}
                              aria-label={`Delete ${user.name}`}
                              title={
                                isSelf ? "You can't delete your own account" : undefined
                              }
                              className="flex items-center justify-center transition-colors rounded w-9 h-9 text-primary-500 hover:bg-danger-soft hover:text-danger disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                              <RiDeleteBin7Line className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title={`Delete ${target?.name ?? "this customer"}?`}
        description="This permanently removes the account. Their past orders will remain in your records."
        confirmLabel="Delete customer"
      />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const users = await userRepo.listAll();
  // Password hashes have no business reaching the client.
  const safeUsers = users.map(({ password, ...rest }) => rest);
  return { props: { users: safeUsers } };
}
