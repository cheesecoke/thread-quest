// require("dotenv").config();
// const mongoose = require("mongoose");

// // MongoDB connection string
// const MONGODB_URI = process.env.MONGODB_URI;

// // Define the schema (assuming a simple structure)
// const itemSchema = new mongoose.Schema(
//   {
//     name: String,
//     price: Number,
//     category: String,
//     imageUrl: String,
//     hoverImageUrl: String,
//     link: String,
//     company: String,
//     tags: [String],
//   },
//   { collection: "mensclothing" }
// );

// // Define the Item model
// const Item = mongoose.model("Item", itemSchema, "mensclothing");

// // Define mapping for the different image sources to their TwicPics paths
// const pathMappings = {
//   "https://cdn.shopify.com": "https://threadquest.twic.pics/shopify",
//   "https://www.roark.com": "https://threadquest.twic.pics/roark",
//   "https://us.passenger.com": "https://threadquest.twic.pics/passenger",
// };

// // Function to remove query params and update the base URL
// const updateImageUrl = (url) => {
//   // Remove any query parameters from the URL
//   const urlWithoutQueryParams = url.split("?")[0];

//   // Check which source the image belongs to and replace the base URL accordingly
//   for (const [sourceUrl, twicPicsUrl] of Object.entries(pathMappings)) {
//     if (urlWithoutQueryParams.startsWith(sourceUrl)) {
//       return urlWithoutQueryParams.replace(sourceUrl, twicPicsUrl);
//     }
//   }

//   // If the URL doesn't match any known paths, return it unchanged
//   return urlWithoutQueryParams;
// };

// // Main function to update the image URLs
// async function updateAllItems() {
//   try {
//     // Connect to the database
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Connected to the database.");

//     // Fetch all items from the collection
//     const items = await Item.find();

//     // Update each item in the collection
//     for (const item of items) {
//       const newImageUrl = updateImageUrl(item.imageUrl);
//       const newHoverImageUrl = updateImageUrl(item.hoverImageUrl);

//       // Update the item with the new image URLs
//       item.imageUrl = newImageUrl;
//       item.hoverImageUrl = newHoverImageUrl;

//       // Save the updated item back to the database
//       await item.save();
//       console.log(`Updated item ${item._id}`);
//     }

//     console.log("All items have been updated.");
//   } catch (error) {
//     console.error("Error updating items:", error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//   }
// }

// // Run the update script
// updateAllItems();
