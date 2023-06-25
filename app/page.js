'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { createClient } from "next-sanity";
import Select from 'react-select';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-10 right-10 shadow-lg bg-white text-white px-2 py-2 rounded-3xl transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={scrollToTop}
    >
      <Image src={"/arrow-up.png"} alt="Go to top" width={24} height={24} />
    </button>
  );
};



const client = createClient({
  projectId: "p00jilyy",
  dataset: "production",
  apiVersion: "2023-06-23",
  useCdn: false,
});

const IndexPage = () => {
  const [urunler, setUrunler] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const fetchedUrunler = await client.fetch(`*[_type == "urun"]{
          _id,
          _createdAt,
          name,
          desc,
          "foto": foto.asset->url,
          fiyat,
          categories
        }`);
        let sortedUrunler = fetchedUrunler.sort((a, b) => {
          const dateA = new Date(a._createdAt);
          const dateB = new Date(b._createdAt);
          return dateA - dateB;
        });
        setUrunler(sortedUrunler);
      } catch (error) {
        console.error("Error fetching urunler:", error);
      }
    };

    fetchUrunler();
  }, []);

  const formattedCategories = urunler
    .flatMap((urun) => urun.categories)
    .map((category) => (category ? category.trim().toLowerCase() : null))
    .filter((category) => category !== null)
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1));

  const sortedCategories = [...new Set(formattedCategories)];

  const normalizeString = (str) => {
    if (typeof str !== "string") {
      return "";
    }
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u0130]/g, "i")
      .toLowerCase();
  };



  const filteredUrunler = urunler.filter((urun) => {
    const matchesSearchTerm =
      (urun.name && urun.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (urun.desc && urun.desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (urun.categories && urun.categories.some(category => normalizeString(category).includes(normalizeString(searchTerm))));
  
    const matchesCategory = selectedCategory ? 
      (urun.categories && urun.categories.some(category => normalizeString(category) === normalizeString(selectedCategory))) : 
      true;
  
    return matchesSearchTerm && matchesCategory;
  });
  




  return (
    <div className="h-screen bg-white">

      <div className="mx-auto bg-white pt-5 flex justify-evenly items-center">
        <Image src={"/logo2.png"} alt="Logo" width={80} height={80} className="" />
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r bg-gradient-to-r from-purple-900 via-orange-500 to-red-500 text-transparent bg-clip-text">
            {selectedCategory || 'Menü'}
          </h2>
        </div>
      </div>
      {/* Main content */}
      <main>


        {/* Menu section */}
        <section className="bg-white py-14">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3">


              <Select
                value={selectedCategory}
                onChange={(selectedOption) => setSelectedCategory(selectedOption?.value || "")}
                options={[
                  { value: "", label: "Tüm Kategoriler" },
                  ...sortedCategories.map((category) => ({ value: category, label: category })),
                ]}
                placeholder={selectedCategory || "Kategori Seç"}
                classNamePrefix="react-select"
                className="w-full rounded-md "
              />


              {/* Search field */}
              <input
                type="text"
                placeholder="Arayan bulur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Menu items */}
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUrunler.map((urun) => (
                <div className="flex rounded-lg shadow-lg overflow-hidden" key={urun._id}>

                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-900">{urun.name}</p>
                      <p className="mt-2 text-base text-gray-500">
                        {urun.desc}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <span className="text-xl font-semibold text-gray-900">{urun.fiyat ? urun.fiyat + ' TL' : ''}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    {urun.foto && (
                      <Image
                        className="h-36 w-36 object-cover"
                        src={urun.foto}
                        alt={urun.name}
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <GoToTopButton />
    </div>
  );
};

export default IndexPage;
