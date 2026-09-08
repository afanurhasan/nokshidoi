import { gql } from '@apollo/client';

export const GET_LANDING_PAGE = gql`
  query GetLandingPage {
    landingPage {
      documentId
      heroBadge
      heroTitle
      heroPriceStart
      heroButtonText
      heroBgColor
      heroImage {
        url
      }
      heroProduct {
        documentId
        name
        price
        rating
        slug
      }
      banner1Title
      banner1Subtitle
      banner1BgColor
      banner1Image {
        url
      }
      banner1Product {
        documentId
        name
        price
        slug
      }
      banner2Title
      banner2Subtitle
      banner2BgColor
      banner2Image {
        url
      }
      banner2Product {
        documentId
        name
        price
        slug
      }
      latestSectionTitle
      latestProducts {
        documentId
        name
        slug
        description
        price
        mrp
        rating
        images {
          url
        }
        category {
          name
          slug
        }
      }
      bestSellingSectionTitle
      bestSellingProducts {
        documentId
        name
        slug
        description
        price
        mrp
        rating
        images {
          url
        }
        category {
          name
          slug
        }
      }
      productSections {
        id
        title
        columns
        products {
          documentId
          name
          slug
          description
          price
          mrp
          rating
          images {
            url
          }
          category {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      documentId
      name
      slug
      description
      price
      mrp
      rating
      inStock
      storeName
      images {
        url
      }
      category {
        name
        slug
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      documentId
      name
      slug
      description
      image {
        url
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      name
      slug
      description
      price
      mrp
      rating
      inStock
      storeName
      images {
        url
      }
      category {
        name
        slug
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      documentId
      orderId
      customerName
      customerEmail
      total
      paymentMethod
      paymentStatus
      orderStatus
      address
      items
      createdAt
    }
  }
`;
