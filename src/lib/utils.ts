import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import { webContentRaw,webContent } from '../interfaces/web';
import {ProductIt,FilterProductProps} from "../interfaces/global";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDataExtracted = (data:webContentRaw[]):webContent => {
  //Get the sections names
  const sections = [...new Set(data.map((item:any) => item.section))];
  //Now for each section name get the data that belongs to it
  const dataBySection = sections.reduce((acc:any, section:string) => {
    acc[section] = formatDataExtractedBySection(data,section);
    return acc;
  }, {});
  return dataBySection;
} 


const formatDataExtractedBySection = (data:webContentRaw[],section:string) => {
  //Filter the items that have the section name equals in the section propertie of each item in the data array
  data = data.filter((item:any) => item.section === section);
  //Now convert the data array into object with each subsection as property and value of propertie depends if content_type is 'text' the value is
  //in content_text else content_url
  data = data.reduce((acc:any, item:any) => {
    if (item.content_type === "text" || item.content_type === "url") {
      acc[item.subSection] = item.content_text;
    } else {
      acc[item.subSection] = item.content_url;
    }
    return acc;
  }, {});


  return data;
}

export const ApplyFilterToProducts = (products:ProductIt[],filters:FilterProductProps) => {
  if(filters.section === "All" && filters.category === "All" && filters.size === "All" && filters.orderOption === "Most Popular"){
    return products;
  }

  if(filters.section !== "All"){
    products = products.filter(product => product.section === filters.section);
  }


  if(filters.category !== "All"){
    products = products.filter(product => product.category === filters.category);
  }


  if(filters.size !== "All"){
    products = products.filter(product => product.sizes.find(size => size.name === filters.size && size.inStock));
  }

  //fix the code below as createdAt is a string and not a date or number
  if(filters.orderOption === "Lo Nuevo"){
    products = products.sort((a:any,b:any) => b.createdAt - a.createdAt);
  }

  if(filters.orderOption === "Precio: Menor a Mayor"){
    products = products.sort((a:any,b:any) => a.price - b.price);
  }

  if(filters.orderOption === "Precio: Mayor a Menor"){
    products = products.sort((a:any,b:any) => b.price - a.price);
  }

  return products; 
}
