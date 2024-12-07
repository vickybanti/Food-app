import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { Search } from '@mui/icons-material';

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
      sx={{ width: 400, border: "none", fontSize:"12px"}}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={<>
          <div className="flex pr-24 mt-[-3px]">
          <Search sx={{ fontSize: "20px" ,color:"green", marginRight:"2px" }} />
          <span className='text-xs font-extralight text-black'>Search for good food</span>
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
            style: {width:"100%", boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.06),0px 1px 1px -0.5px rgba(0,0,0,0.06),0px_3px 3px -1.5px rgba(0,0,0,0.06), 0px 6px 6px -3px rgba(0,0,0,0.06),0px 12px 12px -6px rgba(0,0,0,0.06),0px 24px 24px -12px rgba(0,0,0,0.06)", borderColor:"gray", borderRadius: "10px", padding:"0 90px", color:"black", height:"40px", backgroundColor:"#e5e7eb" }
          }}
        />
      )}
    />
  );
}

     /* #e5e7eb */;
