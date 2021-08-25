# payments-api

Payments service with a JSON API

## The service exposes the following endpoints:

- **Sign up**: POST /v1/signup
- **Authentication**: POST /v1/authenticate
- **List payments**: GET /v1/payments
- **Create payment**: POST /v1/payments
- **Get payment**: GET /v1/payment/:id
- **Approve payment**: PUT /v1/payments/:id/approve
- **Cancel payment**: PUT /v1/payments/:id/cancel

## Payment attributes:

- id
- payeeld
- payerId
- paymentSystem
- paymentMethod
- amount
- currency
- status
- comment
- created
- updated
