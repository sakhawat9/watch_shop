import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineWatch, MdOutlineSearch } from "react-icons/md";
import { RiDeleteBin7Line, RiFileEditLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Store } from "../../utils/Store";
import { categoryLabel, formatPrice } from "../../utils/format";

/**
 * Product management table.
 *
 * The original rendered an unbounded grid of full-size product images with
 * three unlabelled icon buttons each, deleted via `window.confirm()` and then
 * called `window.location.reload()` — a full page reload after every action.
 * This is a scannable table with a search box, an accessible confirm dialog,
 * and optimistic removal from local state.
 */
export default function ManageWatchs({ watch = [] }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [items, setItems] = useState(watch);
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.slug.toLowerCase().includes(needle),
    );
  }, [items, query]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/watch/${target._id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setItems((current) => current.filter((item) => item._id !== target._id));
      toast.success(`${target.name} was deleted.`);
      setTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete that product.");
    } finally {
      setDeleting(false);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={MdOutlineWatch}
        title="No products yet"
        description="Add your first watch to start selling."
        action={{ label: "Add a product", href: "/dashboard/watch/addWatch" }}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or slug"
            className="py-2.5 pr-10 text-sm input"
          />
          <MdOutlineSearch
            className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-primary-400"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm text-primary-500" aria-live="polite">
          {filtered.length} of {items.length} products
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={MdOutlineSearch}
          title="No matching products"
          description={`Nothing matched “${query}”.`}
          action={{ label: "Clear search", onClick: () => setQuery("") }}
        />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 overflow-hidden rounded shrink-0 bg-secondary-100">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate text-primary-900">
                          {item.name}
                        </p>
                        <p className="font-mono text-xs truncate text-primary-400">
                          {item.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{categoryLabel(item.category)}</td>

                  <td>
                    <span className="font-medium text-primary-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.delPrice > item.price && (
                      <del className="ml-2 text-xs text-primary-400">
                        {formatPrice(item.delPrice)}
                      </del>
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.countInStock === 0
                          ? "badge-danger"
                          : item.countInStock <= 5
                            ? "badge-warning"
                            : "badge-success"
                      }`}
                    >
                      {item.countInStock === 0 ? "Sold out" : `${item.countInStock} in stock`}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/watch/${item.slug}`}
                        aria-label={`View ${item.name} in the storefront`}
                        className="flex items-center justify-center w-9 h-9 transition-colors rounded text-primary-500 hover:bg-secondary-200 hover:text-primary-900"
                      >
                        <AiFillEye className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/dashboard/watch/${item._id}`}
                        aria-label={`Edit ${item.name}`}
                        className="flex items-center justify-center w-9 h-9 transition-colors rounded text-primary-500 hover:bg-secondary-200 hover:text-primary-900"
                      >
                        <RiFileEditLine className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setTarget(item)}
                        aria-label={`Delete ${item.name}`}
                        className="flex items-center justify-center w-9 h-9 transition-colors rounded text-primary-500 hover:bg-danger-soft hover:text-danger"
                      >
                        <RiDeleteBin7Line className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title={`Delete ${target?.name ?? "this product"}?`}
        description="This permanently removes the product from your catalogue. It can't be undone."
        confirmLabel="Delete product"
      />
    </>
  );
}
