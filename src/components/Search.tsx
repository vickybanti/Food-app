import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { Search } from '@mui/icons-material';
import { Input } from './ui/input';
import { useMediaQuery } from '@/hooks/use-media-query';

interface Product {
  id: string;
  _id:string;
  title: string;
  img: string;
  // ... other product properties
}

interface Restaurant {
  id: string;
  _id:string;
  name: string;
  img: string;
  // ... other product properties
}


interface SearchResult {
  products: Product[];  // Changed from string[] to Product[]
  categories: string[];
  restaurants: Restaurant[];
}

export default function SearchBox() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SearchResult>({ products: [], categories: [], restaurants:[] });
  const [loading, setLoading] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 768px)");


  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(input)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
        setResults({ products: [], categories: [], restaurants:[] });

      }
      setLoading(false)
    };
    if (input) {
      handleSearch();
    } else {
      setResults({ products: [], categories: [], restaurants:[] });
    }
  }, [input]);

  return (
    <Autocomplete
    className='text-sm border-none w-96'
      
      loading={loading}
      options={loading ? [] : results.products}
      getOptionLabel={(option) => option?.title || ''}
      renderOption={(props, option) => (
        <li {...props}>
          {loading ? (
            <Skeleton className="w-10 h-10"/>
          ) : (
            <>
             <Link href={`/product/${option._id}`}>
             <div className="flex">
              <Image src={option.img} alt={option.title} width={50} height={50} />
              <div className='pl-4 text-md'>{option.title}</div>
              </div>
              </Link>
            </>
          )}
        </li>
      )}
      onInputChange={(event, newValue) => setInput(newValue)}
      sx={{ width: isDesktop ? 400:270, border: "none", fontSize:"12px"}}
      renderInput={(params) => (
        <TextField 
         className='bg-gray-100 border-gray-300 rounded-md'
          {...params} 
          label={<>
          <div className="flex pr-24 mt-[-3px]">
          <Search sx={{ fontSize: "20px" ,color:"green", marginRight:"2px" }} />
          <span className='text-xs text-black font-thin'>Search for good food</span>
          </div>
          </>}
          InputProps={{
            ...params.InputProps,    
            endAdornment: (
              <>
                {loading && <Skeleton className="w-4 h-4"/>}
                {params.InputProps.endAdornment}
              </>
            ),
            style: {width:"100%", border:"none",padding:"0 90px", color:"black", height:"40px", backgroundColor:"#e5e7eb" }
          }}
        />
      )}
    />
  );
}

     /* #e5e7eb */;
