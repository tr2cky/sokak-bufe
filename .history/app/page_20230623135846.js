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

      <div className="mx-auto">
        <h1 className="font-bold p-1 text-3xl bg-gradient-to-r from-yellow-400 to-rose-400">Sokak Büfe</h1>
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
              {/* Example menu item */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/kokorec.jpg" alt="Kokoreç" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Kokoreç</p>
                    <p className="mt-2 text-base text-gray-500">
                      Kuzu kokoreç, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/kofte.jpg" alt="Köfte" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Kokoreç</p>
                    <p className="mt-2 text-base text-gray-500">
                      Köfte, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                  <Image className="h-48 w-full object-cover" src="/sucuk.jpg" alt="Sucuk" width={500} height={500} />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Sucuk</p>
                    <p className="mt-2 text-base text-gray-500">
                      Sucuk, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">

                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">Sucuk</p>
                    <p className="mt-2 text-base text-gray-500">
                      Sucuk, biber, domates, kekik
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <span className="text-xl font-semibold text-gray-900">75TL</span>
                  </div>
                </div>
              </div>
              {urunler.map((urun) => (
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">

                    <Image className="h-48 w-full object-cover" src={urun.foto} alt={urun.name} width={500} height={500} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-900">{urun.name}</p>
                      <p className="mt-2 text-base text-gray-500">
                        {urun.aciklama}
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
