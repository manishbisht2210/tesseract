import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

const app = express();

app.use('/static', express.static('./server/static'));

app.use(corsPrefetch);

app.post('/image', imagesUpload(
    './server/static/files',
    'http://localhost:3000/c.91cf3295.jpg'
));

app.listen(3000, () => {
    console.log('Listen: 3000');
});
