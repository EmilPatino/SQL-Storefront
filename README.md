# SQL-Storefront

## Command Line App to Retrieve Data

SQL - Storefront is an exercise in using SQL queries and Javascript to interact with a local MySQL database. It consists of two different apps:
* **Buyers' Interface:** Customers have the ability to view all existing merchandise and relevant information to conduct purchases. Total price is provided at the end of the transaction and the database is updated to reflect the inventory changes.

* **Managers' Interface:** Managers are able to view all inventory details, add stock to items, see items with low inventory (<100), and enter new products.

   ![Managers-Options-Example](/captures/managerOptions.PNG)

* **Supervisors' Interface:** Supervisors are responsible for departments and their profitability. The supervisor app allows supervisors check departments' profitability as well as create new departments.

### App Features
As stated above, these apps have seven main features that can be triggered by using specific commands from the CLI. These include:

1. **Purchase:** The application will provide all items available and prompt them to select an item and quantity to purchase. The app will alert the user that there is insufficient stock if they attempt to buy quantities over the existing stock. The app will alert the buyer of successful purchases and provide the total cost.

   **Success**

   ![Successful-Purchase-Example](/captures/purchase.PNG)

   **Failure**

   ![Failed-Purchase-Example](/captures/failedPurchase.PNG)

2. **View All Items:** Managers are able to see all product information including stock quantity unlike customers. 

   ![All-Products-Example](/captures/allProducts.PNG)

3. **Add Inventory:** Managers may update the inventory of a selected item when a new shipment comes in. They specify the additional stock quantity and the program will update accordingly. 

   ![Add-Inventory-Example](/captures/addInventory.PNG)

4. **Add Product:** Managers can add new products to the application as they become available. The application will request all the required information. 

   ![Add-Product-Example](/captures/newProduct.PNG)

5. **Low Inventory:** Managers have the possibility of checking low inventory of any item that has less than 100 stock quantity.

   ![Low-Inventory-Example](/captures/lowInventory.PNG)

6. **Create Departments:** Supervisors may create new departments and must enter the department name and the overhead costs.

   ![Create-Department-Example](/captures/addDepartment.PNG)

7. **View Profitability:** Supervisors can view department details and profitability to determine whether a department has met its target revenues.

   ![View-Profitability-Example](/captures/profit.PNG)