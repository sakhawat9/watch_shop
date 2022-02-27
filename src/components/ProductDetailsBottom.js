import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Reviews from "./Reviews";

const FoodDetailsBottom = ({ singleWatch }) => {
  return (
    <div>
      <div className="pt-5 product-details">
        <div className="container ">
          <div className="leftSide">
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Reviews </Tab>
              </TabList>

              <TabPanel>
                <div className="text-justify text-xl tab1">
                  {singleWatch.description}
                </div>
              </TabPanel>
              <TabPanel>
                <Reviews />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsBottom;
