import { relations } from "drizzle-orm";
import { numeric, pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const products = pgTable("products", {
    ID: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: numeric("price").notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
    ordersToProducts: many(ordersToProducts),
}));

export const ProductsSchema = createInsertSchema(products);

export const orders = pgTable("orders", {
    ID: text("id").primaryKey(),
    country: text("country"),
    ownerName: text("owners_name"),
    apartment: text("apartment"),
    landmark: text("landmark"),
    city: text("city"),
    PINcode: text("PINcode"),
    district: text("district"),
    state: text("state"),
    phoneNumber: text("phone_number"),
    products: text("products"),
});

export const ordersRelations = relations(orders, ({ many }) => ({
    ordersToProducts: many(ordersToProducts),
}));

export const OrdersSchema = createInsertSchema(orders);

export const ordersToProducts = pgTable(
    "orders_to_products",
    {
        orderID: text("order_ID")
            .notNull()
            .references(() => orders.ID),
        productID: text("product_ID")
            .notNull()
            .references(() => products.ID),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.orderID, table.productID] }),
    }),
);

export const OrderToProductSchema = relations(ordersToProducts, ({ one }) => ({
    orders: one(orders, {
        fields: [ordersToProducts.orderID],
        references: [orders.ID],
    }),
    products: one(products, {
        fields: [ordersToProducts.productID],
        references: [products.ID],
    }),
}));
