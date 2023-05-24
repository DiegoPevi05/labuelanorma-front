export interface webContentRaw {
    id:number;
    section:string;
    subSection:string;
    content_type:string,
    content_text:string;
    content_url:string;
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
  subHeader:string;
  header:string;
  video:string;
}

export interface AboutWebData {
  description:string;
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
    subheader:string;
}
export interface GiveawayWebData {
    subheader:string;
}

export interface GiveawayData {
  id:number;
  imgUrl:string;
  title:string;
  description:string;
  expiredDate:string;
}

export interface PartnerData {
  id:number;
  name:string;
  imageHeader:string;
  descriptionBrand:string;
  videoPublicity:string;
  brandPage:string;
  tags: string[]
}

export interface StoreData {
  id:number;
  name:string;
  description:string;
  tags: string[]
  image:string;
  href:string;
  price:number;
  isnew:boolean;
}
