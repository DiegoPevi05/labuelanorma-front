export interface webContentRaw {
    id:number;
    section:string;
    sub_section:string;
    content_type:string,
    content:string;
}

export interface WebContentFullData {
  web:webContent;
  giveaway:GiveawayData;
  partners:PartnerData[];
  products:ProductData[];
}

export interface webContent {
  hero:HeroWebData;
  about: AboutWebData;
  social:SocialWebData;
  video:VideoWebData;
  partner:PartnerWebData;
  giveaway:GiveawayWebData;
}

export interface HeroWebData {
  header:string;
  video:string;
}

export interface AboutWebData {
  body:string;
  image:string;
}

export interface  SocialWebData {
    facebook:string;
    tiktok:string;
    instagram:string;
    youtube:string;
}

export interface VideoWebData {
    video1:string;
    video2:string;
    video3:string;
    video4:string;
    video5:string;
}

export interface PartnerWebData {
    header:string;
}
export interface GiveawayWebData {
    header:string;
}

export interface GiveawayData {
  id:number;
  name:string;
  description:string;
  start_date:string;
  end_date:string;
  image_url:string;
  alreadyIn:boolean;
}

export interface PartnerData {
  id:number;
  name:string;
  description:string;
  image:string;
  link_content:string;
  brand_link:string;
  tags: string[]
}

export interface ProductData {
  id:number;
  category_id:number;
  name:string;
  description:string;
  tags: string[]
  image:string;
  href:string;
  price:number;
  isnew:boolean;
}

export interface CategoryData {
  id:number;
  section:string;
  name:string;
}
