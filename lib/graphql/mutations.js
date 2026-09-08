import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      orderId
      customerName
      customerEmail
      total
      orderStatus
      paymentMethod
      paymentStatus
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($documentId: ID!, $data: OrderInput!) {
    updateOrder(documentId: $documentId, data: $data) {
      documentId
      orderId
      orderStatus
      paymentStatus
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        documentId
        username
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        documentId
        username
        email
      }
    }
  }
`;
