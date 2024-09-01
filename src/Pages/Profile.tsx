import "../components/Css/profile.css";
function Profile() {
  return (
    <div className="flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow-600 mb-6 text-yellow">
          Profile
        </h1>

        {/* Profile Picture Upload */}
        <div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-yellow mb-2">
              Upload Profile Picture
            </label>
            <input
              type="file"
              className="block w-full text-sm text-yellow file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow file:text-white hover:file:bg-yellow-100"
            />
          </div>
          <div>
            <h1>uploaded image</h1>
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <label
              htmlFor="username"
              className=" text-lg font-medium text-yellow mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className=" text-lg font-medium text-yellow mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>
        </div>

        {/* More Information */}
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold text-yellow mb-6">
            More Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullname"
                className="text-lg font-medium text-yellow mb-2"
              >
                User FullName
              </label>
              <input
                type="text"
                id="fullname"
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className=" text-lg font-medium text-yellow mb-2"
              >
                Contact Number
              </label>
              <input
                type="number"
                id="phone"
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="text-lg font-medium text-yellow mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="text-lg font-medium text-yellow mb-2"
              >
                Full Address
              </label>
              <input
                type="text"
                id="address"
                className=" focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 w-full flex justify-end">
          <button className="bg-yellow text-white py-3 px-6 rounded-lg shadow focus:outline-none">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
