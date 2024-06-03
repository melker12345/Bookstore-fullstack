import { Router } from 'express';
import prisma from '../database';

const router = Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderedItems: { include: { product: true } },
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      total: order.total,
      createdAt: order.createdAt,
      address: order.address,
      city: order.city,
      state: order.state,
      zip: order.zip,
      country: order.country,
      user: order.user ? order.user.email : 'Guest', // Include email or 'Guest'
      orderedItems: order.orderedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        createdAt: item.createdAt,
        product_name: item.product.name, // Include product name
      })),
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const {
    user_id,
    items,
    total,
    address,
    city,
    state,
    zip,
    country,
    delivery_method,
    payment_method,
  } = req.body;

  if (
    !items ||
    !total ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !country ||
    !delivery_method ||
    !payment_method
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user =
      user_id && user_id !== 0
        ? await prisma.user.findUnique({ where: { id: user_id } })
        : null;

    if (user_id && !user) {
      return res.status(400).json({ message: `Invalid user ID: ${user_id}` });
    }

    const orderData: any = {
      total,
      address,
      city,
      state,
      zip,
      country,
      orderedItems: {
        create: items.map(
          (item: { product_id: number; quantity: number; price: number }) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.product_id } },
          })
        ),
      },
    };

    if (user) {
      orderData.user = { connect: { id: user_id } };
    }

    const order = await prisma.order.create({
      data: orderData,
      include: {
        user: true,
        orderedItems: { include: { product: true } },
      },
    });

    res.status(201).json({
      id: order.id,
      total: order.total,
      createdAt: order.createdAt,
      address: order.address,
      city: order.city,
      state: order.state,
      zip: order.zip,
      country: order.country,
      user: order.user ? order.user.email : 'Guest',
      orderedItems: order.orderedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        createdAt: item.createdAt,
        product_name: item.product.name,
      })),
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error });
  }
});

export default router;
