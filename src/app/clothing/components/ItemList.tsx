import React from "react";
import Image from "next/image";

type Item = {
  _id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  link: string;
  company: string;
  tags: string[];
};

type ItemListProps = {
  items: Item[];
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  // Safeguard: Ensure items is an array before mapping
  // Pass Loading state to only show one at a time
  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items to display.</div>;
  }

  return (
    <div className="flex flex-wrap">
      {items.map((item) => (
        <div key={item._id} className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
          <div className="border border-neutral-mid rounded-lg overflow-hidden shadow">
            <a href={item.link}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={267}
                height={321}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-4">
              {/* Updated item name with font-heading */}
              <h3 className="text-lg font-heading font-bold text-primary">
                {item.name}
              </h3>
              <p className="text-lg font-body text-primary">${item.price}</p>
              <p className="text-sm font-body text-text-white font-semibold">
                {item.category}
              </p>
              <div className="my-2">
                {/* Safeguard: Ensure tags is defined and an array */}
                {Array.isArray(item.tags) && item.tags.length > 0 ? (
                  item.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className="inline-block text-sm text-text-white mr-2"
                    >
                      {tag}
                      {index < item.tags.length - 1 && " |"}
                    </span>
                  ))
                ) : (
                  <span className="inline-block text-sm text-text-white">
                    No tags available
                  </span>
                )}
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                View on {item.company}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
