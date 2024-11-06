import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

interface Product {
  id: string;
  _id:string;
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
      loading={loading}
      options={loading ? [] : results.products}
      getOptionLabel={(option) => option?.title || ''}
      renderOption={(props, option) => (
        <li {...props}>
          {loading ? (
            <Skeleton className="w-4 h-4"/>
          ) : (
            <>
             <Link href={`/product/${option._id}`}>
             
              <Image src={option.img} alt={option.title} width={50} height={50} />
              <div className='pl-4 text-md'>{option.title}</div>
              </Link>
            </>
          )}
        </li>
      )}
      onInputChange={(event, newValue) => setInput(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Search for food"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <Skeleton className="w-4 h-4"/>}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
