import { Router } from 'express';
import prisma from '../database';

const router = Router();

// Get all ordered items
router.get('/', async (req, res) => {
  try {
    const orderedItems = await prisma.orderedItem.findMany({
      include: {
        product: true,
        order: true,
      },
    });

    const formattedOrderedItems = orderedItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      createdAt: item.createdAt,
      product: item.product.name, // Include only the product name
      order: item.order.id, // Include only the order ID
      user: item.order.userId ?? 'Guest', // Include email or 'Guest'
    }));

    res.json(formattedOrderedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ordered items', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrderedItem = await prisma.orderedItem.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: 'Ordered item deleted successfully',
      deletedOrderedItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ordered item', error });
  }
});

export default router;
