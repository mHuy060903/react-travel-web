import React from "react";

const Experience = () => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex justify-start items-start gap-40">
        <h1 className="font-semibold text-xl text-[#1a2b49]">Highlights</h1>
        <ul className="flex flex-col gap-3 list-disc">
          <li className="text-lg font-medium text-[#1a2b49]">
            Join the official guided tour of the Hobbiton Movie Set
          </li>
          <li className="text-lg font-medium text-[#1a2b49]">
            Listen to fascinating stories from your guide as you explore the
            12-acre set
          </li>
          <li className="text-lg font-medium text-[#1a2b49]">
            See where major scenes were filmed and discover behind-the-scene
            secrets
          </li>
          <li className="text-lg font-medium text-[#1a2b49]">
            Enjoy a drink at The Green Dragon Inn
          </li>
          <li className="text-lg font-medium text-[#1a2b49]">
            Take your photo in front of one of the Hobbit Holes
          </li>
        </ul>
      </div>
      <hr />
      <div className="flex justify-start items-start gap-40">
        <h1 className="font-semibold text-xl text-[#1a2b49]">
          Full description
        </h1>
        <ul className="flex flex-col gap-3 list-disc">
          <li className="text-lg font-medium text-[#1a2b49]">
            Enjoy a frozen adventure in the wilderness of Skaftafell and hike
            across a stunning outlet glacier of Vatnajökull in the company of an
            expert guide.
          </li>
          <li className="text-lg font-medium text-[#1a2b49]">
            Get a short safety briefing and collect all the necessary equipment
            at the meeting point. Then, marvel at the majesty of the landscape
            on the short hike to the ice cap. Put on your crampons for security
            out on the ice.
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Experience;
