
-- SELECT * FROM products


-- CREATE TABLE product_image_relationships (
--     product_id INT REFERENCES products(id) ON DELETE CASCADE,
--     image_id INT REFERENCES product_images(id) ON DELETE CASCADE,
--     PRIMARY KEY (product_id, image_id)
-- );


-- SELECT p.id, p.name, p.description, pi.image_url
-- FROM products p
-- JOIN product_image_relationships pir ON p.id = pir.product_id
-- JOIN product_images pi ON pir.image_id = pi.id;

-- SELECT * FROM categories where categories.deleted=0;

-- INSERT INTO orders (user_id, total_amount, status, created_at)
-- VALUES 
-- (1, 149.99, 'completed', CURRENT_TIMESTAMP),
-- (4, 89.50, 'pending', CURRENT_TIMESTAMP),
-- (6, 320.00, 'shipped', CURRENT_TIMESTAMP),
-- (7, 75.00, 'pending', CURRENT_TIMESTAMP),
-- (4, 500.00, 'completed', CURRENT_TIMESTAMP),
-- (1, 200.50, 'cancelled', CURRENT_TIMESTAMP),
-- (7, 150.00, 'shipped', CURRENT_TIMESTAMP);


-- SELECT conname
-- FROM pg_constraint
-- WHERE conrelid = 'orders'::regclass AND contype = 'u';

-- ALTER TABLE order_items
-- ADD CONSTRAINT unique_order_product UNIQUE (order_id, product_id);

-- ALTER TABLE order_items ADD COLUMN deleted INT DEFAULT 0;


-- ALTER TABLE orders ADD COLUMN deleted INT DEFAULT 0;
-- ALTER TABLE products
-- ADD CONSTRAINT unique_name_deleted_product UNIQUE (name, deleted);

-- CREATE OR REPLACE FUNCTION update_total_amount()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Calculate the new total amount
--     UPDATE orders
--     SET total_amount = (
--         SELECT SUM(price * quantity)
--         FROM order_items
--         WHERE order_id = NEW.order_id
--     )
--     WHERE id = NEW.order_id;

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trigger_update_total_amount
-- AFTER INSERT OR UPDATE OR DELETE ON order_items
-- FOR EACH ROW
-- EXECUTE FUNCTION update_total_amount();


-- 1,4,5,6--users
-- 1,2,3,4,5,6,7,8--products



-- ALTER TABLE payments ADD COLUMN deleted INT DEFAULT 0; 
-- ALTER TABLE reviews ADD COLUMN deleted INT DEFAULT 0; 

SELECT * FROM reviews;
-- ALTER TABLE shipping RENAME TO shippings;









