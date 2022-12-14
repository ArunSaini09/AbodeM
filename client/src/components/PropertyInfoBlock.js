import React from "react";
import RentCard from "./RentCard";
import MortgageCard from "./MortgageCard";
import UtilityCard from "./UtilityCard";

export default function PropertyInfoBlock({
  electricInfo,
  gasInfo,
  mortInfo,
  waterInfo,
  rentInfo,
}) {
  console.log(
    "trying to pass infos in property info block: ",
    electricInfo,
    gasInfo,
    mortInfo,
    waterInfo,
    rentInfo
  );

  return (
    <div className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <RentCard
                  amount={rentInfo.amount == null ? 0 : rentInfo.amount}
                  dueDate={rentInfo.dueDate}
                  fulfilled={rentInfo.recieved}
                  id={rentInfo.id}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MortgageCard
                  amount={mortInfo.amount}
                  dueDate={mortInfo.dueDate}
                  fulfilled={mortInfo.paidOff}
                  id={mortInfo.id}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <UtilityCard
              electric={electricInfo.amount}
              electricId={electricInfo.id}
              gas={gasInfo.amount}
              gasId={gasInfo.id}
              water={waterInfo.amount}
              waterId={waterInfo.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
