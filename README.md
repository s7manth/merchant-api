## API for building Merchant DAO

This repository contains the source code for API for building a DAO. The main
functionalities include maintaining User-Merchant, Merchant-Merchant, and
User-User interactions regarding payments, offer and reward issuing and
redemptions.

### How to use this repository?

In order to start development, the following steps are needed to be followed.

-   Clone the repository using the following command line script :
    ```shell
    git clone https://github.com/s7manth/merchant-api.git
    ```
-   Once cloned, you need to set a few things :

    -   Environment file `.env` : This contains the environment variables to be
        used, like MongoDB URL, default reward and offer redemption configs. A
        sample `.env` file would look something like this :

    ```
    MONGODB_URL=
    PORT=
    ```

-   Once the environment variables are set, one can start development by running
    the following command :

    ```shell
    npm run dev
    ```

    This will run the express application on the default port 5001, unless one
    has set something else in the `.env` file.

### The API Description

The Merchant API has been structured according to the functionalities that are
exposed at each point. There are three main endpoints : `data`, `logic`, and
`scrape`. These endpoints are served by the `dataRouter`, `logicRouter`, and
`scrapeRouter` respectively.

### Available Functions

-   `createUser`

Functionality : Creating a user document on the database

Endpoint : `/data/user`

Type of HTTP Request : `POST`

Request format :

```json
{}
```

Response format :

```json
{
    "msg": "New User Created",
    "id": "<id-of-the-user-document-created>"
}
```

-   `createMerchant`

Functionality : Creating a merchant document on the database

Endpoint : `/data/merchant`

Type of HTTP Request : `POST`

Note : All parameters except name are optional

Request format :

```json
{
    "name": "<name-of-the-merchant>",
    "configOfferTitle": "<config-offer-title>",
    "configOfferDiscount": "<config-offer-discount>",
    "configOfferDescription": "<config-offer-description>",
    "configRewardTitle": "<config-reward-title>",
    "configRewardAmount": "<config-reward-amount>",
    "configRewardDescription": "<config-reward-description>",
    "configOfferImage": "<config-offer-image>",
    "configRewardImage": "config-reward-image"
}
```

Response format :

```json
{
    "msg": "New Merchant Created",
    "name": "<name-of-the-merchant>",
    "id": "<id-of-the-merchant-document-created>"
}
```

-   `createOffer`

Functionality : Creating an offer document on the database based on the given
parameter values

Endpoint : `/data/offer`

Type of HTTP Request : `POST`

Request format :

```json
{
    "issuerMerchantId": "<id-of-the-merchant-issuing-the-offer>",
    "description": "<offer-description>",
    "title": "<offer-title>",
    "discount": "<offer-discount>",
    "userOwner": "<id-of-the-owner-user>"
}
```

Response format :

```json
{
    "msg": "New Offer Created",
    "id": "<id-of-the-offer-document-created>"
}
```

-   `createReward`

Functionality : Creating a reward document on the database based on the given
parameter values

Endpoint : `/data/reward`

Type of HTTP Request : `POST`

Request format :

```json
{
    "issuerMerchantId": "<id-of-the-merchant-issuing-the-reward>",
    "description": "<reward-description>",
    "title": "<reward-title>",
    "userOwner": "<id-of-the-owner-user>"
}
```

Response format :

```json
{
    "msg": "New Reward Created",
    "id": "<id-of-the-reward-document-created>"
}
```

-   `createPayment`

Functionality : Creating a payment document on the database based on the given
parameter values

Endpoint : `/data/payment`

Type of HTTP Request : `POST`

Note : Attachment Identifier(s) are optional. There are two attachment
identifier fields because a single payment can have either offer, reward or
both.

Request format :

```json
{
    "billAmount": "<the-bill-amount-associated-with-the-payment>",
    "paymentAmount": "<the-payment-amount-associated-with-the-payment>",
    "senderId": "<id-of-the-sender-entity>",
    "receiverId": "<id-of-the-receiver-entity>",
    "attachmentIdOne": "<id-of-the-attachment-one>",
    "attachmentIdTwo": "<id-of-the-attachment-two>"
}
```

Response format :

```json
{
    "msg": "New Payment Created",
    "id": "<id-of-the-payment-document-created>"
}
```

-   `deleteUser`

Functionality : Deleting a user document associated with the given identifier

Endpoint : `/data/user`

Type of HTTP Request : `DELETE`

Request format :

```json
{
    "id": "<id-of-the-user-to-be-deleted>"
}
```

Response format :

```json
{
    "msg": "User Deleted"
}
```

-   `deleteMerchant`

Functionality : Deleting a merchant document associated with the given
identifier

Endpoint : `/data/merchant`

Type of HTTP Request : `DELETE`

Request format :

```json
{
    "id": "<id-of-the-merchant-to-be-deleted>"
}
```

Response format :

```json
{
    "msg": "Merchant Deleted"
}
```

-   `deleteOffer`

Functionality : Deleting an offer document associated with the given identifier

Endpoint : `/data/offer`

Type of HTTP Request : `DELETE`

Request format :

```json
{
    "id": "<id-of-the-offer-to-be-deleted>"
}
```

Response format :

```json
{
    "msg": "Offer Deleted"
}
```

-   `deleteReward`

Functionality : Deleting a reward document associated with the given identifier

Endpoint : `/data/reward`

Type of HTTP Request : `DELETE`

Request format :

```json
{
    "id": "<id-of-the-reward-to-be-deleted>"
}
```

Response format :

```json
{
    "msg": "Reward Deleted"
}
```

-   `getUser`

Functionality : Getting user document based on the given identifier

Endpoint : `/data/user`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-user-to-be-retrieved>"
}
```

Response format :

```json
{
    "_id": "<id-of-the-user>",
    "offers": [],
    "rewards": [],
    "payments": []
}
```

-   `getMerchant`

Functionality : Getting merchant document based on the given identifier

Endpoint : `/data/merchant`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-merchant-to-be-retrieved>"
}
```

Response format :

```json
{
    "_id": "<id-of-the-merchant>",
    "offers": [],
    "rewards": [],
    "payments": []
}
```

-   `getOffer`

Functionality : Getting offer document based on the given identifier

Endpoint : `/data/offer`

Type of HTTP Request : `GET`

Note : Image is an optional field, it might not be present

Request format :

```json
{
    "id": "<id-of-the-offer-to-be-retrieved>"
}
```

Response format :

```json
{
    "_id": "<id-of-the-user>",
    "issuerMerchant": "<issuer-merchant>",
    "description": "<description-of-the-offer>",
    "title": "<title-of-the-offer>",
    "image": "<image-of-the-offer>",
    "discount": "<discount-associated-with-the-offer>"
}
```

-   `getReward`

Functionality : Getting reward document based on the given identifier

Endpoint : `/data/reward`

Type of HTTP Request : `GET`

Note : Image is an optional field, it might not be present

Request format :

```json
{
    "id": "<id-of-the-reward-to-be-retrieved>"
}
```

Response format :

```json
{
    "_id": "<id-of-the-reward>",
    "issuerMerchant": "<issuer-merchant>",
    "description": "<description-of-the-reward>",
    "title": "<title-of-the-reward>",
    "image": "<image-of-the-reward>"
}
```

-   `getPayment`

Functionality : Getting payment document based on the given identifier

Endpoint : `/data/payment`

Type of HTTP Request : `GET`

Note : Attachment is an optional field, it might not be present

Request format :

```json
{
    "id": "<id-of-the-payment-to-be-retrieved>"
}
```

Response format :

```json
{
    "_id": "<id-of-the-reward>",
    "sender": "<sender>",
    "receiver": "<receiver>",
    "amount": "<amount-associated-with-the-payment>",
    "attachment": "<attachement-to-the-payment-like-offer-or-reward>"
}
```

-   `updateOffer`

Functionality : Updating the offer document based on the parameters

Endpoint : `/data/offer`

Type of HTTP Request : `PATCH`

Note : Description, IssuerMerchant Identifier, Title, Image, and Discount are
optional fields

Request format :

```json
{
    "id": "<id-of-the-offer-to-be-updated>",
    "description": "<new-description>",
    "issuerMerchantId": "<new-issuer-merchant>",
    "title": "<new-title>",
    "image": "<new-image>",
    "discount": "<new-discount-amount>"
}
```

Response format :

```json
{
    "msg": "Offer Updated"
}
```

-   `updateReward`

Functionality : Updating the reward document based on the parameters

Endpoint : `/data/reward`

Type of HTTP Request : `PATCH`

Note : Description, IssuerMerchant Identifier, Title, and Image are optional
fields

Request format :

```json
{
    "id": "<id-of-the-reward-to-be-updated>",
    "description": "<new-description>",
    "issuerMerchantId": "<new-issuer-merchant>",
    "title": "<new-title>",
    "image": "<new-image>"
}
```

Response format :

```json
{
    "msg": "Reward Updated"
}
```

-   `updateMerchant`

Functionality : Updating the merchant document based on the parameters

Endpoint : `/data/merchant`

Type of HTTP Request : `PATCH`

Note : Description, IssuerMerchant Identifier, Title, and Image are optional
fields

Request format :

```json
{
    "id": "<id-of-the-reward-to-be-updated>",
    "name": "<name-of-the-merchant>",
    "configOfferTitle": "<config-offer-title>",
    "configOfferDiscount": "<config-offer-discount>",
    "configOfferDescription": "<config-offer-description>",
    "configRewardTitle": "<config-reward-title>",
    "configRewardAmount": "<config-reward-amount>",
    "configRewardDescription": "<config-reward-description>",
    "configOfferImage": "<config-offer-image>",
    "configRewardImage": "config-reward-image"
}
```

Response format :

```json
{
    "msg": "Merchant Updated"
}
```

-   `getOffersByUser`

Functionality : Getting offers owned by the user

Endpoint : `/logic/get-offers-by-user`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-user>"
}
```

Response format :

```json
{
    "offers": []
}
```

-   `getRewardsByUser`

Functionality : Getting rewards owned by the user

Endpoint : `/logic/get-rewards-by-user`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-user>"
}
```

Response format :

```json
{
    "rewards": []
}
```

-   `getOffersByMerchant`

Functionality : Getting offers issued by the merchant

Endpoint : `/logic/get-offers-by-merchant`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-merchant>"
}
```

Response format :

```json
{
    "offers": []
}
```

-   `getRewardsByMerchant`

Functionality : Getting rewards issued by the merchant

Endpoint : `/logic/get-rewards-by-merchant`

Type of HTTP Request : `GET`

Request format :

```json
{
    "id": "<id-of-the-merchant>"
}
```

Response format :

```json
{
    "rewards": []
}
```

-   `getOfferOnPayment`

Functionality : Generating a new offer based on the payment

Endpoint : `/logic/get-offer-on-payment`

Type of HTTP Request : `GET`

Request format :

```json
{
    "userId": "<id-of-the-user-involved-in-payment>",
    "paymentId": "<payment-id>",
    "merchantId": "<id-of-the-merchant-involved-in-payment>",
    "offerTitle": "<title-for-the-offer>",
    "offerDescription": "<description-for-the-offer>",
    "offerDiscount": "<discount-for-the-offer>"
}
```

Response format :

```json
{
    "msg": "Offer based on Payment Generated",
    "offer": "<offer-object>"
}
```

-   `getRewardOnPayment`

Functionality : Generating a new reward based on the payment

Endpoint : `/logic/get-reward-on-payment`

Type of HTTP Request : `GET`

Request format :

```json
{
    "userId": "<id-of-the-user-involved-in-payment>",
    "paymentId": "<payment-id>",
    "merchantId": "<id-of-the-merchant-involved-in-payment>",
    "rewardTitle": "<title-for-the-reward>",
    "rewardDescription": "<description-for-the-reward>"
}
```

Response format :

```json
{
    "msg": "Reward based on Payment Generated",
    "reward": "<reward-object>"
}
```

-   `scrapeSquare`

Functionality : Scraping the URL for Square Payment QR codes

Endpoint : `/scrape/square`

Type of HTTP Request : `POST`

Request format :

```json
{
    "url": "<url-of-the-payment-qr-code>"
}
```

Response format :

```json
{
    "merchantName": "<name-of-the-merchant",
    "totalAmount": "<total-transaction-amount>",
    "itemNames": "<names-of-the-items>",
    "itemPrices": "<prices-of-the-items>",
    "itemQuantities": "<quantities-of-the-items>"
}
```
