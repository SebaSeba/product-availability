const express = 'express';
const dotenv = 'dotenv';
const cors = 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
const domain = process.env.DOMAIN;

app.use(cors())
app.use(morgan('combined'))
app.use(express.static('build'))

app.listen(port, () => {
    console.log(`[server]: Server is running at https://${domain}:${port}`);
});

// app.get('/products/:type', (req, res) => {
//     try {
//         const { type } = req.params;

//         await fetch(
//             `https://bad-api-assignment.reaktor.com/v2/products/${type}`, {
//                 method: 'GET',
//             }
//         )
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .send('Oops. Something went wrong');
//     }
// });

// app.get('/products/availability/:manufacturer', (req, res) => {
//     try {
//         const { manufacturer } = req.params;
//         await fetch(
//             `https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`, {
//                 method: 'GET',
//             }
//         )
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .send('Oops. Something went wrong');
//     }
// });