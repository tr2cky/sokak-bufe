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
        setUrunler(fetchedUrunler);
      } catch (error) {
        console.error("Error fetching urunler:", error);
      }
    };

    fetchUrunler();
  }, []);

  return (
    <div>
      {/* Navbar */}

      <div className="mx-auto bg-white pt-5">
        <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mx-auto"/>
      </div>
      {/* Main content */}
      <main>

        {/* Menu section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Menü</h2>
            </div>
            {/* Menu items */}
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

              {urunler.map((urun) => (
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">

                    <Image className="h-48 w-full object-cover" src={urun.foto} alt={urun.name} width={500} height={500} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-900">{urun.name}</p>
                      <p className="mt-2 text-base text-gray-500">
                        {urun.desc}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <span className="text-xl font-semibold text-gray-900">{urun.fiyat}</span>
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
