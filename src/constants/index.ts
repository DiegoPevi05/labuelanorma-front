import { ProductIt } from '../interfaces/global';
const BASE_URL = 'http://localhost:8080/api/v1';

const navLinks = [
  {
    id: "about",
    title: "Nosotros",
  },
  {
    id: "trending",
    title: "Trending",
  },
  {
    id: "store",
    title: "Tienda",
  },
  {
    id: "brands",
    title: "Partners",
  },
  {
    id: "contact",
    title: "Contactanos",
  }
];

const ContentWeb = {
  web: [
  { 
    id:1,
    section:"hero",
    subSection:"video",
    content_type:"url",
    content_text:"https://www.youtube.com/embed/IwJS6JU7-xc",
    content_url:""
  },
  {
    id:2,
    section:"hero",
    subSection:"header",
    content_type:"text",
    content_text:"Preparate para divertite a lo grande",
    content_url:""
  },
  {
    id:3,
    section:"hero",
    subSection:"subHeader",
    content_type:"text",
    content_text:"La Diversion esta asegurada",
    content_url:""
  },
  {
    id:5,
    section:"about",
    subSection:"description",
    content_type:"text",
    content_text:"I'm a skilled software developer with experience in Typescript, React, Node, and MongoDB. I'm a skilled software developer with experience in Typescript, React, Node, and MongoDB. I'm a skilled software developer with experience in Typescript, React, Node, and MongoDB.",
    content_url:""
  },
  {
    id:6,
    section:"social",
    subSection:"tiktok",
    content_type:"text",
    content_text:"https://www.tiktok.com/@zullyzoum",
    content_url:""
  },
  {
    id:7,
    section:"social",
    subSection:"instagram",
    content_type:"text",
    content_text:"https://www.instagram.com/labuelanorma/",
    content_url:""
  },
  {
    id:8,
    section:"social",
    subSection:"facebook",
    content_type:"text",
    content_text:"https://www.facebook.com/labuaelanorma",
    content_url:""
  },
  {
    id:9,
    section:"social",
    subSection:"youtube",
    content_type:"text",
    content_text:"https://www.youtube.com/@LaabuelaNorma",
    content_url:""
  },{
    id:10,
    section:"video",
    subSection:"video1",
    content_type:"text",
    content_text:"https://www.youtube.com/embed/IwJS6JU7-xc",
    content_url:""
  },{
    id:11,
    section:"video",
    subSection:"video2",
    content_type:"text",
    content_text:"https://www.tiktok.com/embed/7209692260315761926",
    content_url:""
  },{
    id:12,
    section:"video",
    subSection:"video3",
    content_type:"text",
    content_text:"https://www.youtube.com/embed/M7_64WvxcIU",
    content_url:""
  },{
    id:13,
    section:"video",
    subSection:"video4",
    content_type:"text",
    content_text:"https://www.tiktok.com/embed/7210552743021317382",
    content_url:""
  },{
    id:14,
    section:"video",
    subSection:"video5",
    content_type:"text",
    content_text:"https://www.youtube.com/embed/dM1dqdkm4L4",
    content_url:""
  },{
    id:15,
    section:"partner",
    subSection:"subheader",
    content_type:"text",
    content_text:"Marcas con las cuales he trabajado y he desarrollado un gran afecto.",
    content_url:""
  },{
    id:16,
    section:"giveaway",
    subSection:"subheader",
    content_type:"text",
    content_text:"Participa de Grandes sorteos y Concursos.",
    content_url:""
  }
  ],
  store: [
          {
            id:1,
            name: "Mochila de Dora la Exploradora",
            description:"La mochila esta fabricada en latex, con los mejores productos para tu bienestar.",
            tags: ["Dora","Exploradora","Me viene bien"],
            image: "https://github.com/",
            href: "https://github.com/",
            price:10,
            isnew:true
          },
          {
            id:2,
            name: "Mochila de Dora la Exploradora",
            description:"La mochila esta fabricada en latex, con los mejores productos para tu bienestar.",
            tags: ["Dora","Exploradora","Me viene bien"],
            image: "https://github.com/",
            href: "https://github.com/",
            price:5,
            isnew:true
          },
          {
            id:3,
            name: "Mochila de Dora la Exploradora",
            description:"La mochila esta fabricada en latex, con los mejores productos para tu bienestar.",
            tags: ["Dora","Exploradora","Me viene bien"],
            image: "https://github.com/",
            href: "https://github.com/",
            price:2,
            isnew:true
          }
  ],
  partners: [
    {
      id:1,
      name:"Tambo",
      imageHeader:"TamboLogo",
      descriptionBrand:"Antes de ir a la playa, para la reu con los amigos o en la previa antes de la juerga el tío @Tiendas Tambo TE SALVA 🛟🥳✨ #viral #parati #peru #verano #publicidad",
      videoPublicity:"https://www.tiktok.com/embed/7203500232821263622",
      brandPage:"www.tambo.pe",
      tags: ["supabase","hola","nextjs"]
    },
    {
      id:2,
      name:"Tambo1",
      imageHeader:"TamboLogo",
      descriptionBrand:"Tambo es una marca de tiendas de servicios",
      videoPublicity:"https://www.tiktok.com/embed/7203500232821263622",
      brandPage:"www.tambo.com.pe",
      tags: ["supabase","hola","nextjs"]
    },
    {
      id:3,
      name:"Tamb2",
      imageHeader:"TamboLogo",
      descriptionBrand:"Tambo es una marca de tiendas de servicios",
      videoPublicity:"https://www.tiktok.com/embed/7203500232821263622",
      brandPage:"www.tambo.com.pe",
      tags: ["supabase","hola","nextjs"]
    }
  ],
  giveaway:{
    id:1,
    imgUrl: "#",
    title: "Mi cumpleaños",
    description: "El cumpleaños de zullyzoum",
    expiredDate: "13-08-2023"
  }
} 

const products:ProductIt[] = [
    {
      id:1,
      name: 'Basic Tee',
      section:'Clothing',
      category:'Chompas',
      price: 192,
      breadcrumbs: [
        { id: 1, name: 'Categorias', href: '/store' },
        { id: 2, name: 'Clothing', href: '/store' },
      ],
      defaultImage:{
        src:'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt:'Model wearing plain black basic tee.',
      }, 
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      createdAt: '2020-01-07T19:04:28Z',
    },

    {
      id:1,
      name: 'Basic Tee',
      section:'Clothing',
      category:'Chompas',
      price: 70,
      breadcrumbs: [
        { id: 1, name: 'Categorias', href: '/store' },
        { id: 2, name: 'Clothing', href: '/store' },
      ],
      defaultImage:{
        src:'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt:'Model wearing plain black basic tee.',
      }, 
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      createdAt: '2020-01-07T19:04:28Z',
    },

    {
      id:1,
      name: 'Basic Tee',
      section:'Clothing',
      category:'Chompas',
      price: 80,
      breadcrumbs: [
        { id: 1, name: 'Categorias', href: '/store' },
        { id: 2, name: 'Clothing', href: '/store' },
      ],
      defaultImage:{
        src:'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt:'Model wearing plain black basic tee.',
      }, 
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      createdAt: '2020-01-07T19:04:28Z',
    },

    {
      id:1,
      name: 'Basic Tee',
      section:'Clothing',
      category:'Polos',
      price: 190,
      breadcrumbs: [
        { id: 1, name: 'Categorias', href: '/store' },
        { id: 2, name: 'Clothing', href: '/store' },
      ],
      defaultImage:{
        src:'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt:'Model wearing plain black basic tee.',
      }, 
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      createdAt: '2020-01-07T19:04:28Z',
    },

    {
      id:1,
      name: 'Basic Tee4',
      section:'Food & Services',
      category:'Paneton de la Abuela Norma',
      price: 40,
      breadcrumbs: [
        { id: 1, name: 'Categorias', href: '/store' },
        { id: 2, name: 'Clothing', href: '/store' },
      ],
      defaultImage:{
        src:'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt:'Model wearing plain black basic tee.',
      }, 
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      createdAt: '2020-01-07T19:04:28Z',
    }
]


export {ContentWeb,BASE_URL,navLinks,products };
