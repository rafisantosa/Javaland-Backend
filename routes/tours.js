import express from 'express';
import { createTour, updateTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controller/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

// Buat Tour Baru
router.post('/', verifyAdmin, createTour)

//Update Tour
router.put('/:id', verifyAdmin, updateTour)

//delete Tour
router.delete('/:id', verifyAdmin, deleteTour)

//get Single Tour
router.get('/:id', getSingleTour)


//get All Tour
router.get('/', getAllTour)

//get tour by pencarian
router.get('/search/getTourBySearch', getTourBySearch)

//get featured
router.get('/search/getFeaturedTours', getFeaturedTour)

// get Tour Count
router.get('/search/getTourCount', getTourCount)


export default router;