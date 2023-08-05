import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import { webContentRaw,webContent,GiveawayData,ProductData,PartnerData } from '../interfaces/web';
import {ProductIt} from "../interfaces/global";
import {Novedades, DeEpoca } from '../assets/images';

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


export function mapInputDataProducts (data:any){

  var products:ProductIt[] = [];

  data.map((Item:any)=>{
    var product:any = {};
    product.id = Item.id;
    product.name = Item.name;
    product.section = Item.section;
    product.category = Item.category;
    product.price = Item.price;
    product.breadcrumbs = [
      {
        name:Item.section,
        href:"/store?section="+Item.section,
      },
      {
        name:Item.category,
        href:"/store?section="+Item.section+"&category="+Item.category,

      }
    ];
    product.defaultImage = import.meta.env.VITE_BACKEND_URL+Item.image_url_1;

    var images:any[] = [];

    if(Item.image_url_1 != null){
      images.push({
        url:import.meta.env.VITE_BACKEND_URL+Item.image_url_1,
        alt:Item.name+"_image_1"
      });
    }

    if(Item.image_url_2 != null){
      images.push({
        url:import.meta.env.VITE_BACKEND_URL+Item.image_url_2,
        alt:Item.name+"_image_2"
      });
    }

    if(Item.image_url_3 != null){
      images.push({
        url:import.meta.env.VITE_BACKEND_URL+Item.image_url_3,
        alt:Item.name+"_image_3"
      });
    }

    if(Item.image_url_4 != null){
      images.push({
        url:import.meta.env.VITE_BACKEND_URL+Item.image_url_4,
        alt:Item.name+"_image_4"
      });
    }

    product.images = images;
    product.sizes =  Item.sizes.length > 0 ? Item.sizes : [{ name:"Unkonw", InStock:false }];
    product.description = Item.description;
    product.details = Item.details;
    product.highlights = JSON.parse(Item.tags);
    product.createdAt = Item.created_at;

    products.push(product);
  })


  return products;

}

export function mapInputDataCategory (data:any){

  var categories:any = {
    name:'categories',
    featured: [],
    sections: []
  };

  categories['featured'] = [
        {
          name: 'Novedades',
          href: '/store?section=All&category=All&size=All&order=Novedades',
          imageSrc: Novedades,
          imageAlt: 'Novedades.',
        },
        {
          name: 'De Epoca',
          href: '/store?section=All&category=All&size=All&order=DeEpoca',
          imageSrc: DeEpoca,
          imageAlt: 'De Epoca',
        }
  ];

  categories['sections'] = mapCategoriesDataStore(data); 
  return categories;
}

function mapCategoriesDataStore(data:any){

  const sections = data.categories.reduce((acc:any, curr:any) => {
    const { id, name, section } = curr;
    const existingSection = acc.find((item:any) => item.section === section);

    const categoryObj = { id, name, href: "create the href with logic here" }; 

    if (existingSection) {
      existingSection.categories.push(categoryObj);
    } else {
      acc.push({
        section,
        categories: [categoryObj],
      });
    }

    return acc;
  }, []);

  return sections;
}


export function mapInputData(data: any) {

  const dataWeb:any = {}

  dataWeb.hero     = mapHero(data.web);
  dataWeb.about    = mapAbout(data.web);
  dataWeb.social   = mapSocial(data.web);
  dataWeb.video    = mapVideoContent(data.web);
  dataWeb.partner  = mapPartners(data.web);
  dataWeb.giveaway = mapGiveaway(data.web);

  const dataWebGiveaway = mapGiveawayData(data.giveaway);
  const dataWebProducts = mapProductsData(data.products);
  const dataWebPartners = mapPartnersData(data.partners);

  const WebFullData = {
    "web": dataWeb,
    "giveaway": dataWebGiveaway,
    "products": dataWebProducts,
    "partners": dataWebPartners,
  };

  return WebFullData;
}

const mapHero  = (data:any) => {
  var dataMapped:any = {};
  dataMapped.header = (data.find((webData:any) => webData.section === "hero" && webData.sub_section === "header") || {}).content;
  dataMapped.video = (data.find((webData:any) => webData.section === "hero" && webData.sub_section === "video") || {}).content;
  return dataMapped; 
}

const mapAbout = (data:any) => {
  var dataMapped:any = {};
  dataMapped.body = (data.find((webData:any) => webData.section === "about" && webData.sub_section === "body") || {}).content;
  dataMapped.image = import.meta.env.VITE_BACKEND_URL+(data.find((webData:any) => webData.section === "about" && webData.sub_section === "image") || {}).content;
  return dataMapped;
}

const mapSocial = (data:any) => {
  var dataMapped:any = {};
  dataMapped.facebook = (data.find((webData:any) => webData.section === "social" && webData.sub_section === "facebook") || {}).content;
  dataMapped.instagram = (data.find((webData:any) => webData.section === "social" && webData.sub_section === "instagram") || {}).content;
  dataMapped.tiktok = (data.find((webData:any) => webData.section === "social" && webData.sub_section === "tiktok") || {}).content;
  dataMapped.youtube = (data.find((webData:any) => webData.section === "social" && webData.sub_section === "youtube") || {}).content;
  return dataMapped;
}

const mapVideoContent = (data:any) => {

  var dataMapped:any = {};
  dataMapped.video1 = (data.find((webData:any) => webData.section === "video" && webData.sub_section === "video1") || {}).content;
  dataMapped.video2 = (data.find((webData:any) => webData.section === "video" && webData.sub_section === "video2") || {}).content;
  dataMapped.video3 = (data.find((webData:any) => webData.section === "video" && webData.sub_section === "video3") || {}).content;
  dataMapped.video4 = (data.find((webData:any) => webData.section === "video" && webData.sub_section === "video4") || {}).content;
  dataMapped.video5 = (data.find((webData:any) => webData.section === "video" && webData.sub_section === "video5") || {}).content;
  return dataMapped;
}

const mapGiveaway = (data:any) => {

  var dataMapped:any = {};
  dataMapped.header = (data.find((webData:any) => webData.section === "giveaway" && webData.sub_section === "header") || {}).content;
  return dataMapped; 
}

const mapPartners = (data:any) => {
  var dataMapped:any = {};
  dataMapped.header = (data.find((webData:any) => webData.section === "partners" && webData.sub_section === "header") || {}).content;
  return dataMapped; 

}

const mapGiveawayData = (data:any) => {
  var dataMapped:any = {};

  if(data != null){
    dataMapped.id = data.id;
    dataMapped.name = data.name;
    dataMapped.description = data.description;
    dataMapped.start_date = data.start_date;
    dataMapped.end_date = data.end_date;
    dataMapped.image_url = import.meta.env.VITE_BACKEND_URL+data.image_url;
  }
  return dataMapped;
}

const mapProductsData = (data:any) => {
  var dataMapped:ProductData[] = [];

  data.map((product:any) => {
    var productMapped:any = {};
    productMapped.id = product.id;
    productMapped.name = product.name;
    productMapped.description = product.description;
    productMapped.details = product.details;
    productMapped.price = product.price;
    productMapped.category_id = product.category_id;
    productMapped.image = import.meta.env.VITE_BACKEND_URL+product.image_url_1;
    productMapped.href = "null";
    productMapped.tags = JSON.parse(product.tags).length > 0  ? JSON.parse(product.tags) : [] ;
    productMapped.isnew = product.is_new === 1 ? true : false;
    dataMapped.push(productMapped);
  });

  return dataMapped;
}

const mapPartnersData = (data:any)=>{
  var dataMapped:PartnerData[] = [];
  data.map((partner:any) => {
    var partnerMapped:any = {};
    partnerMapped.id = partner.id;
    partnerMapped.name = partner.name;
    partnerMapped.description = partner.description;
    partnerMapped.image = import.meta.env.VITE_BACKEND_URL+partner.image_brand;
    partnerMapped.link_content = partner.link_content;
    partnerMapped.brand_link = partner.brand_link;
    partnerMapped.tags = JSON.parse(partner.tags).length > 0  ? JSON.parse(partner.tags) : [] ;
    dataMapped.push(partnerMapped);
  });

  return dataMapped;
}


export function mapInputGiveawaysData(data: any) {

  var dataMapped:GiveawayData[] = [];

  data.map((giveaway:any)=>{
    var giveawayMapped:any = {};
    giveawayMapped.id = giveaway.id;
    giveawayMapped.name = giveaway.name;
    giveawayMapped.description = giveaway.description;
    giveawayMapped.image_url = import.meta.env.VITE_BACKEND_URL+giveaway.image_url;
    giveawayMapped.start_date = giveaway.start_date;
    giveawayMapped.end_date = giveaway.end_date;
    giveawayMapped.alreadyIn = giveaway.alreadyIn;
    dataMapped.push(giveawayMapped);
  })
  return dataMapped;
  
}



