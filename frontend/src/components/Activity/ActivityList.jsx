import React, { useEffect } from "react";
import ActivityItem from "./ActivityItem";
import AddButton from "../AddButton";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ActivityList = ({ activityList, reFetch }) => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    // put array of tags in first index of activityList array

    if (activityList.length > 0) {
      const tags = ["Demo"]
      activityList[0].tag_list = tags;
    }

    console.log(activityList);
  }, []);

  const onAddClick = () => {
    navigate(`/project/activity/create?id=${id}`);
  };

  return (
    <div className="bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Activities
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Create an activity from scratch and selected a predecessor
            (optional).
          </p>
        </div>
        <div className="flex justify-end">
          <AddButton onAddClick={onAddClick} />
        </div>
      </div>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-100">
          {activityList.map((i) => (
            <li key={i.id} className="flex justify-between gap-x-6 py-5">
              <ActivityItem data={i} reFetch={reFetch} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityList;
