import FooterList from "./FooterList";

const Footer = () => {
  return (
    <div className="bg-[#1a2b49] mt-4 ">
      <div className="px-20 py-10 grid grid-cols-4 gap-5">
        <FooterList
          heading="Work With Us"
          list={[
            "As a Supply Partner",
            "As a Content Creator",
            "As an Affiliate Partner",
          ]}
        />
        <div className="flex flex-col gap-3">
          <span className="font-bold text-white text-xl">Mobile</span>
          <img
            width={200}
            src="https://cdn.getyourguide.com/tf/assets/static/badges/google-play-badge-en-us.svg"
          />
          <img
            width={200}
            src="https://cdn.getyourguide.com/tf/assets/static/badges/app-store-badge-en-us.svg"
          />
        </div>
        <FooterList
          heading="Support"
          list={[
            "Contact",
            "Legal Notice",
            "Privacy Policy",
            "Cookies and Marketing Preferences",
            "General Terms and Conditions",
            "Information according to the Digital Services Act",
            "Sitemap",
            "Do not Sell or Share my Personal Information",
          ]}
        />
        <FooterList
          heading="Company"
          list={[
            "About Us",
            "Careers",
            "Blog",
            "Press",
            "Gift Cards",
            "Magazine",
            "Travel Guides",
          ]}
        />
      </div>
    </div>
  );
};

export default Footer;
