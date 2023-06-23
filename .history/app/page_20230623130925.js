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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [urunler, setUrunler] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const fetchedUrunler = await client.fetch(`*[_type == "urun"]`);
        setUrunler(fetchedUrunler);
      } catch (error) {
        console.error("Error fetching urunler:", error);
      }
    };

    fetchUrunler();
  }, []);

  // Rest of your code...

};
