function AddBlogs() {
  return (
    <div className="flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow mb-6">Add Blog</h1>

        {/* Blog Image Upload */}
        <div className="mb-6 w-full">
          <label className="block text-lg font-medium text-yellow mb-2">
            Blog Image
          </label>
          <input
            type="file"
            className=" w-full text-sm text-yellow file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow file:text-white hover:file:bg-yellow-100"
          />
        </div>

        {/* Blog Name */}
        <div className="mb-6 w-full">
          <label
            htmlFor="blogName"
            className="text-lg font-medium text-yellow mb-2"
          >
            Blog Name
          </label>
          <input
            type="text"
            id="blogName"
            className="w-full border border-semiGray p-3 rounded-lg text-yellow-600"
          />
        </div>

        {/* Blog Description */}
        <div className="mb-6 w-full">
          <label
            htmlFor="description"
            className=" text-lg font-medium text-yellow mb-2"
          >
            Blog Description
          </label>
          <textarea
            id="description"
            rows={6}
            className="w-full border border-semiGray p-3 rounded-lg text-yellow-600"
          ></textarea>
        </div>

        <div className="flex  w-full justify-end">
          <button className="bg-yellow text-white px-6 py-3 rounded-lg font-medium ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBlogs;
