import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    primaryKey,
    pgEnum,
    integer,
    serial,
    numeric,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const products = pgTable("products", {
    ID: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    category: integer("category").references(() => categories.id),
});
export const ProductsSchema = createInsertSchema(products);

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});
export const CategoriesSchema = createInsertSchema(categories);

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
export const OrderToProductSchema = createInsertSchema(ordersToProducts);

// Relations
export const categoryRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));
export const productsRelations = relations(products, ({ one, many }) => ({
    ordersToProducts: many(ordersToProducts),
    category: one(categories, {
        fields: [products.category],
        references: [categories.id],
    }),
}));
export const ordersRelations = relations(orders, ({ many }) => ({
    ordersToProducts: many(ordersToProducts),
}));
export const OrderToProductRelations = relations(
    ordersToProducts,
    ({ one }) => ({
        orders: one(orders, {
            fields: [ordersToProducts.orderID],
            references: [orders.ID],
        }),
        products: one(products, {
            fields: [ordersToProducts.productID],
            references: [products.ID],
        }),
    }),
);
