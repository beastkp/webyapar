
# Admin based user creation system | webyapar

This is an admin based user creation system made with Nodejs and mongodb as the backend. The frontend is made using ejs and served as static files by express server. The image is stored locally in /uploads folder and in the database in encoded format using multer library. There is also an imaging cropping functionality added using cropperjs. 


## Acknowledgements

 - [Cropperjs](https://fengyuanchen.github.io/cropperjs/)
 - [Multer](https://www.npmjs.com/package/multer)
 - [Readme Generator](https://readme.so/)


## API Reference

#### Authorization routes

    /api/v1/auth


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/signup` | `POST` | **Required** userId, password, role |
|`/login` | `POST` | **Required** userId, password |

### User Routes

    /api/v1/user


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/confirmation`      | `POST` | **Required** userId |

### Admin Routes

    /api/v1/admin

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/fetchUsers`      | `GET` | **Required** ---------- |
| `/updateStatus` | `POST` | **Required** userId, status|

### Image Upload

    /upload

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/`      | `POST` | **Required** name, image, path, userId |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` - database connection string.

`PORT` - port for server to listen on.

`JWT_SECRET` - JWT secret key.


## Authors

- [@Krish Panchal](https://github.com/beastkp)

