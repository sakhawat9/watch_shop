import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview, MdOutlineWatch } from "react-icons/md";
const DashHome = ({ watch, review, order, user}) => {
  return (
    <>
      <div className="grid mt-4 grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between rounded bg-teal-600 px-8 py-4 text-white md:col-span-6 xl:col-span-3 ">
          <div className="flex items-center gap-4">
            <div>
              <MdOutlineWatch className="text-2xl" />
            </div>
            <div>
              <h4 className="text-lg text-white mb-0 font-medium">
                Total Watch
              </h4>
              <h5 className="text-2xl text-white font-bold">{watch.length}</h5>
            </div>
          </div>
          <div>
            <MdOutlineWatch className="text-8xl text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-between rounded bg-teal-700 px-8 py-4 text-white md:col-span-6 xl:col-span-3 ">
          <div className="flex items-center gap-4">
            <div>
              <AiOutlineShoppingCart className="text-2xl" />
            </div>
            <div>
              <h4 className="text-lg mb-0 text-white font-medium">
                Total Orders
              </h4>
              <h5 className="text-2xl text-white font-bold">{order.length}</h5>
            </div>
          </div>
          <div>
            <AiOutlineShoppingCart className="text-8xl text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-between rounded bg-teal-800 px-8 py-4 text-white md:col-span-6 xl:col-span-3 ">
          <div className="flex items-center gap-4">
            <div>
              <FiUsers className="text-2xl" />
            </div>
            <div>
              <h4 className="text-lg mb-0 text-white font-medium">
                Total Users
              </h4>
              <h5 className="text-2xl text-white font-bold">{user.length}</h5>
            </div>
          </div>
          <div>
            <FiUsers className="text-8xl text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-between rounded bg-teal-900 px-8 py-4 text-white md:col-span-6 xl:col-span-3 ">
          <div className="flex items-center gap-4">
            <div>
              <MdOutlineRateReview className="text-2xl" />
            </div>
            <div>
              <h4 className="text-lg mb-0 text-white font-medium">
                Total Review
              </h4>
              <h5 className="text-2xl text-white font-bold">{review.length}</h5>
            </div>
          </div>
          <div>
            <MdOutlineRateReview className="text-8xl text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashHome;
