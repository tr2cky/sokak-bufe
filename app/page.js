'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "p00jilyy",
  dataset: "production",
  apiVersion: "2023-06-23",
  useCdn: false,
});

const IndexPage = () => {
  const [urunler, setUrunler] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const fetchedUrunler = await client.fetch(`*[_type == "urun"]{
          _id,
          _createdAt,
          name,
          desc,
          "foto": foto.asset->url,
          fiyat
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

  // Filter the urunler based on the search term
  const filteredUrunler = urunler.filter((urun) =>
    urun.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}

      <div className="mx-auto bg-white pt-5">
        <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mx-auto" />
      </div>
      {/* Main content */}
      <main>
        {/* Menu section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Menü</h2>
              {/* Search field */}
            </div>
            <div className="mt-8">
              <input
                type="text"
                placeholder="Ne çekmişti canın?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Menu items */}
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUrunler.map((urun) => (
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden" key={urun._id}>
                  <div className="flex-shrink-0">
                    {urun.foto && (
                      <Image
                        className="h-48 w-full object-cover"
                        src={urun.foto}
                        alt={urun.name}
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;
