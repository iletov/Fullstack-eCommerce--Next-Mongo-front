import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"

export default async function handler(req, res) {
  await mongooseConnect();

  const { user } = await getServerSession(req, res, authOptions);
  res.json(
    await Order.find({userEmail:user.email})
  );
}