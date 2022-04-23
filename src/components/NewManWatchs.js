/* eslint-disable @next/next/no-img-element */
import React from "react";
import Title from "../common/Title";
import NewManWatch from "./NewManWatch";

const NewManWatchs = ({ watchs }) => {
  const featuredWatch = watchs.filter((watch) => watch?.category === "man");
  return (
    <div className="new-man-watch">
      <div className="container">
        <div className="new-man-watch__wrapper">
          <div className="new-man-watch__wrapper__images">
            <div className="new-man-watch__wrapper__images__img1">
              <img
                src="https://kit.wirastudio.co/arloji/wp-content/uploads/sites/6/2021/06/men-s-hand-with-a-watch-1-1-800x533.jpg"
                alt=""
              />
            </div>
            <div className="new-man-watch__wrapper__images__img2">
              <img
                src="https://kit.wirastudio.co/arloji/wp-content/uploads/sites/6/2021/06/mens-watch-case-1-800x533.jpg"
                alt=""
              />
            </div>
            <div className="new-man-watch__wrapper__images__img3">
              <img
                src="https://kit.wirastudio.co/arloji/wp-content/uploads/sites/6/2021/06/wedding-watch-1-800x530.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="new-man-watch__wrapper__content">
              <h3 className="text-2xl text-primary text-center mb-8">NEW ARRIVAL</h3>
            <Title title="NEW ARRIVAL MEN WATCH LOOK STYLE" />
            <div className="new-man-watch__wrapper__content__items">
              {featuredWatch.slice(3, 6).map((watch) => (
                <NewManWatch key={watch._id} watch={watch} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewManWatchs;
