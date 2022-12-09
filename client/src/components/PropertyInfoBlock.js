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
  return (
    <div className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <RentCard
                  rent={rentInfo[0]}
                  rentDueDate={rentInfo[2]}
                  recieved={rentInfo[1]}
                  rentId={rentInfo[3]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MortgageCard
                  mortgage={mortInfo[0]}
                  mortDueDate={mortInfo[2]}
                  mortId={mortInfo[3]}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <UtilityCard
              electric={electricInfo[0]}
              electricId={electricInfo[3]}
              gas={gasInfo[0]}
              gasId={gasInfo[3]}
              water={waterInfo[0]}
              waterId={waterInfo[3]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
