## API for building Merchant DAO

This repository contains the source code for API for building a DAO. 
The main functionalities include maintaining User-Merchant, Merchant-Merchant, 
and User-User interactions regarding payments, offer and reward redemptions and issuing. 

### How to use this repository?

In order to start development, the following steps are needed to be followed. 

* Clone the repository using the following command line script : `git clone https://github.com/s7manth/merchant-api.git`
* Once cloned, you need to set a few things : 
    * Environment file `.env` : This contains the environment variables to be used, like MongoDB URL, default reward and offer redemption  configs. A sample `.env` file would look something like this : 

    ```
    MONGODB_URL=
    PORT=
    PAYMENT_REWARD_TITLE=
    PAYMENT_REWARD_DESCRIPTION=
    PAYMENT_OFFER_TITLE=
    PAYMENT_OFFER_DESCRIPTION=
    PAYMENT_OFFER_DISCOUNT=
    ```
* Once the environment variables are set, one can start development by running the following command : `npm run dev`. This will run the express application on the default port 5001, unless one has set something else in the `.env` file. 

### The API Description

The Merchant API has been structured according to the functionalities that are exposed at each point. There are two main endpoints : `data` and `logic`. These endpoints are served by the `dataRouter` and `logicRouter` respectively. 

### Available Functions 

* `createUser`

Functionality : Creating a user document on the database
Endpoint : `/data/user`
Type of HTTP Request : `POST`

Request format : 

```json
{ }
```

Response format : 

```json
{
    msg: "New User Created",
    id: "<id-of-the-user-document-created>"
}
```

* `createMerchant`

Functionality : Creating a merchant document on the database
Endpoint : `/data/merchant`
Type of HTTP Request : `POST`

Request format : 

```json
{ }
```

Response format : 

```json
{
    msg: "New Merchant Created",
    id: "<id-of-the-merchant-document-created>"
}
```

* `createOffer`

Functionality : Creating an offer document on the database based on the given parameter values
Endpoint : `/data/offer`
Type of HTTP Request : `POST`

Request format : 

```json
{ 
    issuerMerchantId: "<id-of-the-merchant-issuing-the-offer>",
    description: "<offer-description>", 
    title: "<offer-title>", 
    discount: "<offer-discount>"
}
```

Response format : 

```json
{
    msg: "New Offer Created",
    id: "<id-of-the-offer-document-created>"
}
```

* `createReward`

Functionality : Creating a reward document on the database based on the given parameter values
Endpoint : `/data/reward`
Type of HTTP Request : `POST`

Request format : 

```json
{ 
    issuerMerchantId: "<id-of-the-merchant-issuing-the-reward>",
    description: "<reward-description>", 
    title: "<reward-title>"
}
```

Response format : 

```json
{
    msg: "New Reward Created",
    id: "<id-of-the-reward-document-created>"
}
```

* `createPayment`

Functionality : Creating a payment document on the database based on the given parameter values
Endpoint : `/data/payment`
Type of HTTP Request : `POST`

Request format : 

```json
{ 
    amount: "<the-amount-associated-with-the-payment>",
    senderId: "<id-of-the-sender-entity>", 
    receiverId: "<id-of-the-receiver-entity>", 
    attachmentId: "<id-of-the-attachment>" // this is an optional parameter
}
```

Response format : 

```json
{
    msg: "New Payment Created",
    id: "<id-of-the-payment-document-created>"
}
```

* `deleteUser`

Functionality : Deleting a user document associated with the given identifier
Endpoint : `/data/user`
Type of HTTP Request : `DELETE`

Request format : 

```json
{ 
    id: "<id-of-the-user-to-be-deleted>"
}
```

Response format : 

```json
{
    msg: "User Deleted"
}
```

* `deleteMerchant`

Functionality : Deleting a merchant document associated with the given identifier
Endpoint : `/data/merchant`
Type of HTTP Request : `DELETE`

Request format : 

```json
{ 
    id: "<id-of-the-merchant-to-be-deleted>"
}
```

Response format : 

```json
{
    msg: "Merchant Deleted"
}
```

* `deleteOffer`

Functionality : Deleting an offer document associated with the given identifier
Endpoint : `/data/offer`
Type of HTTP Request : `DELETE`

Request format : 

```json
{ 
    id: "<id-of-the-offer-to-be-deleted>"
}
```

Response format : 

```json
{
    msg: "Offer Deleted"
}
```

* `deleteReward`

Functionality : Deleting a reward document associated with the given identifier
Endpoint : `/data/reward`
Type of HTTP Request : `DELETE`

Request format : 

```json
{ 
    id: "<id-of-the-reward-to-be-deleted>"
}
```

Response format : 

```json
{
    msg: "Reward Deleted"
}
```

* `getUser`

Functionality : Getting user document based on the given identifier
Endpoint : `/data/user`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-user-to-be-retrieved>"
}
```

Response format : 

```json
{
    _id: "<id-of-the-user>",
    offers: [], // list of the offers owned by the user
    rewards: [], // list of the rewards owned by the user
    payments: [] // list of the payments in which the user was involved
}
```

* `getMerchant`

Functionality : Getting merchant document based on the given identifier
Endpoint : `/data/merchant`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-merchant-to-be-retrieved>"
}
```

Response format : 

```json
{
    _id: "<id-of-the-merchant>",
    offers: [], // list of the offers issued by the merchant
    rewards: [], // list of the rewards issued by the merchant
    payments: [] // list of the payments in which the merchant was involved
}
```

* `getOffer`

Functionality : Getting offer document based on the given identifier
Endpoint : `/data/offer`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-offer-to-be-retrieved>"
}
```

Response format : 

```json
{
    _id: "<id-of-the-user>",
    issuerMerchant: "<issuer-merchant>",
    description: "<description-of-the-offer>",
    title: "<title-of-the-offer>",
    image: "<image-of-the-offer>", // this is an optional field, so might not be present
    discount: "<discount-associated-with-the-offer>"
}
```

* `getReward`

Functionality : Getting reward document based on the given identifier
Endpoint : `/data/reward`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-reward-to-be-retrieved>"
}
```

Response format : 

```json
{
    _id: "<id-of-the-reward>",
    issuerMerchant: "<issuer-merchant>",
    description: "<description-of-the-reward>",
    title: "<title-of-the-reward>",
    image: "<image-of-the-reward>", // this is an optional field, so might not be present
}
```

* `getPayment`

Functionality : Getting payment document based on the given identifier
Endpoint : `/data/payment`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-payment-to-be-retrieved>"
}
```

Response format : 

```json
{
    _id: "<id-of-the-reward>",
    sender:"<sender>",
    receiver: "<receiver>",
    amount: "<amount-associated-with-the-payment>",
    attachment: "<attachement-to-the-payment-like-offer-or-reward>" // this is an optional field, so might not be present
}
```

* `updateOffer`

Functionality : Updating the offer document based on the parameters
Endpoint : `/data/offer`
Type of HTTP Request : `PATCH`

Request format : 

```json
{ 
    id: "<id-of-the-offer-to-be-updated>",
    description: "<new-description>", // optional 
    issuerMerchantId: "<new-issuer-merchant>", // optional 
    title: "<new-title>", // optional 
    image: "<new-image>", // optional 
    discount: "<new-discount-amount>" // optional 
}
```

Response format : 

```json
{
    msg: "Offer Updated"
}
```

* `updateReward`

Functionality : Updating the reward document based on the parameters
Endpoint : `/data/reward`
Type of HTTP Request : `PATCH`

Request format : 

```json
{ 
    id: "<id-of-the-reward-to-be-updated>",
    description: "<new-description>", // optional 
    issuerMerchantId: "<new-issuer-merchant>", // optional 
    title: "<new-title>", // optional 
    image: "<new-image>", // optional 
}
```

Response format : 

```json
{
    msg: "Reward Updated"
}
```

* `getOffersByUser`

Functionality : Getting offers owned by the user
Endpoint : `/logic/get-offers-by-user`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-user>"
}
```

Response format : 

```json
{
    offers: [], // list of the offers owned by the user
}
```

* `getRewardsByUser`

Functionality : Getting rewards owned by the user
Endpoint : `/logic/get-rewards-by-user`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-user>"
}
```

Response format : 

```json
{
    rewards: [], // list of the rewards owned by the user
}
```

* `getOffersByMerchant`

Functionality : Getting offers issued by the merchant
Endpoint : `/logic/get-offers-by-merchant`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-merchant>"
}
```

Response format : 

```json
{
    offers: [], // list of the offers issued by the merchant
}
```

* `getRewardsByMerchant`

Functionality : Getting rewards issued by the merchant
Endpoint : `/logic/get-rewards-by-merchant`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    id: "<id-of-the-merchant>"
}
```

Response format : 

```json
{
    rewards: [], // list of the rewards issued by the merchant
}
```

* `getOfferOnPayment`

Functionality : Generating a new offer based on the payment
Endpoint : `/logic/get-offer-on-payment`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    userId: "<id-of-the-user-involved-in-payment>", 
    paymentId: "<payment-id>", 
    merchantId: "<id-of-the-merchant-involved-in-payment>"
}
```

Response format : 

```json
{
    msg: "Offer based on Payment Generated",
    offer: "<offer-object>"
}
```

* `getRewardOnPayment`

Functionality : Generating a new reward based on the payment
Endpoint : `/logic/get-reward-on-payment`
Type of HTTP Request : `GET`

Request format : 

```json
{ 
    userId: "<id-of-the-user-involved-in-payment>", 
    paymentId: "<payment-id>", 
    merchantId: "<id-of-the-merchant-involved-in-payment>"
}
```

Response format : 

```json
{
    msg: "Reward based on Payment Generated",
    reward: "<reward-object>"
}
```

