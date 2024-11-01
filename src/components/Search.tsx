import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface Product {
  id: string;
  title: string;
  img: string;
  // ... other product properties
}

interface SearchResult {
  products: Product[];  // Changed from string[] to Product[]
  categories: string[];
}

export default function SearchBox() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(input)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
        setResults({ products: [], categories: [] });

      }
      setLoading(false)
    };
    if (input) {
      handleSearch();
    } else {
      setResults({ products: [], categories: [] });
    }
  }, [input]);

  return (
    <Autocomplete
      disablePortal
      options={results.products}
      getOptionLabel={(option) => option.title}  // Changed to return just the title string
      renderOption={(props, option) => (
        
        <li {...props}>
          {loading && (<Skeleton className="h-4 w-4"/>)}
          <Image src={option.img} alt={option.title} width={50} height={50} />
          {option.title}
        </li>
      )}
      onInputChange={(event, newValue) => setInput(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search for food" />}
    />
  );
}
