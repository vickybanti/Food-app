"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Inputs = {
  _id: string;
  name: string;
  lowestPrice: number;
  highestPrice: number;
  isFeatured: boolean;
  img: string;
};

type Product = {
  _id: string;
  title: string;
  desc: string;
  price: number;
  catSlug: string;
  isFeatured: boolean;
  img: string;
  options: Option[];
};

type Option = {
  _id: string;
  title: string;
  additionalPrice: number;
};

type Category = {
  _id: string;
  title: string;
  slug: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [inputs, setInputs] = useState<Inputs>({
    _id: "",
    name: "",
    lowestPrice: 0,
    highestPrice: 0,
    isFeatured: false,
    img: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Fetch restaurant and product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/restaurants/${id}`);
        const data = await res.json();
        setInputs({
          _id: data._id,
          name: data.name,
          lowestPrice: data.lowestPrice,
          highestPrice: data.highestPrice,
          isFeatured: data.isFeatured,
          img: data.img,
        });
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
    fetchCategories();
  }, [id]);

  // Handle input changes for restaurant
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product updates
  const handleProductChange = (index: number, field: string, value: any) => {
    setProducts((prev) =>
      prev.map((product, i) => (i === index ? { ...product, [field]: value } : product))
    );
  };

  // Handle file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "restaurant");
    const res = await fetch("https://api.cloudinary.com/v1_1/du3vn9rkg/image/upload", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.url;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let restaurantImage = inputs.img;

      if (file) {
        restaurantImage = await uploadImage(file);
      }

      const payload = {
        ...inputs,
        img: restaurantImage,
        products,
      };

      const res = await fetch(`/api/products/restaurants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update restaurant");
      }

      setSuccess(true);
      router.push("/restaurants");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error updating restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Edit Restaurant</h1>

        {/* Restaurant Info */}
        <Label>Restaurant Name</Label>
        <Input name="name" value={inputs.name} onChange={handleChange} />

        <Label>Restaurant Image</Label>
        <Input type="file" onChange={handleImageChange} />

        <Label>Lowest Price</Label>
        <Input type="number" name="lowestPrice" value={inputs.lowestPrice} onChange={handleChange} />

        <Label>Highest Price</Label>
        <Input type="number" name="highestPrice" value={inputs.highestPrice} onChange={handleChange} />

        {/* Products */}
        <h2 className="text-xl font-semibold">Products</h2>
        {products.map((product, index) => (
          <div key={product._id} className="border p-4 rounded">
            <Input
              value={product.title}
              onChange={(e) => handleProductChange(index, "title", e.target.value)}
              placeholder="Product Title"
            />
            <textarea
              value={product.desc}
              onChange={(e) => handleProductChange(index, "desc", e.target.value)}
              placeholder="Product Description"
              className="p-2 border rounded"
            />
            <Input
              type="number"
              value={product.price}
              onChange={(e) => handleProductChange(index, "price", +e.target.value)}
              placeholder="Product Price"
            />
            <select
              value={product.catSlug}
              onChange={(e) => handleProductChange(index, "catSlug", e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        ))}

        <Button type="submit" className="bg-blue-500 text-white">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>

        {message && <p className="text-red-500">{message}</p>}
        {success && <p className="text-green-500">Restaurant updated successfully!</p>}
      </form>
    </div>
  );
};

export default Page;
