import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import TripRouter from './routes/trip.route';
import BusRouter from './routes/bus.route';
import TicketRouter from './routes/ticket.route';


const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1/', TripRouter);
app.use('/api/v1/', BusRouter);
app.use('/api/v1/', TicketRouter);
app.get('/', (req, res) => res.status(200).json({
  status: 'succes',
  data: 'data'

}));


app.all('*', (err, req, res, next) => {
  if (!err) return next();
  return res.status(400).json({
    status: 400,
    error: `Failed to decode param: ${req.url}`
  });
});

export default app;
