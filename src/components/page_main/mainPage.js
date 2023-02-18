import "./mainPage.css";

import { useState, useEffect } from "react";
import timeout from "../../utils/timeOut";
import MainWindowSection from "../mainWindowSection/mainWindowSection";
import NewsList from "../newsList/newsList";
import GoodsList from "../goodsList/goodList";

function MainPage(props) {
  //get
  const { functions, variables } = props;
  const {update, buyerObj, shopObj } = variables;
  const { openFullGoodWindow } = functions;

  //do
  const [pageStatus, setPageStatus] = useState("showing");

  useEffect(() => {
    async function showPage() {
      await timeout(100);
      setPageStatus("active");
    }
    showPage();
  }, []);

  return (
    <div className={`mainPage ${pageStatus}`}>
      <MainWindowSection functions={{}} variables={{ title: "News", hasTitle: false, hasBackGroundColor: false}}>
        <NewsList />
      </MainWindowSection>
      <MainWindowSection functions={{}} variables={{ shopObj: shopObj, title: "Top list" , hasTitle: true, hasBackGroundColor: true}}>
        <GoodsList functions={{openFullGoodWindow:openFullGoodWindow}} variables={{update, shopObj: shopObj, insideDataType:'topList'}}/> 
      </MainWindowSection>
      {buyerObj.isBuyerLogin && (
        <MainWindowSection functions={{}} variables={{title: "Your wish" , hasTitle: true, hasBackGroundColor: true}}>
          <GoodsList functions={{openFullGoodWindow:openFullGoodWindow}} variables={{update,shopObj: shopObj, insideDataType:'wishList'}}/>
        </MainWindowSection>
      )}
    </div>
  );
}

export default MainPage;
