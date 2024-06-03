BEGIN;

-- Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id serial PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    name VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    isFeatured BOOLEAN NOT NULL DEFAULT false,
    isBestSeller BOOLEAN NOT NULL DEFAULT false,
    imageUrl TEXT,
    CONSTRAINT products_name_unique UNIQUE (name) -- Ensure product names are unique
);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id serial PRIMARY KEY,
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- Track order status
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- Create Ordered Items Table
CREATE TABLE IF NOT EXISTS public.ordered_items (
    id serial PRIMARY KEY,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id)
        REFERENCES public.orders (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id)
        REFERENCES public.products (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE INDEX IF NOT EXISTS idx_ordered_items_order_id ON public.ordered_items(order_id);
CREATE INDEX IF NOT EXISTS idx_ordered_items_product_id ON public.ordered_items(product_id);

-- Create Cart Items Table (if necessary for your application)
CREATE TABLE IF NOT EXISTS public.cart_item (
    id serial PRIMARY KEY,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    user_id INTEGER,
    product_id INTEGER,
    CONSTRAINT fk_user_cart FOREIGN KEY (user_id)
        REFERENCES public.users (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_product_cart FOREIGN KEY (product_id)
        REFERENCES public.products (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE INDEX IF NOT EXISTS idx_cart_item_user_id ON public.cart_item(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_item_product_id ON public.cart_item(product_id);

END;
