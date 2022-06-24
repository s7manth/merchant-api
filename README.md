## API for building Merchant DAO

This repository contains the source code for API for building a DAO. The main functionalities include maintaining User-Merchant, Merchant-Merchant, and User-User interactions regarding payments, offer and reward redemptions and issuing. 

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

* `createReward`

* `createPayment`

* `deleteUser`

* `deleteMerchant`

* `deleteOffer`

* `deleteReward`


