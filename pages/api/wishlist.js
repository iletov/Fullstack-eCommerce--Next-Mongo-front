import { mongooseConnect } from "@/lib/mongoose";
import { WishedProducts } from "@/models/WishedProducts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  await mongooseConnect();

  const { user } = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    const { product } = req.body;
    const wishedDoc = await WishedProducts.findOne({userEmail:user.email, product});
    if (wishedDoc) {
      await WishedProducts.findByIdAndDelete(wishedDoc._id);
      res.json({ wishedDoc });

    } else {
      await WishedProducts.create({ userEmail:user.email, product });
      res.json('created');
    }
  }

  if (req.method === 'GET') {
    res.json(
      await WishedProducts.find({ userEmail: user.email}).populate('product')
    )
  }
}