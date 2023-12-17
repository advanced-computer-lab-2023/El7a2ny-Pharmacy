## Project Title

"El7a2ny" is a virtual pharmacy and serves three user parties which are pharmacists, patients and admins. This is an implementation of a mern stack web application. 

## Motivation

We thought of implementing this web application to make it easier for patients to order their medications anytime, anywhere and pay online or pay on delivery.

## Build Status

One of the biggest problems we have in our code is that we did not follow the clean code guidelines in a lot of parts of our project, also some UI elements need to look more consistent, the project needs unit tests, accounting for scalability and good performance is missing, also the application is not deployed yet

## Code Style

The code style is enforced using `eslint` and `prettier`. The code style is enforced using `pre-commit` hooks and `pre-commit github action.`

## Screenshots

Homepage

![Screenshot (37)](https://github.com/advanced-computer-lab-2023/teamSlim-Clinic/assets/134972084/2fd26f99-da47-43ef-a11a-f8bc27a25766)

Pharmacist registration form

![Screenshot (38)](https://github.com/advanced-computer-lab-2023/teamSlim-Clinic/assets/134972084/9f4f6d53-aea3-4371-be97-b606a2cc01c4)

Admin can view/filter all medicines

![Screenshot (39)](https://github.com/advanced-computer-lab-2023/teamSlim-Clinic/assets/134972084/2d629aad-3b6f-41ce-ab7f-4daa7baf3dc7)

Admin manages all pharmacists

![Screenshot (40)](https://github.com/advanced-computer-lab-2023/teamSlim-Clinic/assets/134972084/41fc099b-2234-4e21-a325-803fb8608097)

## Tech/Framework used

- React.js
- Node.js
- Nodemon
- Express
- MongoDB
- Mongoose
- Postman
- VSCode
- Git
- Github
- Cors
- jwt
- Validator
- NodeMailer
- Stripe
- Formik
- BootStrap
- PrimeReact
  
## Features

There are three different types of users which are pharmacists, patients and admins:

As an admin I can: Login and logout, add other administrators, add or remove pharmacists, accept/reject pharmacists' requests, change or reset passwords, view, search or filter medicines, view sales reports and view patients or pharmacists' information.

As a pharmacist I can: Login and logout, upload documents, change or reset passwords, view, search, add or filter medicines, view medicine quantities, upload their images, edit their prices and archive/unarchive them, view and filter sales,  chat with doctors, view wallet, and get informed when medicines are out of stock.

As a patient I can: Login and logout, change or reset passwords, view, search or filter medicines, add over the counter medicine to cart, add prescription medicine to cart, view cart, remove item or change item amount from cart, checkout, add or choose delivery address, choose payment method, view current or past orders, view status of order or cancel it, view out of stock medicine alternatives, chat with pharmacists.

As a guest I can: Register as a patient or submit request to be a pharmacist using the required info.

## Code Examples

In the server.js file which is the startpoint of our app, we create an express app and we use another file for the administrator routes and we also connect to the data base:

`const app = express();`

`app.use('/api/administrators', administratorRoutes);`

In the administrator routes file, we create a router and use it to create an API with a PATCH http method and we call the changePassword method which is in the administrator controller file:

`const router = express.Router();`

`router.patch('/change-password', changePassword);`

In the administrator controller file, we implement the changePassword method: we make sure that the new password is strong enough and then we update the password of the admin.

```
const changePassword = async (req, res) => {
    const id = req.user._id
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such admin'});
    if(!validator.isStrongPassword(req.body.password)) 
        return res.status(400).json({error: 'Password not strong enough'});
    const admin = await Administrator.findOneAndUpdate({_id: id}, {password: req.body.password});
    if(!admin)
        return res.status(404).json({error: 'no such admin'});
    res.status(200).json(admin); 
};
```

## Installation

- You need to install: 

VS code
https://code.visualstudio.com/download

Node/Nodemon/Express/Mongoose/React/Axios
https://www.npmjs.com/

Postman
https://www.postman.com/downloads/

## API Refrences

These are all our API endpoints:

http://localhost:4000/api/administrators/login (POST)


http://localhost:4000/api/administrators/OTP-email (POST)


http://localhost:4000/api/administrators/OTP-login (POST)


http://localhost:4000/api/administrators/add-admin (POST)


http://localhost:4000/api/administrators/all-patients (GET)


http://localhost:4000/api/administrators/one-patient/:id (GET)


http://localhost:4000/api/administrators/remove-patient/:id (DELETE)


http://localhost:4000/api/administrators/all-medicines (GET)


http://localhost:4000/api/administrators/all-medicines-search-by-name/:name (GET)


http://localhost:4000/api/administrators/all-medicines-filter-by-medicinal-use/:usage (GET)


http://localhost:4000/api/administrators/all-pharmacists' (GET)


http://localhost:4000/api/administrators/one-pharmacist/:id (GET)


http://localhost:4000/api/administrators/remove-pharmacist/:id (DELETE)


http://localhost:4000/api/administrators/pharmacist-request/:id (PATCH)


http://localhost:4000/api/administrators/all-pharmacists-requests (GET)


http://localhost:4000/api/administrators/change-password (PATCH)


http://localhost:4000/api/administrators/sales-report (GET)


http://localhost:4000/api/administrators/sales-report-filter-by-date/:startDate/:endDate (GET)


http://localhost:4000/api/administrators/sales-report-filter-by-medicine/:name (GET)



http://localhost:4000/api/patients/register (POST)


http://localhost:4000/api/patients/login (POST)


http://localhost:4000/api/patients/OTP-email (POST)


http://localhost:4000/api/patients/OTP-login (POST)


http://localhost:4000/api/patients/all-medicines (GET)


http://localhost:4000/api/patients/all-medicines-search-by-name/:name (GET)


http://localhost:4000/api/patients/all-medicines-filter-by-medicinal-use/:usage (GET)


http://localhost:4000/api/patients/change-password (PATCH)


http://localhost:4000/api/patients/add-address (PATCH)


http://localhost:4000/api/patients/view-cart (GET)


http://localhost:4000/api/patients/remove-medicine-from-cart/:id (PATCH)


http://localhost:4000/api/patients/update-medicine-quantity-in-cart/:id (PATCH)


http://localhost:4000/api/patients/all-not-filled-prescriptions (GET)


http://localhost:4000/api/patients/one-prescription/:id (GET)


http://localhost:4000/api/patients/add-medicine-to-cart/:id (PATCH)


http://localhost:4000/api/patients/over-the-counter-medicines (GET)


http://localhost:4000/api/patients/my-addresses (GET)


http://localhost:4000/api/patients/credit-card-payment (POST)


http://localhost:4000/api/patients/place-order (POST)


http://localhost:4000/api/patients/my-orders (GET)


http://localhost:4000/api/patients/one-order/:id (GET)


http://localhost:4000/api/patients/cancel-order/:id (PATCH)


http://localhost:4000/api/patients/my-wallet (GET)


http://localhost:4000/api/patients/medicine-alternatives/:id (GET)


http://localhost:4000/api/pharmacists/register-request (POST)


http://localhost:4000/api/pharmacists/login (POST)


http://localhost:4000/api/pharmacists/OTP-email (POST)


http://localhost:4000/api/pharmacists/OTP-login (POST)



http://localhost:4000/api/pharmacists/upload-working-license (PATCH)


http://localhost:4000/api/pharmacists/upload-pharmacy-degree (PATCH)


http://localhost:4000/api/pharmacists/upload-gov-id (PATCH)



http://localhost:4000/api/pharmacists/all-medicines (GET)


http://localhost:4000/api/pharmacists/all-medicines-search-by-name/:name (GET)


http://localhost:4000/api/pharmacists/all-medicines-filter-by-medicinal-use/:usage (GET)


http://localhost:4000/api/pharmacists/change-password (PATCH)


http://localhost:4000/api/pharmacists/add-medicine (POST)


http://localhost:4000/api/pharmacists/update-medicine/:id (PATCH)


http://localhost:4000/api/pharmacists/upload-medicine-image/:id (PATCH)


http://localhost:4000/api/pharmacists/my-wallet (GET)


http://localhost:4000/api/pharmacists/sales-report (GET)


http://localhost:4000/api/pharmacists/sales-report-filter-by-date/:startDate/:endDate (GET)


http://localhost:4000/api/pharmacists/sales-report-filter-by-medicine/:name (GET)


http://localhost:4000/api/pharmacists/notifications (GET)

## Tests

We tested all our APIs using Postman and this is an example for the testing.

![Postman ss](https://github.com/advanced-computer-lab-2023/teamSlim-Clinic/assets/134972084/d1582c1e-88a3-44d6-9b70-c16c07b10172)

You choose the http method, for example (POST), the API endpoint, for example (localhost:4000/api/patients/login), you also provide the bearer token as authorization (if needed), and you provide the request body/ parameters if you need, here we pass the request body as raw JSON with two fields the username and password, finally you send the request and you will recieve the responce.

## How to Use

- To use this app you'll need to clone the repository using the command: git clone https://github.com/Advanced-Computer-Lab-2023/teamSlim-Pharmacy.

First, create a .env file and populate PORT, SECRET (used for jwt), MONGO_URI.

Then, run backend so you need to run these commands:
- `cd backend`
- `npm install`
- `nodemon server`

Then, run frontend so you need to run these commands:
- `cd frontend`
- `npm install`
- `npm start`
  
## Contribute
We'd gladly accept your contribution and to do that just kindly do the following:

Pull Request Process:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Make changes and commit them (`git commit -am 'Add new feature'`).
4. Push the branch to your fork (`git push origin feature/new-feature`).
5. Open a pull request.

Code Review:
- All contributions go through code review. Be prepared to make changes based on feedback.

Communication:
- via email: abdalla.mahgoub@student.guc.edu.eg

Thank you for helping make this project better!

## Credits

We want to thank the German University in Cairo for giving us the opportunity to work on this project and special thanks to Dr Mervat Aboulkheir, Eng. Nada Ibrahim, Eng. Hadwa Pasha
Eng. Noha Hamid, Eng. Fatma Elazab, Eng. Amr Diab, Eng. Mahmoud Mabrouk for helping us throughout the semester in completing this project.

I've compiled a playlist of the youtube videos that helped us in this project:

https://youtube.com/playlist?list=PLiDu-Rr2uZ-ElVGKAmmW1My0_XKYGQUv5&si=uTo0qIaW-LoAuv0i

## License

Licensed under the Apache license, version 2.0. You're not allowed to use this file without compliance with the license
link: http://www.apache.org/licenses/LICENSE-2.0
