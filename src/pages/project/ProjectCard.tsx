const ProjectCard = () => {
  return (
    <div className="py-2 w-full md:py-2">
      <div className="relative md:px-20 md:p-0 rounded-2xl transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1">
        <img
          className="h-full object-cover py-2 rounded-2xl"
          src="https://inviqa.com/sites/default/files/styles/pullout/public/2020-08/XD-1.jpeg?h=f75d236a&itok=PBoXPDmW"
          width="733"
          height="412"
          alt=""
          typeof="foaf:Image"
        />
        <div className="content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-20 right-5">
          <div className="flex justify-between font-bold text-sm">
            <p>Product Review</p>
            <p className="text-gray-400">17th March, 2021</p>
          </div>
          <h2 className="text-3xl font-semibold mt-4 md:mt-10">
            Coffee From Heaven
          </h2>
          <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            aperiam nulla cupiditate saepe sed quis veritatis minus rem adipisci
            aliquid.
          </p>
          <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm dark:hover:bg-purple-800">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
