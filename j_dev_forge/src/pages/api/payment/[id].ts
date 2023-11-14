/** Based off Pets / with-mongodb-mongoose example: with https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose */

import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Payment from '@/models/Payment'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET': //Get a payment by its ID
            try{
                let payment;
                if(id){
                    payment = await Payment.findById(id);
                } else {
                    return res.status(400).json({ success: false, message: 'Missing id'});
                }

                if(!payment){
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: payment });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break
        case 'PUT': //Edit a payment by its ID
            try{
                const payment = await Payment.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if(!payment){
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: payment})
            } catch (error){
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE': //Delete a payment by its ID
            try {
                const deletedPayment = await Payment.deleteOne({ _id: id })
                if(!deletedPayment) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {}})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
                res.status(400).json({ success: false })
                break
    }
}